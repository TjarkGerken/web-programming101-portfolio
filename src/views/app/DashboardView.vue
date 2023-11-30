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
  <div
    class="h-[500vh] w-screen p-8 lg:ml-32 lg:h-screen lg:w-[calc(100%-128px)]"
  >
    <p class="my-12 mb-20 w-full font-maven text-2xl font-semibold">
      Welcome back, {{ store.state.user.data.displayName }}!
    </p>
    <div class="flex h-full w-full flex-col justify-between gap-10 lg:flex-row">
      <div
        class="flex w-full flex-col justify-between gap-6 self-start lg:w-2/3"
      >
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
      <div class="my-8 w-full justify-start self-start lg:my-0 lg:w-1/3">
        <Goals />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
