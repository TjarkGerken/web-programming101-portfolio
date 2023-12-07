import axios from "axios";
import { BASE_URL_CORS_PROXY } from "@/api/api-config";
import store from "@/store";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFitData } from "@/api/fitConversion";
import { getGPXDataToJSON } from "@/api/gpxConversion";
import { getCityFromCoordinates, removeBaseUrl } from "@/api/utils";
import { round } from "ol/math";
import { Duration } from "luxon";

/**
 * Gets the exercises from the Polar API and stores them in the database.
 * @returns {Promise<void>}
 */
export async function getPolarActivities() {
  // Check if new exercises are available since the last sync
  const transaction = await postExerciseTransactions();

  // If no new exercises are available, return
  if (!transaction) {
    return;
  }

  /* Get the exercises from the transaction and store them in the Database.
   *  Via the transaction a  list of exercises is fetched  and each of them are stored in the database.
   * */
  await getExerciseList(transaction["resource-uri"]).then(
    async (exercise_list) => {
      if (exercise_list) {
        for (const exercise_url of exercise_list.exercises) {
          await storeExerciseData(exercise_url);
        }
      }
    },
  );
  // Commit the transaction to the Polar API to mark it as completed
  await commitTransaction(transaction["resource-uri"]);
}

/**
 * Posts a transaction to the Polar API. This transaction is used to get the exercises of the user.
 * @returns {Promise<any>}
 */
async function postExerciseTransactions() {
  // Set the Authorization header for the request
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  // Set the request url based on the logged-in user.
  const url =
    BASE_URL_CORS_PROXY +
    "v3/users/" +
    store.state.user.polar_user["member-id"] +
    "/exercise-transactions";
  // Post the transaction to the Polar API
  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Fetches the exercises list from the Polar API based on the url provided. This url is provided by the transaction.
 * @param url The URL of the transaction
 * @returns {Promise<any>}
 */
async function getExerciseList(url) {
  // Set the Authorization header for the request based on the logged-in user.
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  // Remove the base url from the url provided by the transaction to be able to redirect the request to the Django HTTP Proxy
  url = removeBaseUrl(url);
  // Get the exercise list from the Polar API
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Gets the exercise data from the Polar API based on the url provided.
 * Furthermore, it gets the FIT and GPX data from the Polar API and converts them to JSON.
 * Lastly it gets the location of the exercise via the Azure Maps API.
 * @param exercise_url The url of the exercise
 * @returns {Promise<any>} Returns the exercise data in JSON format with the FIT + GPX data and the location.
 */
async function getExerciseData(exercise_url) {
  // Set the Authorization header for the request based on the logged-in user.
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  // Remove the base url from the url provided by the transaction to be able to redirect the request to the Django HTTP Proxy
  exercise_url = removeBaseUrl(exercise_url);
  // Get the exercise data from the Polar API
  try {
    const response = await axios
      .get(exercise_url, { headers })
      .then(async (res) => {
        res.data["fit"] = await getFitData(exercise_url);
        res.data["gpx"] = await getGPXDataToJSON(exercise_url);
        res.data["location"] = await getCityFromCoordinates(
          res.data["gpx"][0]["lat"],
          res.data["gpx"][0]["lon"],
        );
        return res;
      });
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

/**
 *  Awaits the exercise data from the Polar API and stores it in the database.
 *  Additionally, it adds a sorting field for the start time to be able to sort the exercises by start time.
 * @param exercise_url The url of the exercise
 * @returns {Promise<void>}
 */
async function storeExerciseData(exercise_url) {
  const exercise_data = await getExerciseData(exercise_url);
  if (exercise_data["start-time"]) {
    exercise_data["start-time-sorting"] = firebase.firestore.Timestamp.fromDate(
      new Date(exercise_data["start-time"]),
    );
  }
  // Set the user document reference of the logged-in user
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);

  // Store the exercise in the database under the sub-collection exercises
  await userDocRef
    .collection("exercises")
    .doc("POLAR_" + exercise_data.id)
    .set(exercise_data);
}

/**
 * Commits the transaction to the Polar API to mark it as completed, so that it won't be fetched again. This is done to prevent duplicate exercises and follow best-practices stated in the Polar API documentation.
 * @param transaction_url The url of the transaction
 * @returns {Promise<axios.AxiosResponse<any>>} Returns the response of the request
 */
async function commitTransaction(transaction_url) {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  try {
    return await axios.put(removeBaseUrl(transaction_url), {}, { headers });
  } catch (error) {
    console.warn(error);
  }
}

/**
 * Gets the exercises of the logged-in user from the database.
 * @returns {Promise<firebase.firestore.DocumentData[]>} Returns the exercises of the logged-in user
 */
export async function getExercises() {
  // Get the user document reference of the logged-in user
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  // Get the exercises from the database
  const snapshot = await userDocRef.collection("exercises").get();
  // Return the exercises
  return snapshot.docs.map((doc) => doc.data());
}

/**
 *  Gets the latest exercise of the logged-in user from the database.
 * @returns {Promise<*>} Returns the latest exercise of the logged-in user
 */
export async function getLatestExercise() {
  // Get the user document reference of the logged-in user
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  // Get the exercise collection reference of the logged-in user
  const exerciseDocRef = userDocRef.collection("exercises");

  // Get the latest exercise of the user from the database
  return await exerciseDocRef
    .orderBy("start-time-sorting", "desc")
    .limit(1)
    .get()
    .then((res) => {
      if (res.docs.length === 0) return null;
      return res.docs[0].data();
    });
}

/**
 * Gets the exercises with a start date within the last week of the logged-in user from the database and returns them in a list.
 * @returns {Promise<*[]>} Returns the exercises of the last week.
 */
export async function getLastWeekExercises() {
  const lastWeekExercises = [];
  // Get the user document reference of the logged-in user
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  // Get the exercise collection reference of the logged-in user
  const exerciseDocRef = userDocRef.collection("exercises");
  // Get the exercises of the last week from the database
  await exerciseDocRef
    // filter the exercises, so they are only the ones from the last week
    .where(
      "start-time-sorting",
      ">=",
      firebase.firestore.Timestamp.fromDate(
        new Date(new Date().setDate(new Date().getDate() - 7)),
      ),
    )
    .get()
    .then((res) => {
      // Iterate over the exercises and add them to the list
      res.forEach((doc) => lastWeekExercises.push(doc.data()));
    });
  return lastWeekExercises;
}

/**
 * Simplified function to return the aggregated stats of the last week. This function is used in the dashboard.
 * @returns {Promise<{total_exercises, total_duration: Duration, total_calories: number, total_distance: number, avg_hf: number}>} Returns the aggregated stats of the last week.
 */
export async function aggregateLastWeekStats() {
  return aggregateStats(await getLastWeekExercises());
}

/**
 * This function aggregates the stats of the exercises provided in the list. It returns the total distance, duration, calories, exercises and the average heart rate.
 * @param exerciseList The list of exercises to be aggregated
 * @returns {{total_exercises, total_duration: Duration, total_calories: number, total_distance: number, avg_hf: number}} Returns the aggregated stats of the exercises provided in the list.
 */
export function aggregateStats(exerciseList) {
  // Initialize the stats object and the number of heart rate exercises
  const stats = {
    total_distance: 0,
    total_duration: Duration.fromObject({
      years: 0,
      quarters: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    total_calories: 0,
    total_exercises: exerciseList.length,
    avg_hf: 0,
  };
  let amount_hf = 0;

  // Iterate over the exercises
  exerciseList.forEach((exercise) => {
    // Add the duration
    stats.total_duration = stats.total_duration.plus(
      Duration.fromISO(exercise.duration),
    );
    if (exercise.calories) {
      // Add the calories
      stats.total_calories += exercise.calories;
    }
    if (exercise.distance) {
      // Add the distance
      stats.total_distance += exercise.distance;
    }

    if (typeof exercise["heart-rate"].average === "number") {
      // Add the heart rate average
      stats.avg_hf += exercise["heart-rate"].average;
      amount_hf += 1;
    }
  });
  // Calculate the average heart rate if it exits
  if (exerciseList.avg_hf !== 0) {
    stats.avg_hf = round(stats.avg_hf / amount_hf, 2);
  }
  // Convert the distance to km
  stats.total_distance = round(stats.total_distance / 1000, 2);
  // Convert the duration to a normal format
  stats.total_duration = stats.total_duration.toFormat("hh:mm:ss");
  return stats;
}

/**
 *  Gets a single exercise by filtering for the id of the exercise.
 * @param id The POLAR ID of the exercise
 * @returns {Promise<*>} Returns the exercise or null if it cannot be found.
 */
export function getExerciseByID(id) {
  // Get the user document reference of the logged-in user
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  // Get the exercise collection reference of the logged-in user
  const exerciseDocRef = userDocRef.collection("exercises");
  // Get the exercise from the database
  return exerciseDocRef
    .doc("POLAR_" + id)
    .get()
    .then((res) => {
      return res.data();
    })
    .catch((err) => {
      console.warn(err);
      return null;
    });
}

/**
 *  Delete a single exercise by filtering for the id of the exercise.
 * @param id The POLAR ID of the exercise
 * @returns {Promise<void>}
 */
export function deleteExerciseByID(id) {
  // Get the user document reference of the logged-in user
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  // Get the exercise collection reference of the logged-in user
  const exerciseDocRef = userDocRef.collection("exercises");
  // Delete the exercise from the database
  return exerciseDocRef.doc("POLAR_" + id).delete();
}
