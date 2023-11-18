<script setup>
import Navbar from "@/components/navbar.vue";
import { onMounted } from "vue";
import { getPolarActivities } from "@/api/getPolarActivities";
onMounted(() => {
  console.log("Dashboard mounted");
  getPolarActivities();
});
</script>

<template>
  <Navbar></Navbar>
  <p>This is the dashboard</p>
</template>

<style scoped></style>
