import axios from "axios";
import { BASE_URL_CORS_PROXY } from "@/api/api-config";
import store from "@/store";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFitData } from "@/api/fitConversion";
import { getGPXDataToJSON } from "@/api/gpxConversion";
import { getCityFromCoordinates, removeBaseUrl } from "@/api/utils";

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
    console.error(error);
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
    console.error(error);
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
          console.log(exercise_url);
          await storeExerciseData(exercise_url);
        }
      }
    },
  );
  await commitTransaction(transaction["resource-uri"]);
}

async function getExerciseData(exercise_url) {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  exercise_url = removeBaseUrl(exercise_url);
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
    console.error(error);
  }
}

async function storeExerciseData(exercise_url) {
  const exercise_data = await getExerciseData(exercise_url);
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
    console.error(error);
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
