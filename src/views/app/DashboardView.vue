<script setup>
import { onMounted, ref } from "vue";
import {
  aggregateLastWeekStats,
  getLatestExercise,
  getPolarActivities,
} from "@/api/getPolarActivities";
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import ActivitiesCard from "@/components/application/ActivitiesCard.vue";
import Goals from "@/components/goals/Goals.vue";
import Stats from "@/components/application/Stats.vue";

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
    <div class="flex flex-col items-center lg:flex-row">
      <div class="mx-8 w-2/3">
        <p>This is the dashboard</p>
        <ActivitiesCard
          v-if="Object.keys(exercises).length > 0"
          :activity="exercises"
        />
        <Stats
          v-if="Object.keys(lastWeekStats).length > 0"
          :stats="lastWeekStats"
        />
        <div class="w-full bg-emerald-200 lg:w-2/3">
          <Goals />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
