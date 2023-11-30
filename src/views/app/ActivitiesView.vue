<script setup>
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import ActivitiesCard from "@/components/application/ActivitiesCard.vue";
import { onMounted, ref } from "vue";
import { getExercises, getPolarActivities } from "@/api/getPolarActivities";
import Spinner from "@/components/utils/Spinner.vue";

const exercises = ref([]);
const isLoading = ref(true);

onMounted(() => {
  getPolarActivities().then(async () => {
    getExercises()
      .then((res) => {
        exercises.value = res;
        isLoading.value = false;
      })
      .then(() => (exercises.value = [...exercises.value].reverse()));
  });
});
</script>

<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="lg:ml-28">
    <div class="flex flex-col items-center gap-4">
      <h1 class="self-start pr-4 text-left text-3xl">Your Activities</h1>

      <ActivitiesCard
        class="w-11/12 lg:w-8/12"
        v-if="exercises.length > 0"
        v-for="(exercise, index) in exercises"
        :key="index"
        :activity="exercise"
      />
    </div>
    <div v-if="!(exercises.length > 0) & !isLoading">You got no Activities</div>
    <div
      v-if="isLoading"
      class="flex h-screen w-screen items-center justify-center"
    >
      <Spinner />
    </div>
  </div>
</template>
