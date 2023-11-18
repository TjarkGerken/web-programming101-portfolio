import store from "@/store";
import router from "@/router";
import firebase from "firebase/compat/app";

export function googleSignIn() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      await store.dispatch("logIn", result);
      console.log(store.state.user.loggedIn);
      await router.push("/dashboard");
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
