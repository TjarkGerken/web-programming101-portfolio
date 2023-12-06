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

async function postExerciseTransactions() {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  const url =
    BASE_URL_CORS_PROXY +
    "v3/users/" +
    store.state.user.polar_user["member-id"] +
    "/exercise-transactions";

  try {
    const response = await axios.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}
async function getExerciseList(url) {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  url = removeBaseUrl(url);
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function getPolarActivities() {
  const transaction = await postExerciseTransactions();

  if (!transaction) {
    console.log("No transaction");
    return;
  }
  await getExerciseList(transaction["resource-uri"]).then(
    async (exercise_list) => {
      if (exercise_list) {
        for (const exercise_url of exercise_list.exercises) {
          await storeExerciseData(exercise_url);
        }
      }
    },
  );
  await commitTransaction(transaction["resource-uri"]);
}

async function getExerciseData() {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  // exercise_url = removeBaseUrl(exercise_url);

  const res = {};
  res["fit"] = await getFitData(
    "src/assets/import-mock-data/12294319115_ACTIVITY.fit",
  );
  res["gpx"] = await getGPXDataToJSON(
    "src/assets/import-mock-data/activity_12294319115.gpx",
  );
  res["start-time"] = "2023-12-05T05:18:00.000Z";
  res["id"] = "12519045900";
  res["calories"] = 456;
  res["distance"] = 6780;
  res["duration"] = "PT0H39M09S";
  res["heart-rate"] = { average: 165, maximum: 178 };
  res["location"] = "Bremen";
  res["fit"].sessionMesgs[0].avgSpeed = 10.4;
  res["sport"] = "RUNNING";

  return res;
}

export async function storeExerciseData() {
  const exercise_data = await getExerciseData();
  if (exercise_data["start-time"]) {
    exercise_data["start-time-sorting"] = firebase.firestore.Timestamp.fromDate(
      new Date(exercise_data["start-time"]),
    );
  }

  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  await userDocRef
    .collection("exercises")
    .doc("POLAR_" + exercise_data.id)
    .set(exercise_data);
}
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

// TODO: GET Exercises from Firestore
export async function getExercises() {
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  const snapshot = await userDocRef.collection("exercises").get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function getLatestExercise() {
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  const exerciseDocRef = userDocRef.collection("exercises");
  return await exerciseDocRef
    .orderBy("start-time-sorting", "desc")
    .limit(1)
    .get()
    .then((res) => {
      if (res.docs.length === 0) return null;
      return res.docs[0].data();
    });
}

export async function getLastWeekExercises() {
  const lastWeekExercises = [];
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  const exerciseDocRef = userDocRef.collection("exercises");
  await exerciseDocRef
    .where(
      "start-time-sorting",
      ">=",
      firebase.firestore.Timestamp.fromDate(
        new Date(new Date().setDate(new Date().getDate() - 7)),
      ),
    )
    .get()
    .then((res) => {
      res.forEach((doc) => lastWeekExercises.push(doc.data()));
    });
  return lastWeekExercises;
}

export async function aggregateLastWeekStats() {
  return aggregateStats(await getLastWeekExercises());
}

export function aggregateStats(exerciseList) {
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

  exerciseList.forEach((exercise) => {
    stats.total_duration = stats.total_duration.plus(
      Duration.fromISO(exercise.duration),
    );
    if (exercise.calories) {
      stats.total_calories += exercise.calories;
    }
    if (exercise.distance) {
      stats.total_distance += exercise.distance;
    }

    if (typeof exercise["heart-rate"].average === "number") {
      stats.avg_hf += exercise["heart-rate"].average;
      amount_hf += 1;
    }
  });
  if (exerciseList.avg_hf !== 0) {
    stats.avg_hf = round(stats.avg_hf / amount_hf, 2);
  }
  stats.total_distance = round(stats.total_distance / 1000, 2);
  stats.total_duration = stats.total_duration.toFormat("hh:mm:ss");
  return stats;
}

export function getExerciseByID(id) {
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  const exerciseDocRef = userDocRef.collection("exercises");
  return exerciseDocRef
    .doc("POLAR_" + id)
    .get()
    .then((res) => {
      return res.data();
    });
}
