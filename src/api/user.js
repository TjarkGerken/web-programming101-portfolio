import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import store from "@/store";

/**
 * Gets the user from the database by the login
 * @returns {Promise<DocumentData>} Returns the user data
 */
export async function getUser() {
  const doc = await firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .get();
  return doc.data();
}

/**
 *  Updates the user in the database. Used in the profile page.
 * @param user
 * @returns {Promise<void>}
 */
export async function updateUser(user) {
  await firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .set(user, { merge: true });
}

/**
 *  Deletes the user in the database.
 * @returns {Promise<void>}
 */
export async function deleteFirebaseUser() {
  await firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .delete();
}
