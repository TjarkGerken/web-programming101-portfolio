export const POLAR_BASIC_AUTH_CLIENT_ID_SECRET = import.meta.env
  .VITE_POLAR_AUTHORIZATION;
export const BASE_URL_POLAR_TOKEN = "https://polarremote.com/v2/oauth2/token";
export const BASE_URL_CORS_PROXY =
  import.meta.env.VITE_ENVIRONMENT === "DEV"
    ? import.meta.env.VITE_PROXY_DEV_URL
    : import.meta.env.VITE_PROXY_PROD_URL;

export function removeBaseUrl(url) {
  const baseUrl = "https://www.polaraccesslink.com/";
  return url.replace(baseUrl, BASE_URL_CORS_PROXY);
}
