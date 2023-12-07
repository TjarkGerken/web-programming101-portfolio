/**
 * Client ID and secret for Polar OAuth2 User Sign Up
 * @type {string}
 */
export const POLAR_BASIC_AUTH_CLIENT_ID_SECRET = import.meta.env
  .VITE_POLAR_AUTHORIZATION;

/**
 * The redirect URI for Polar OAuth2 User Sign Up
 * @type {string}
 */
export const BASE_URL_POLAR_TOKEN = "https://polarremote.com/v2/oauth2/token";
/**
 *  The URL of the Django HTTP Proxy, where all requests are to the polar API are sent to. This is done to circumvent CORS issues, that would otherwise occur if the data is being directly sent to the Browser.
 * @type {string}
 */
export const BASE_URL_CORS_PROXY = import.meta.env.VITE_PROXY_PROD_URL;
