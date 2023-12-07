import store from "@/store";
import router from "@/router";
import firebase from "firebase/compat/app";
import { getUser } from "@/api/user";
import { useToast } from "vue-toast-notification";
const toast = useToast();

/**
 * Logs in a user with Google. The user gets redirected to a Google Popup where he can choose his account. Afterwards, he gets redirected to the dashboard or profile according to the state of their onboarding.
 * @returns {Promise<firebase.auth.UserCredential>}
 */
export function googleSignIn() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      // Stores the loggedin state in the store
      await store.dispatch("logIn", result);
      // Tries to get the user from the database
      const polar_user = await getUser();
      // If the user exists, set the polar user in the store and redirect appropriately
      if (polar_user) {
        await store.dispatch("setPolarUser", polar_user);
        await router.push("/dashboard");
      } else {
        await router.push("/profile");
      }
    })
    .catch(() => {
      toast.error("Something we wrong. Please try again.");
    });
}

/**
 * Logs in a user with email and password. Then redirects the user to the dashboard or profile according to the state of their onboarding.
 * @param email The email of the user in Firebase
 * @param password The password of the user in Firebase
 * @returns {Promise<firebase.auth.UserCredential>} Redirects the user
 * @constructor
 */
export function MailPasswordSignIn(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (result) => {
      // Stores the loggedin state in the store
      await store.dispatch("logIn", result);
      const polar_user = await getUser();
      // If the user exists, set the polar user in the store and redirect appropriately
      if (polar_user) {
        await store.dispatch("setPolarUser", polar_user);
        await router.push("/dashboard");
      } else {
        await router.push("/profile");
      }
    })
    .catch(() => {
      toast.error("Something we wrong. Please try again.");
    });
}

/**
 * Registers a user with email and password.
 * @param email The email the user enters
 * @param password The password the user enters
 * @returns {Promise<firebase.auth.UserCredential>} Redirects the user
 * @constructor
 */
export function MailPasswordRegister(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (result) => {
      console.log(result);
      // Stores the loggedin state in the store
      await store.dispatch("logIn", result);
      const polar_user = await getUser();
      // If the user exists, set the polar user in the store and redirect appropriately
      if (polar_user) {
        await store.dispatch("setPolarUser", polar_user);
        await router.push("/dashboard");
      } else {
        await router.push("/profile");
      }
    })
    .catch(() => {
      toast.error("Something we wrong. Please try again.");
    });
}

/**
 * Logs out the current user.
 * This function signs out the user from Firebase authentication, dispatches a logout action to the Vuex store,
 * redirects the user to the home page, and reloads the page.
 *   @returns {Promise} A promise that resolves when the user has been logged out and the page has been reloaded.
 *
 *  @throws {Error} If an error occurs during the sign out process, it will be logged to the console.
 *
 */
export function logout() {
  firebase
    .auth()
    .signOut()
    .then(async () => {
      // Clears the store and redirects to the home page
      await store.dispatch("logOut");
      await router.push("/");
      window.location.reload();
    })
    .catch(() => {
      toast.error("Something we wrong. Please try again.");
    });
}
