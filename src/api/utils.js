import { DateTime, Duration } from "luxon";
import { BASE_URL_CORS_PROXY } from "@/api/api-config";
import axios from "axios";

export function removeBaseUrl(url) {
  const baseUrl = "https://www.polaraccesslink.com/";
  return url.replace(baseUrl, BASE_URL_CORS_PROXY);
}
export function formatDurationMinutes(isoDuration) {
  const duration = Duration.fromISO(isoDuration);
  return duration.toFormat("mm");
}

export function formatDate(Date) {
  const date = DateTime.fromJSDate(Date);
  return date.toFormat("dd.MM.yyyy");
}

export function formatTime(isoDate) {
  const date = DateTime.fromISO(isoDate);
  return date.toFormat("HH:mm");
}

export function activityEndTime(isoDuration, IsoDate) {
  const duration = Duration.fromISO(isoDuration);
  const date = DateTime.fromISO(IsoDate);
  return date.plus(duration).toFormat("HH:mm");
}

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

export async function getCityFromCoordinates(lat, lon) {
  const response = await axios.get(
    `https://atlas.microsoft.com/search/address/reverse/json?api-version=1.0&query=${lat},${lon}&subscription-key=` +
      import.meta.env.VITE_AZURE_MAPS_KEY,
  );
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
