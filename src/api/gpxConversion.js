import store from "@/store";
import GPX from "gpx-parser-builder";
import axios from "axios";

/**
 * Converts the GPX data to JSON.
 * @param gpxXml The GPX Data in conventional format
 * @returns {{lon: *, lat: *}[]} Return the GPX Data as a JSON Object. Every point has a latitude and longitude.
 */
function getLatLongListFromGpx(gpxXml) {
  // Use the GPX Parser package to convert the GPX data to JSON
  const gpx = GPX.parse(gpxXml);
  const json_gpx = [];
  // Iterate over the GPX Data to and fetch only the longitude and latitude of each point
  for (let i = 0; i < gpx.trk[0].trkseg[0].trkpt.length; i++) {
    json_gpx.push([
      gpx.trk[0].trkseg[0].trkpt[i].$.lat,
      gpx.trk[0].trkseg[0].trkpt[i].$.lon,
    ]);
  }
  // Return the JSON data
  return json_gpx.map((item) => {
    return {
      lat: item[0],
      lon: item[1],
    };
  });
}

/**
 * Gets the GPX data from the Polar Flow API and converts it to JSON.
 * @param exercise_url The url of the exercise with transaction
 * @returns {Promise<{lon: *, lat: *}[]>} Return the GPX Data as a JSON Object. Every point has a latitude and longitude.
 */
export async function getGPXDataToJSON(exercise_url) {
  // Set the headers for the request based on the loggedin user
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };
  // Get the GPX data from the Polar Flow API
  const gpx = await axios
    .get(exercise_url + "/gpx", {
      headers,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  // Convert the GPX data to JSON
  return getLatLongListFromGpx(gpx);
}

/**
 *  Takes the JSON Object from the Database and converts it to the format that is used by the open layer map.
 * @param JSON_Object The GPX Data from the Firebase.
 * @returns {*}   Converted GPX Data
 */
export function LongLatListForMapUsage(JSON_Object) {
  return JSON_Object.map((item) => {
    return [parseFloat(item.lon), parseFloat(item.lat)];
  });
}
