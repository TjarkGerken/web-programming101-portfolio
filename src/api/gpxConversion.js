import store from "@/store";
import GPX from "gpx-parser-builder";
import axios from "axios";
function getLatLongListFromGpx(gpxXml) {
  const gpx = GPX.parse(gpxXml);
  const json_gpx = [];

  for (let i = 0; i < gpx.trk[0].trkseg[0].trkpt.length; i++) {
    json_gpx.push([
      gpx.trk[0].trkseg[0].trkpt[i].$.lat,
      gpx.trk[0].trkseg[0].trkpt[i].$.lon,
    ]);
  }
  return json_gpx.map((item) => {
    return {
      lat: item[0],
      lon: item[1],
    };
  });
}

export async function getGPXDataToJSON(exercise_url) {
  const headers = {
    Authorization: "Bearer " + store.state.user.polar_user.polar_access_token,
  };

  const response = await fetch(exercise_url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const gpxXml = await response.text();

  return getLatLongListFromGpx(gpxXml);
}

export function LongLatListForMapUsage(JSON_Object) {
  return JSON_Object.map((item) => {
    return [item.lon, item.lat];
  });
}
