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
      goal.completed ? 'border-green-400' : 'border-neutral-400'
    }`"
  >
    <div v-if="goal.completed">
      <div class="">
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.125 16.5938L14.4062 19.875L19.875 12.2188M28.625 15.5C28.625 17.2236 28.2855 18.9303 27.6259 20.5227C26.9663 22.1151 25.9995 23.562 24.7808 24.7808C23.562 25.9995 22.1151 26.9663 20.5227 27.6259C18.9303 28.2855 17.2236 28.625 15.5 28.625C13.7764 28.625 12.0697 28.2855 10.4773 27.6259C8.88488 26.9663 7.43799 25.9995 6.21922 24.7808C5.00045 23.562 4.03367 22.1151 3.37408 20.5227C2.71449 18.9303 2.375 17.2236 2.375 15.5C2.375 12.019 3.75781 8.68064 6.21922 6.21922C8.68064 3.75781 12.019 2.375 15.5 2.375C18.981 2.375 22.3194 3.75781 24.7808 6.21922C27.2422 8.68064 28.625 12.019 28.625 15.5Z"
            stroke="#C1EBB0"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div v-else>
      <svg
        width="35"
        height="35"
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
