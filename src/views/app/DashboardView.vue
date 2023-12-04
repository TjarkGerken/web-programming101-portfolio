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
  <div class="h-fit w-screen px-8 lg:ml-32 lg:h-screen lg:w-[calc(100%-128px)]">
    <p
      class="my-3 w-full font-maven text-2xl font-semibold"
      v-if="store.state.user.data.displayName"
    >
      Welcome back, {{ store.state.user.data.displayName }}!
    </p>
    <p class="my-3 w-full text-2xl font-semibold" v-else>Welcome back!</p>
    <div class="flex h-fit w-full flex-col justify-between gap-5 lg:flex-row">
      <div
        class="flex w-full flex-col justify-between gap-4 self-start lg:w-2/3"
      >
        <ActivitiesCard
          v-if="Object.keys(exercises).length > 0"
          :activity="exercises"
        />
        <h1 class="text-3xl font-semibold">Weekly Stats</h1>
        <div class="flex flex-col lg:flex-row">
          <Stats
            v-if="Object.keys(lastWeekStats).length > 0"
            :stats="lastWeekStats"
          />
          <div class="bg-green-950 lg:w-2/4">Chart</div>
        </div>
      </div>
      <div class="my-4 w-full justify-start self-start lg:my-0 lg:w-1/3">
        <Goals />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
