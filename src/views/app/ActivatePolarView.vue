<script setup>
import { onMounted } from "vue";
import { getPolarAuthToken } from "@/api/polarconnection";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  let code = route.query.code;
  getPolarAuthToken(code);
});
</script>

<template></template>
