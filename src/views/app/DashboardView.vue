<script setup>
import { onMounted, ref } from "vue";
import { getExercises, getPolarActivities } from "@/api/getPolarActivities";
import ApplicationNavbar from "@/components/ApplicationNavbar.vue";
import ActivitiesCard from "@/components/ActivitiesCard.vue";
import DashboardMapSection from "@/components/DashboardMapSection.vue";
import WeeklyStatsSection from "@/components/WeeklyStatsSection.vue";
import WeeklyGoalSection from "@/components/WeeklyGoalSection.vue";

const exercises = ref([]);

onMounted(() => {
  getPolarActivities().then(() => {
    getExercises().then((res) => {
      exercises.value = res;
    });
  });
});

//<ActivitiesCard
//v-if="exercises.length > 0"
//   :activity="exercises[exercises.length - 1]"
// />
</script>

<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div
    class="flex h-fit w-screen flex-col p-8 lg:ml-32 lg:h-screen lg:w-[calc(100%-128px)]"
  >
    <div class="w-full">
      <h2 class="text-xl">Primary</h2>
      <h1 class="text-3xl font-bold">Dashboard</h1>
    </div>
    <div
      class="flex h-fit w-full flex-col justify-start gap-6 lg:h-full lg:flex-row"
    >
      <main class="flex h-fit w-full flex-col gap-12 lg:h-full lg:w-2/3">
        <DashboardMapSection />
        <h1 class="w-full text-xl font-bold lg:text-2xl">Weekly Stats</h1>
        <div
          class="flex flex-col gap-8 lg:flex lg:h-[40%] lg:flex-row lg:justify-evenly"
        >
          <div class="flex flex-col justify-between lg:w-1/2">
            <WeeklyStatsSection />
          </div>
          <div
            class="flex flex-col rounded-2xl p-4 shadow-md shadow-neutral-400 lg:w-1/2"
          >
            <h2 class="text-2xl font-semibold">Activity</h2>
            <div class="h-36"></div>
          </div>
        </div>
      </main>
      <WeeklyGoalSection />
    </div>
  </div>
</template>

<style scoped></style>
