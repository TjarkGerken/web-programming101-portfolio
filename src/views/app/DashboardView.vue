<script setup>
import { onMounted, ref } from "vue";
import {
  aggregateLastWeekStats,
  getLatestExercise,
  getPolarActivities,
} from "@/api/getPolarActivities";
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import ActivitiesCard from "@/components/application/ActivitiesCard.vue";
import Goals from "@/components/goals/GoalList.vue";
import Stats from "@/components/application/StatsDisplay.vue";
import store from "../../store";

const exercises = ref({});
const isLoading = ref(true);
const noActivities = ref(false);
const lastWeekStats = ref({});

// Check if there are new activities and update the list. Additionally, check if there are no activities and show a message.
onMounted(() => {
  try {
    if (
      store.state.user.polar_user &&
      store.state.user.polar_user.polar_access_token
    ) {
      getPolarActivities().then(async () => {
        getLatestExercise()
          .then((res) => {
            if (res) {
              exercises.value = res;
              if (Object.keys(exercises.value).length === 0) {
                noActivities.value = true;
              } else {
                isLoading.value = false;
              }
            } else {
              noActivities.value = true;
              isLoading.value = false;
            }
          })
          .then(async () => {
            // Get the stats from last week
            if (exercises.value && Object.keys(exercises.value).length > 0) {
              await aggregateLastWeekStats().then((res) => {
                if (res) {
                  lastWeekStats.value = res;
                } else {
                  noActivities.value = true;
                  isLoading.value = false;
                }
              });
            }
          });
      });
    } else {
      noActivities.value = true;
      isLoading.value = false;
    }
  } catch (e) {
    noActivities.value = true;
    isLoading.value = false;
    console.warn(e);
  }
});
</script>

<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div
    class="h-fit w-screen px-8 lg:ml-32 lg:h-screen lg:w-[calc(100%-128px)] xl:flex xl:flex-col xl:items-center"
  >
    <h1
      class="mt-8 text-center text-3xl font-bold leading-10 xl:w-2/3 xl:text-left"
    >
      Dashboard
    </h1>
    <p
      v-if="store.state.user.data.displayName"
      class="mb-8 w-full text-center text-2xl font-medium xl:mb-4 xl:w-2/3 xl:text-left"
    >
      Welcome back, {{ store.state.user.data.displayName }}!
    </p>
    <p
      v-else
      class="mb-8 w-full text-center text-lg font-medium xl:mb-4 xl:w-2/3 xl:text-left"
    >
      Welcome back!
    </p>
    <div class="flex h-fit w-full flex-col justify-between gap-5 xl:w-2/3">
      <div
        class="flex w-full flex-col justify-between gap-4 self-start xl:mb-4"
      >
        <ActivitiesCard
          v-if="exercises && Object.keys(exercises).length > 0"
          :activity="exercises"
        />
        <div v-if="noActivities" class="text-center">
          You got no Activities.
          <router-link to="/profile" class="underline"
            >Connect your Polar Account</router-link
          >
          to get started or upload a new Activity if you are already connected!
        </div>
      </div>

      <hr class="my-8 xl:hidden" />

      <div class="flex flex-col gap-5 lg:flex-row">
        <div class="flex flex-col lg:w-1/2">
          <h2 class="text-center text-2xl font-bold leading-10 lg:text-left">
            Weekly Progress
          </h2>
          <p
            v-if="!noActivities"
            class="mb-8 text-center font-medium lg:text-left"
          >
            View your weekly statistics and progress.
          </p>
          <p v-if="noActivities" class="mb-8 text-center lg:w-3/4 lg:text-left">
            Here you will find your weekly progress as soon as you connected
            your Polar Account and uploaded your first Activity.
          </p>
          <div v-if="!noActivities" class="mb-2 flex flex-col">
            <Stats
              v-if="lastWeekStats && Object.keys(lastWeekStats).length > 0"
              :stats="lastWeekStats"
            />
          </div>
        </div>

        <hr class="my-8" />

        <div class="w-full justify-start self-start lg:my-0 lg:w-1/2">
          <h2 class="text-center text-2xl font-bold leading-10 lg:text-left">
            This Weeks Goals
          </h2>
          <p
            v-if="!noActivities"
            class="mb-8 text-center font-medium lg:text-left"
          >
            You’re making progress on your personal goals.
          </p>
          <p
            v-if="noActivities"
            class="mb-8 text-center font-medium lg:text-left"
          >
            You can already add goals which will be evaluated when you upload
            your first Activity.
          </p>
          <Goals />
        </div>
      </div>
    </div>
  </div>
</template>
