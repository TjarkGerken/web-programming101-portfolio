import store from "@/store";
import router from "@/router";
import firebase from "firebase/compat/app";
import { getUser } from "@/api/user";
import { useToast } from "vue-toast-notification";
const toast = useToast();

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

export function MailPasswordSignIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
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
    .catch((error) => {
      toast.error("Something we wrong. Please try again.");
      console.log(error);
    });
}

export function MailPasswordRegister(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (result) => {
      console.log(result);
      await store.dispatch("logIn", result);
      const polar_user = await getUser();
      if (polar_user) {
        await store.dispatch("setPolarUser", polar_user);
        await router.push("/dashboard");
      } else {
        await router.push("/profile");
      }
    })
    .catch((error) => {
      toast.error("Something we wrong. Please try again.");
      console.log(error);
    });
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then(async () => {
      await store.dispatch("logOut");
      await router.push("/");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
