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
  let user_data = await getUserData(polar_member_id, polar_access_token);
  user_data.data["polar_access_token"] = polar_access_token;
  await firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .set(user_data.data, { merge: true });
}
async function getUserData(polar_member_id, polar_access_token) {
  const url = BASE_URL_CORS_PROXY + "v3/users/" + polar_member_id;
  const headers = {
    Authorization: "Bearer " + polar_access_token,
  };
  return axios.get(url, { headers });
}

async function registerUser(user_id, access_token) {
  const register_data =
    "<register><member-id>" + user_id + "</member-id></register>";
  const register_url = BASE_URL_CORS_PROXY + "v3/users";
  const register_headers = {
    "Content-Type": "application/xml",
    Authorization: "Bearer " + access_token,
  };
  try {
    await axios.post(register_url, register_data, {
      headers: register_headers,
    });
  } catch (error) {
    if (error.response.status === 409) {
      console.log("User already registered");
    } else {
      throw error;
    }
  }
}

export async function getPolarAuthToken(code) {
  const headers = {
    Accept: "application/json;charset=UTF-8",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: POLAR_BASIC_AUTH_CLIENT_ID_SECRET,
  };
  const data = "grant_type=authorization_code&code=" + code;
  try {
    const response = await axios.post(BASE_URL_POLAR_TOKEN, data, {
      headers,
    });
    const user_id = response.data["x_user_id"];
    await registerUser(user_id, response.data.access_token);
    await storeUserData(user_id, response.data.access_token);
    toast.success("You're account was successfully connected.");
  } catch (error) {
    toast.error("Something we wrong. Please try again.");
    console.error(error);
  }
  const polar_user = await getUser();
  if (polar_user) {
    await store.dispatch("setPolarUser", polar_user);
  }
  await router.push("/profile");
}

export async function deleteUser(user_id) {
  const headers = {
    Accept: "application/json;charset=UTF-8",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: POLAR_BASIC_AUTH_CLIENT_ID_SECRET,
  };

  try {
    await axios
      .delete(BASE_URL_CORS_PROXY + "v3/users/" + user_id, { headers })
      .then(() => {
        toast.success("You're account was successfully disconnected.");
      });
  } catch (error) {
    toast.error("Something we wrong. Please try again.");
  }
}
