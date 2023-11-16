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
  },
  actions: {
    logIn(context, response) {
      context.commit("SET_LOGGED_IN", true);
      context.commit("SET_TOKEN", response.credential.accessToken);
      context.commit("SET_USER", response.user);
    },

    async logOut(context) {
      context.commit("SET_LOGGED_IN", false);
      context.commit("SET_TOKEN", null);
      context.commit("SET_USER", null);
    },
  },
  plugins: [vuexLocalStorage.plugin],
});
export default store;
