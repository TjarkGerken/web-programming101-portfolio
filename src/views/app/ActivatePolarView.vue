<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";
import { useToast } from "vue-toast-notification";

export default {
  name: "PolarConnect",
  setup() {
    const route = useRoute();
    const toast = useToast();

    onMounted(async () => {
      let code = route.query.code;
      console.log(code); // XYZ
      const url = "https://polarremote.com/v2/oauth2/token";
      const headers = {
        Accept: "application/json;charset=UTF-8",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: import.meta.env.VITE_POLAR_AUTHORIZATION,
      };
      const data = "grant_type=authorization_code&code=" + code;
      try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);

        // Register User
        const register_data =
          "<register><member-id>" +
          response.data.x_user_id +
          "</member-id></register>";
        console.log(register_data);
        const register_url =
          "https://europe-west3-glass-memento-405322.cloudfunctions.net/polarhttpproxy/v3/users";
        const register_headers = {
          "Content-Type": "application/xml",
          Authorization: "Bearer " + response.data.access_token,
        };
        const register_response = await axios.post(
          register_url,
          register_data,
          {
            headers: register_headers,
          },
        );
        console.log(register_response.data);
        toast.success("You're account was successfully connected.");
        await router.push("/");
      } catch (error) {
        await router.push("/profile");
        toast.error("Something we wrong. Please try again.");
        console.error(error);
      }
    });
  },
};
</script>

<template></template>
