import axios from "axios";
import router from "@/router";
import { useToast } from "vue-toast-notification";
import {
  BASE_URL_CORS_PROXY,
  POLAR_BASIC_AUTH_CLIENT_ID_SECRET,
  BASE_URL_POLAR_TOKEN,
} from "@/api/api-config";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getUser } from "@/api/user";
import store from "@/store";

const toast = useToast();

async function storeUserData(polar_member_id, polar_access_token) {
  // Fetch User Data from Polar API
  let user_data = await getUserData(polar_member_id, polar_access_token);
  // Add Polar Access Token to User Data
  user_data.data["polar_access_token"] = polar_access_token;
  // Store User Data in Firebase
  await firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .set(user_data.data, { merge: true });
}
async function getUserData(polar_member_id, polar_access_token) {
  // Define User Data URL and Headers
  const url = BASE_URL_CORS_PROXY + "v3/users/" + polar_member_id;
  const headers = {
    Authorization: "Bearer " + polar_access_token,
  };
  // Send GET request to Polar API
  return axios.get(url, { headers });
}

async function registerUser(user_id, access_token) {
  // Create Register Data as XML
  const register_data =
    "<register><member-id>" + user_id + "</member-id></register>";
  // Define Register URL and Headers
  const url = BASE_URL_CORS_PROXY + "v3/users";
  const headers = {
    "Content-Type": "application/xml",
    Authorization: "Bearer " + access_token,
  };
  try {
    // Send POST request to Polar API
    await axios.post(url, register_data, {
      headers: headers,
    });
  } catch (error) {
    if (error.response.status === 409) {
      // "User already registered"
    } else {
      throw error;
    }
  }
}

export async function getPolarAuthToken(code) {
  // Define Authentication Header and Accept Header
  const headers = {
    Accept: "application/json;charset=UTF-8",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: POLAR_BASIC_AUTH_CLIENT_ID_SECRET,
  };
  // Define POST Data based on the provided code
  const data = "grant_type=authorization_code&code=" + code;
  try {
    // Send POST request to Polar API and store the access_token
    const response = await axios.post(BASE_URL_POLAR_TOKEN, data, {
      headers,
    });
    const user_id = response.data["x_user_id"];
    try {
      // Register User at Polar API
      await registerUser(user_id, response.data.access_token);
    } catch (error) {}

    // Store User Data in Firebase
    await storeUserData(user_id, response.data.access_token);
    toast.success("You're account was successfully connected.");
  } catch (error) {
    // Inform User about the error
    toast.error("Something we wrong. Please try again.");
    console.error(error);
  }
  // Fetch the User Data from Firebase
  const polar_user = await getUser();
  if (polar_user) {
    // Store the User Data in the Vuex Store for easier access
    await store.dispatch("setPolarUser", polar_user);
  }
  // Redirect the User to the Profile Page
  await router.push("/profile");
}

export async function deleteUser(user_id) {
  // Define Authentication Header
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };

  try {
    // Send DELETE request to Polar API
    await axios
      .delete(BASE_URL_CORS_PROXY + "v3/users/" + user_id, { headers })
      .then(() => {
        // Inform User about the disconnect
        toast.success("You're account was successfully disconnected.");
      });
  } catch (error) {
    // Inform User about the error
    toast.error("Something we wrong. Please try again.");
  }
}
