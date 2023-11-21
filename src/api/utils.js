import { DateTime, Duration } from "luxon";
import { BASE_URL_CORS_PROXY } from "@/api/api-config";

export function removeBaseUrl(url) {
  const baseUrl = "https://www.polaraccesslink.com/";
  return url.replace(baseUrl, BASE_URL_CORS_PROXY);
}

export function formatDuration(isoDuration) {
  const duration = Duration.fromISO(isoDuration);
  return duration.toFormat("hh:mm:ss");
}

export function formatDate(isoDate) {
  const date = DateTime.fromISO(isoDate);
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