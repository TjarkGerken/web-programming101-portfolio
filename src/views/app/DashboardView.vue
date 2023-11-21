<script setup>
import { onMounted, ref } from "vue";
import { getExercises, getPolarActivities } from "@/api/getPolarActivities";
import ApplicationNavbar from "@/components/ApplicationNavbar.vue";
import ActivitiesCard from "@/components/ActivitiesCard.vue";

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
  <ApplicationNavbar></ApplicationNavbar>
  <div class="lg:ml-28">
    <p>This is the dashboard</p>
    <ActivitiesCard
      v-if="exercises.length > 0"
      :activity="exercises[exercises.length - 1]"
    />
  </div>
</template>

<style scoped></style>
