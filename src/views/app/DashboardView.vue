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
import store from "../../store";

const exercises = ref({});
const lastWeekStats = ref({});
onMounted(() => {
  getPolarActivities().then(async () => {
    getLatestExercise()
      .then((res) => {
        exercises.value = res;
      })
      .then(
        await aggregateLastWeekStats().then((res) => {
          lastWeekStats.value = res;
        }),
      );
  });
});
</script>

<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="h-screen lg:ml-28">
    <div class="flex h-screen flex-col lg:flex-row">
      <div class="mx-8 my-10 flex w-2/3 flex-col justify-between">
        <p class="font-maven text-2xl font-semibold">
          Welcome back, {{ store.state.user.data.displayName }}!
        </p>
        <ActivitiesCard
          v-if="Object.keys(exercises).length > 0"
          :activity="exercises"
        />
        <h1 class="font-maven mt-8 text-3xl font-semibold">Weekly Stats</h1>
        <div class="flex flex-col lg:flex-row">
          <Stats
            class="w-2/4 pr-8"
            v-if="Object.keys(lastWeekStats).length > 0"
            :stats="lastWeekStats"
          />
          <div class="w-2/4 bg-green-950">Chart</div>
        </div>
      </div>
      <div class="w-full bg-emerald-200 lg:w-1/3">
        <Goals />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
