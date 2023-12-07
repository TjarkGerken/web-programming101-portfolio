import { DateTime, Duration } from "luxon";
import { BASE_URL_CORS_PROXY } from "@/api/api-config";
import axios from "axios";

/**
 * Removes the base URL from the URL, and replaces it with the proxy URL to circumvent CORS issues.
 * @param url The URL to be modified
 * @returns {*} The URL with the proxy URL
 */
export function removeBaseUrl(url) {
  const baseUrl = "https://www.polaraccesslink.com/";
  return url.replace(baseUrl, BASE_URL_CORS_PROXY);
}

/**
 * Formats the Duration to Minutes
 * @param isoDuration Duration in ISO8601 format
 * @returns {string} Formated Duration
 */
export function formatDurationMinutes(isoDuration) {
  const duration = Duration.fromISO(isoDuration);
  return duration.toFormat("mm");
}

/**
 *  Format the Date to German Convention
 * @param Date JS Date
 * @returns {string} Formated Date
 */
export function formatDate(Date) {
  const date = DateTime.fromJSDate(Date);
  return date.toFormat("dd.MM.yyyy");
}

/**
 * Formats the Time to Hours and Minutes
 * @param isoDate ISO 8601
 * @returns {string} Formated Time
 */
export function formatTime(isoDate) {
  const date = DateTime.fromISO(isoDate);
  return date.toFormat("HH:mm");
}

/**
 *  Calculates the endtime of the activity based on the startdate and the duration.
 * @param isoDuration Duration in ISO8601 format
 * @param IsoDate Datetime in ISO8601
 * @returns {string}
 */
export function activityEndTime(isoDuration, IsoDate) {
  const duration = Duration.fromISO(isoDuration);
  const date = DateTime.fromISO(IsoDate);
  return date.plus(duration).toFormat("HH:mm");
}

/**
 *  Determines the display name based on the sport and the time of the day
 * @param isoDate ISO8601
 * @param sport Name of the Sport
 * @param detailedSport More Sport Info
 * @returns {string} Display Name
 */
export function determineName(isoDate, sport, detailedSport) {
  const date = DateTime.fromISO(isoDate);
  if (sport === "OTHER") {
    sport = detailedSport;
  }
  sport = sport.toLowerCase();
  sport = sport.charAt(0).toUpperCase() + sport.slice(1);
  sport = sport.replace("_", " ");
  if (date.hour < 12) {
    return "Morning " + sport;
  } else if (date.hour < 18) {
    return "Afternoon " + sport;
  } else {
    return "Evening " + sport;
  }
}

/**
 *  Determines the location of the start of the activity. It uses the Azure Maps API to determine the City based on the coordinates.
 * @param lat Latitude Coordinate
 * @param lon Longtidute Coordinate
 * @returns {Promise<*>} Returns a promise with the city name (e.g. Mannheim)
 * @throws Error if no results are found
 */
export async function getCityFromCoordinates(lat, lon) {
  // Call the Azure Maps API with the appropriate key and coordinates from the environment variables
  const response = await axios.get(
    `https://atlas.microsoft.com/search/address/reverse/json?api-version=1.0&query=${lat},${lon}&subscription-key=` +
      import.meta.env.VITE_AZURE_MAPS_KEY,
  );
  // If there is a valid response return the city
  if (
    response.data &&
    response.data.addresses &&
    response.data.addresses.length > 0
  ) {
    return response.data.addresses[0].address.municipality;
  } else {
    throw new Error("No results found");
  }
}
