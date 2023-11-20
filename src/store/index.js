import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      token: null,
      data: null,
      polar_user: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_TOKEN(state, value) {
      state.user.token = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_POLAR_USER(state, data) {
      state.user.polar_user = data;
    },
  },
  actions: {
    logIn(context, response) {
      context.commit("SET_LOGGED_IN", true);
      context.commit("SET_TOKEN", response.credential.accessToken);
      context.commit("SET_USER", response.user);
    },

    logOut(context) {
      context.commit("SET_LOGGED_IN", false);
      context.commit("SET_TOKEN", null);
      context.commit("SET_USER", null);
      context.commit("SET_POLAR_USER_ID", null);
      context.commit("SET_POLAR_USER", null);
    },
    setPolarUser(context, polar_user) {
      context.commit("SET_POLAR_USER", polar_user);
    },
  },
  plugins: [vuexLocalStorage.plugin],
});
export default store;
