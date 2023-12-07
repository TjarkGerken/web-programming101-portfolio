<script setup>
import { ref } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { formatDate } from "@/api/utils";
import { Duration } from "luxon";

const props = defineProps({
  goal: Object,
});

const goal = props.goal;
const achievedValue = ref();
const unit = ref("");
const plannedValue = ref(goal.goal_value);

if (goal.goal_type === "Distance") {
  achievedValue.value = goal.total_distance;
  unit.value = "Kilometers";
} else if (goal.goal_type === "Time") {
  achievedValue.value = Duration.fromISOTime(goal.total_duration).toFormat("m");
  plannedValue.value = Duration.fromObject({
    minutes: goal.goal_value,
  }).toFormat("m");
  unit.value = "Minutes";
} else if (goal.goal_type === "Calories") {
  achievedValue.value = goal.total_calories;
  unit.value = "Kilocalories";
}

goal.start_date = formatDate(
  new firebase.firestore.Timestamp(
    goal.start_date.seconds,
    goal.start_date.nanoseconds,
  ).toDate(),
);
goal.end_date = formatDate(
  new firebase.firestore.Timestamp(
    goal.end_date.seconds,
    goal.end_date.nanoseconds,
  ).toDate(),
);
</script>

<template>
  <div
    :class="`flex flex-row items-center justify-start gap-4 w-full rounded-xl border  p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] ${
      goal.completed ? 'border-accent-yellow border-[4px]' : 'border-gray-300 border-opacity-30'
    }`"
  >
    <div v-if="goal.completed">
      <div class="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#7E56C8" class="w-9 h-9">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

      </div>
    </div>
    <div v-else>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#263238" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>

    </div>
    <div class="flex w-full flex-col xl:justify-center p-[2.5px]">
      <div class="flex flex-col justify-between xl:flex-row ">
        <div class="font-bold">{{ goal.goal_type }}</div>
        <div class="text-sm xl:text-md xl:font-bold">
          {{ goal.start_date }} - {{ goal.end_date }}
        </div>
      </div>
      <div class="font-medium text-sm">{{ achievedValue }} / {{ plannedValue }} {{ unit }}</div>
    </div>
  </div>
</template>

<style scoped></style>
