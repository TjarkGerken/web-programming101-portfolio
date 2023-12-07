<script setup>
import { onMounted, ref } from "vue";
import { evaluateGoals } from "@/api/goals";
import CreateGoal from "@/components/goals/CreateGoal.vue";
import DisplayGoal from "@/components/goals/DisplayGoal.vue";
const goals = ref([]);

/**
 * Function to get the goals from the database and evaluate them.
 *  Additionally, trims them to the first 3 active goals. For display purposes.
 */
function getGoals() {
  evaluateGoals().then((res) => {
    goals.value = res;
    if (goals.value.length > 3) {
      goals.value = goals.value.slice(0, 3);
    }
  });
}

onMounted(() => {
  getGoals();
});
</script>

<template>
  <div class="flex w-full flex-col items-center gap-4">
    <DisplayGoal
      v-for="goal in goals"
      :key="goal.id"
      :goal="goal"
      @goal-deleted="getGoals"
    />
    <div class="flex w-full justify-center xl:justify-end">
      <button
        class="mb-16 mt-4 w-full rounded-md bg-accent-yellow px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-accent-yellow-light"
      >
        <CreateGoal :goal-array="goals" @goal-created="getGoals" />
      </button>
    </div>
  </div>
</template>
