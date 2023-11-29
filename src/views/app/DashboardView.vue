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
  <div class="h-fit w-screen lg:ml-32 lg:h-screen lg:w-[calc(100%-128px)]">
    <div class="flex h-full w-full flex-col lg:flex-row">
      <div class="my-10 flex w-full flex-col justify-between lg:w-2/3">
        <p class="font-maven text-2xl font-semibold">
          Welcome back, {{ store.state.user.data.displayName }}!
        </p>
        <ActivitiesCard
          v-if="Object.keys(exercises).length > 0"
          :activity="exercises"
        />
        <h1 class="mt-8 font-maven text-3xl font-semibold">Weekly Stats</h1>
        <div class="flex flex-col lg:flex-row">
          <Stats
            v-if="Object.keys(lastWeekStats).length > 0"
            :stats="lastWeekStats"
          />
          <div class="w-2/4 bg-green-950">Chart</div>
        </div>
      </div>
      <div class="w-full lg:w-1/3">
        <Goals />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
