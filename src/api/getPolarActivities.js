import axios from "axios";
import { BASE_URL_CORS_PROXY, removeBaseUrl } from "@/api/api-config";
import store from "@/store";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("polar_access_token"),
};
async function postExerciseTransactions() {
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
  console.log(transaction["resource-uri"]);

  // transaction["resource-uri"]
  const exercise_list = await getExerciseList(transaction["resource-uri"]).then(
    async (exercise_list) => {
      if (exercise_list) {
        for (const exercise_url of exercise_list.exercises) {
          // You can access each exercise item here
          await storeExerciseData(exercise_url);
          console.log(exercise_url);
        }
      }
    },
  ); //
  console.log(exercise_list);
}

async function getExerciseData(exercise_url) {
  exercise_url = removeBaseUrl(exercise_url);
  try {
    const response = await axios.get(exercise_url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function storeExerciseData(exercise_url) {
  const exercise_data = await getExerciseData(exercise_url);
  console.log(exercise_data);
  const userDocRef = firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid);
  await userDocRef
    .collection("exercises")
    .doc("POLAR_" + exercise_data.id)
    .set(exercise_data);

  console.log(exercise_data);
}