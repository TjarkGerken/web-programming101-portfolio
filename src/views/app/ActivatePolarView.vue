<script setup>
import { onMounted } from "vue";
import { getPolarAuthToken } from "@/api/polarconnection";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  /**
   *  The OAuth2 code returned from Polar by redirecting the user to this callback URL and senderthe code as a parameter
   * @type {string | LocationQueryValue[]}
   */
  let code = route.query.code;
  getPolarAuthToken(code);
});
</script>

<template></template>
