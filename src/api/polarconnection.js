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
import { deleteFirebaseUser, getUser } from "@/api/user";
import store from "@/store";

const toast = useToast();

/**
 * Fetches the User Data from the Polar API
 * @param polar_member_id The Polar Member ID
 * @param polar_access_token The Polar Access Token
 * @returns {Promise<axios.AxiosResponse<any>>} Polar User Data
 */
async function getUserData(polar_member_id, polar_access_token) {
  // Define User Data URL and Headers
  const url = BASE_URL_CORS_PROXY + "v3/users/" + polar_member_id;
  const headers = {
    Authorization: "Bearer " + polar_access_token,
  };
  // Send GET request to Polar API and return response
  return axios.get(url, { headers });
}

/**
 * Stores the User Data in Firebase
 * @param polar_member_id The Polar Member ID
 * @param polar_access_token  The Polar Access Token
 * @returns {Promise<void>}
 */
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

/**
 * Registers a User at the Polar API for this Application so the data can be fetched.
 * @param user_id The Polar Member ID
 * @param access_token The Polar Access Token
 * @returns {Promise<void>}
 */
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

/**
 *  Connects the Polar User Account with the Peak Pulse Acount
 * @param code The code that was provided by the redirect from the  Polar OAuth2.0 Interface
 * @returns {Promise<void>} Redirects the User to the profile page.
 */
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
    } catch (error) {
      // Inform User about the error
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }

    // Store User Data in Firebase
    await storeUserData(user_id, response.data.access_token);
    toast.success("You're account was successfully connected.");
  } catch (error) {
    // Inform User about the error
    toast.error("Something went wrong. Please try again.");
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

/**
 *  Deletes a user and all their data in firestore.
 * @returns {Promise<void>}
 */
export async function deleteUser() {
  // Define Authentication Header
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };

  console.log(store.state.user.polar_user);
  let user_id = store.state.user.polar_user["member-id"];
  try {
    // Send DELETE request to Polar API
    await axios
      .delete(BASE_URL_CORS_PROXY + "v3/users/" + user_id, { headers })
      .then(() => {
        // Delete User Data from Firebase
        deleteFirebaseUser();
        // Delete User date from Vuex for consistency
        store.dispatch("setPolarUser", null);
        // Reload Page to reflect Changes
        window.location.reload();
        // Inform User about the successful disconnect
        toast.success("You're account was successfully disconnected.");
      });
  } catch (error) {
    // Inform User about the error
    toast.error("Something went wrong. Please try again.");
  }
}
