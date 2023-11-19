<script setup>
import Navbar from "@/components/navbar.vue";
import { onMounted, ref } from "vue";
import { getExercises, getPolarActivities } from "@/api/getPolarActivities";

const exercises = ref([]);

onMounted(() => {
  getPolarActivities().then(() => {
    getExercises().then((res) => {
      exercises.value = res;
    });
  });
});
</script>

<template>
  <Navbar></Navbar>
  <p>This is the dashboard</p>
  {{ exercises }}
</template>

<style scoped></style>
