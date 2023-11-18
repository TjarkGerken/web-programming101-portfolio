<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";
import { useToast } from "vue-toast-notification";
import {
  BASE_URL_CORS_PROXY,
  POLAR_BASIC_AUTH_CLIENT_ID_SECRET,
  BASE_URL_POLAR_TOKEN,
} from "@/api-config";

export default {
  name: "PolarConnect",
  setup() {
    const route = useRoute();
    const toast = useToast();

    onMounted(async () => {
      let code = route.query.code;
      const headers = {
        Accept: "application/json;charset=UTF-8",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: POLAR_BASIC_AUTH_CLIENT_ID_SECRET,
      };
      const data = "grant_type=authorization_code&code=" + code;
      try {
        const response = await axios.post(BASE_URL_POLAR_TOKEN, data, {
          headers,
        });
        try {
          const register_data =
            "<register><member-id>" +
            response.data.x_user_id +
            "</member-id></register>";
          const register_url = BASE_URL_CORS_PROXY + "/v3/users";
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
          console.log(register_response);
          await router.push("/profile");
          toast.success("You're account was successfully connected.");
        } catch (error) {
          if (error.response.status === 409) {
            toast.success("You're account was successfully connected.");
          } else {
            toast.error("Something we wrong. Please try again.");
            console.error(error);
          }
        }
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
