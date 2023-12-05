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
    :class="`flex flex-row items-center justify-start gap-4 rounded-xl border-4 border-solid p-2 ${
      goal.completed ? 'border-[#6F42C1]' : 'border-neutral-400'
    }`"
  >
    <div v-if="goal.completed">
      <div class="">
        <svg
          width="40"
          height="40"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.22507 10.6572L9.20201 12.6342L12.4969 8.02133M17.7687 9.99827C17.7687 11.0367 17.5642 12.065 17.1668 13.0244C16.7694 13.9838 16.1869 14.8556 15.4526 15.5899C14.7183 16.3242 13.8466 16.9067 12.8872 17.3041C11.9277 17.7015 10.8994 17.906 9.86099 17.906C8.82252 17.906 7.79423 17.7015 6.83482 17.3041C5.87541 16.9067 5.00366 16.3242 4.26936 15.5899C3.53506 14.8556 2.95258 13.9838 2.55517 13.0244C2.15777 12.065 1.95323 11.0367 1.95323 9.99827C1.95323 7.901 2.78637 5.88963 4.26936 4.40664C5.75235 2.92365 7.76372 2.09052 9.86099 2.09052C11.9583 2.09052 13.9696 2.92365 15.4526 4.40664C16.9356 5.88963 17.7687 7.901 17.7687 9.99827Z"
            stroke="#6F42C1"
            stroke-opacity="0.5"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div v-else>
      <svg
        width="40"
        height="40"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35 17.5C35 27.165 27.165 35 17.5 35C7.83502 35 0 27.165 0 17.5C0 7.83502 7.83502 0 17.5 0C27.165 0 35 7.83502 35 17.5ZM1.80182 17.5C1.80182 26.1699 8.83013 33.1982 17.5 33.1982C26.1699 33.1982 33.1982 26.1699 33.1982 17.5C33.1982 8.83013 26.1699 1.80182 17.5 1.80182C8.83013 1.80182 1.80182 8.83013 1.80182 17.5Z"
          fill="#595959"
        />
      </svg>
    </div>
    <div class="flex w-full flex-col">
      <div class="flex flex-col justify-between md:flex-row">
        <div class="font-bold">{{ goal.goal_type }}</div>
        <div class="text-sm md:text-lg">
          {{ goal.start_date }} - {{ goal.end_date }}
        </div>
      </div>
      <div>{{ achievedValue }} / {{ plannedValue }} {{ unit }}</div>
    </div>
  </div>
</template>

<style scoped></style>
