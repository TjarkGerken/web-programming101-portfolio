<script setup>
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import ActivitiesCard from "@/components/application/ActivitiesCard.vue";
import { onMounted, ref } from "vue";
import { getExercises, getPolarActivities } from "@/api/getPolarActivities";
import Spinner from "@/components/utils/Spinner.vue";
import store from "@/store";

const exercises = ref([]);
const isLoading = ref(true);
const noActivities = ref(false);
// Check if there are new activities and update the list. Additionally, check if there are no activities and show a message.
onMounted(() => {
  try {
    if (
      store.state.user.polar_user &&
      store.state.user.polar_user.polar_access_token
    ) {
      getPolarActivities().then(async () => {
        getExercises()
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
          .then(() => (exercises.value = [...exercises.value].reverse()));
      });
    } else {
      noActivities.value = true;
      isLoading.value = false;
    }
  } catch (e) {
    console.warn(e);
  }
});
</script>

<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div
    class="h-fit w-screen px-8 lg:ml-32 lg:h-screen lg:w-[calc(100%-152px)] xl:flex xl:flex-col xl:items-center"
  >
    <h1 class="xL:pb-16 w-full pb-8 pt-16 text-center text-3xl font-bold">
      Your Activities
    </h1>
    <div v-if="noActivities" class="w-fit pl-12 pt-12 text-left">
      You got no Activities.
      <router-link to="/profile" class="underline"
        >Connect your Polar Account</router-link
      >
      to get started or upload a new Activity if you are already connected!
    </div>
    <div
      v-if="!noActivities"
      class="flex flex-col items-center gap-4 pb-16 xl:w-2/3 xl:gap-6"
    >
      <ActivitiesCard
        v-for="(exercise, index) in exercises"
        v-if="exercises.length > 0"
        :key="index"
        class="flex w-11/12 justify-center lg:w-full"
        :activity="exercise"
      />
    </div>

    <div
      v-if="isLoading && !noActivities"
      class="flex w-full items-center justify-center"
    >
      <Spinner />
    </div>
  </div>
</template>
