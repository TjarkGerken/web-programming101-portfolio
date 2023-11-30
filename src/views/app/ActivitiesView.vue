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
  <div class="w-screen lg:ml-28 lg:w-[calc(100%-140px)]">
    <h1 class="pl-12 text-left text-3xl">Your Activities</h1>
    <div class="flex w-full flex-col items-center gap-4 bg-amber-50">
      <ActivitiesCard
        class="w-11/12 lg:w-8/12"
        v-if="exercises.length > 0"
        v-for="(exercise, index) in exercises"
        :key="index"
        :activity="exercise"
      />
    </div>
    <div v-if="!(exercises.length > 0) & !isLoading">You got no Activities</div>
    <div v-if="isLoading" class="flex w-full items-center justify-center">
      <Spinner />
    </div>
  </div>
</template>
