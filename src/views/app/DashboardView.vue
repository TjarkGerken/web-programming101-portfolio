<script setup>
import { onMounted, ref } from "vue";
import {
  aggregateLastWeekStats,
  getLatestExercise,
  getPolarActivities,
} from "@/api/getPolarActivities";
import ApplicationNavbar from "@/components/ApplicationNavbar.vue";
import ActivitiesCard from "@/components/ActivitiesCard.vue";
import Goals from "@/components/Goals.vue";

const exercises = ref({});
const lastWeekStats = ref({});

onMounted(() => {
  console.log("mounted");
  getPolarActivities().then(async () => {
    getLatestExercise()
      .then((res) => {
        exercises.value = res;
      })
      .then(
        aggregateLastWeekStats().then((res) => {
          lastWeekStats.value = res;
        }),
      );
  });
});
</script>

<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="lg:ml-28">
    <div class="flex">
      <div class="w-2/3">
        <p>This is the dashboard</p>
        <ActivitiesCard
          v-if="Object.keys(exercises).length > 0"
          :activity="exercises"
        />
        {{ lastWeekStats }}
      </div>
      <div class="w-1/3">
        <Goals />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
