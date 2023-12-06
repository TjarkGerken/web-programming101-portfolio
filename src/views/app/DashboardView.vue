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
const isLoading = ref(true);
const noActivities = ref(false);
const lastWeekStats = ref({});
onMounted(() => {
  try {
    if (store.state.user.polar_user) {
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
  <div class="h-fit w-screen px-8 lg:ml-32 lg:h-screen lg:w-[calc(100%-128px)]">
    <h1 class="mt-12 text-center text-4xl font-semibold">Dashboard</h1>
    <p
      class="my-3 mb-8 w-full text-center font-maven text-2xl font-medium"
      v-if="store.state.user.data.displayName"
    >
      Welcome back, {{ store.state.user.data.displayName }}!
    </p>
    <p
      class="my-3 mb-8 w-full text-center font-maven text-lg font-medium"
      v-else
    >
      Welcome back!
    </p>
    <div class="flex h-fit w-full flex-col justify-between gap-5">
      <div class="flex w-full flex-col justify-between gap-4 self-start">
        <ActivitiesCard
          v-if="Object.keys(exercises).length > 0"
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
      <div class="flex flex-col lg:flex-row">
        <div class="flex flex-col lg:w-1/2">
          <h2 class="mt-20 text-center text-3xl font-semibold lg:text-left">
            Weekly Progress
          </h2>
          <p class="mb-20 text-center lg:text-left" v-if="!noActivities">
            Congratulations, You’ve burned {{ lastWeekStats.total_calories }}
            Calories this week. Keep it up!.
          </p>
          <p
            class="mb-20 text-center lg:w-3/4 lg:text-left"
            v-if="noActivities"
          >
            Here you will find your weekly progress as soon as you connected
            your Polar Account and uploaded your first Activity.
          </p>
          <div class="flex flex-col lg:flex-row" v-if="!noActivities">
            <Stats
              v-if="Object.keys(lastWeekStats).length > 0"
              :stats="lastWeekStats"
            />

            <!-- @LUKAS HIER KOMMT DER CHART HIN -->
          </div>
        </div>
        <div class="my-4 w-full justify-start self-start lg:my-0 lg:w-1/2">
          <h2 class="mt-20 text-center text-3xl font-semibold lg:text-left">
            Goals
          </h2>
          <p class="mb-20 text-center lg:text-left" v-if="!noActivities">
            You’re making progress on your personal goals.
          </p>
          <p class="mb-20 text-center lg:text-left" v-if="noActivities">
            You can already add goals which will be evaluated when you upload
            your first Activity.
          </p>
          <Goals />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
