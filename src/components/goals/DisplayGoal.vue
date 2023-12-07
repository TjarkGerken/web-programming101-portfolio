<script setup>
import { ref } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { formatDate } from "@/api/utils";
import { Duration } from "luxon";
import { deleteGoalById } from "@/api/goals";

const props = defineProps({
  goal: Object,
});

const goal = props.goal;

// Initialize the values
const achievedValue = ref();
const unit = ref("");
const plannedValue = ref(goal.goal_value);

/**
 * Emit the event to the parent component. Used by the parent component to refresh the goals.
 * @type {EmitFn<string[]>}
 */
const emit = defineEmits(["goal-deleted"]);

const deleteModalOpen = ref(false);

/**
 * Function to toggle the delete modal.
 */
function toggleDeleteModal() {
  deleteModalOpen.value = !deleteModalOpen.value;
}

/**
 * Function to delete the goal.
 * @param goal Goal to delete
 */
function deleteGoal(goal) {
  deleteGoalById(goal.id);
  emit("goal-deleted");
}

// Format the achieved value and the unit from the goal that is passed as a property.
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
// Format the dates
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
    :class="`flex w-full flex-row items-center justify-start gap-4 rounded-xl border  p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] ${
      goal.completed
        ? 'border-[4px] border-accent-yellow'
        : 'border-gray-300 border-opacity-30'
    }`"
  >
    <div v-if="goal.completed">
      <div class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="#7E56C8"
          class="h-9 w-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
    <div v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="#263238"
        class="h-8 w-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </div>
    <div class="flex w-full flex-col p-[2.5px] xl:justify-center">
      <div class="flex flex-col justify-between xl:flex-row">
        <div class="font-bold">{{ goal.goal_type }}</div>
        <div class="xl:text-md text-sm xl:font-bold">
          {{ goal.start_date }} - {{ goal.end_date }}
        </div>
      </div>
      <div class="flex w-full justify-between">
        <div class="text-sm font-medium">
          {{ achievedValue }} / {{ plannedValue }} {{ unit }}
        </div>
        <button class="text-sm text-gray-600" @click="toggleDeleteModal()">
          Delete
        </button>
      </div>
    </div>
  </div>
  <div
    class="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
    v-if="deleteModalOpen"
    @click="toggleDeleteModal()"
  ></div>
  <div
    v-if="deleteModalOpen"
    class="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center px-5"
  >
    <div class="flex flex-col rounded-lg bg-white p-4 md:px-16 md:py-8">
      <span class="text-center text-2xl font-semibold">Delete Goal</span>
      <span class="text-center">Are you sure you want to delete this?</span>
      <div class="mt-5 flex justify-around">
        <button
          class="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white"
          @click="toggleDeleteModal()"
        >
          Dismiss
        </button>
        <button
          class="rounded-lg bg-red-800 px-4 py-2 text-white"
          @click="deleteGoal(goal)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
