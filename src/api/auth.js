import store from "@/store";
import router from "@/router";
import firebase from "firebase/compat/app";
import { getUser } from "@/api/user";

export function googleSignIn() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      await store.dispatch("logIn", result);
      const polar_user = await getUser();
      if (polar_user) {
        await store.dispatch("setPolarUser", polar_user);
        await router.push("/dashboard");
      } else {
        await router.push("/profile");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then(async () => {
      // Sign-out successful.
      await store.dispatch("logOut");
      await router.push("/");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
