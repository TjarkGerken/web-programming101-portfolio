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
  <div>{{ goal.start_date }} - {{ goal.end_date }}</div>
  <div>{{ achievedValue }} / {{ plannedValue }} {{ unit }}</div>
</template>

<style scoped></style>
