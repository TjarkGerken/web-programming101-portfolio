import store from "@/store";
import axios from "axios";

export async function getGPXDataToJSON(exercise_url) {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  const gpx = await axios.get(exercise_url + "/gpx", {
    headers,
  });

  return gpx_json;
}
