// TODO: https://developer.garmin.com/fit/example-projects/javascript/
import { Decoder, Stream } from "@garmin-fit/sdk";
import store from "@/store";
import axios from "axios";

export async function getFitData(exercise_url) {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  const response = await axios.get(exercise_url + "/fit", {
    headers,
    responseType: "arraybuffer",
  });
  const arrayBuffer = await response.data;
  const uint8Array = new Uint8Array(arrayBuffer);

  const streamfromFileSync = Stream.fromBuffer(uint8Array);
  console.log("isFIT (static method): " + Decoder.isFIT(streamfromFileSync));

  const decoder = new Decoder(streamfromFileSync);
  console.log("isFIT (instance method): " + decoder.isFIT());
  console.log("checkIntegrity: " + decoder.checkIntegrity());

  const { messages, errors } = decoder.read();

  if (errors.length > 0) {
    console.error("errors: " + errors);
  }
  return messages;
}
