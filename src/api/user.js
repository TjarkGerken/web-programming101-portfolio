import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import store from "@/store";

export async function getUser() {
  const doc = await firebase
    .firestore()
    .collection("user")
    .doc(store.state.user.data.uid)
    .get();
  return doc.data();
}
