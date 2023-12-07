import { Decoder, Stream } from "@garmin-fit/sdk";
import store from "@/store";
import axios from "axios";

/**
 * Gets the FIT data from the Polar Flow API and converts it to JSON.
 * @param exercise_url The url of the exercise
 * @returns {Promise<{}>} Returns a promise with the FIT data in JSON Format
 */
export async function getFitData(exercise_url) {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  const response = await axios.get(exercise_url + "/fit", {
    headers,
    responseType: "arraybuffer",
  });
  // Convert the response to a Uint8Array to comply with the Garmin FIT SDK
  const arrayBuffer = await response.data;
  const uint8Array = new Uint8Array(arrayBuffer);

  // Create a stream from the Uint8Array and check if it is a FIT file via the Garmin FIT SDK
  const streamfromFileSync = Stream.fromBuffer(uint8Array);
  console.log("isFIT (static method): " + Decoder.isFIT(streamfromFileSync));
  const decoder = new Decoder(streamfromFileSync);
  console.log("isFIT (instance method): " + decoder.isFIT());
  console.log("checkIntegrity: " + decoder.checkIntegrity());

  // Read the FIT file and return the messages
  const { messages, errors } = decoder.read();

  // Log the errors
  if (errors.length > 0) {
    console.error("errors: " + errors);
  }
  return messages;
}
