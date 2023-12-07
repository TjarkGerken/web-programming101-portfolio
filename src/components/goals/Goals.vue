<script setup>
import { onMounted, ref } from "vue";
import { evaluateGoals } from "@/api/goals";
import CreateGoal from "@/components/goals/CreateGoal.vue";
import DisplayGoal from "@/components/goals/DisplayGoal.vue";
const goals = ref([]);

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
      @goal-deleted="getGoals"
      v-for="goal in goals"
      :key="goal.id"
      :goal="goal"
    />
    <div class="flex w-full justify-center xl:justify-end">
      <button
        class="mb-16 mt-4 w-full rounded-md bg-accent-yellow px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-accent-yellow-light"
      >
        <CreateGoal @goal-created="getGoals" :goalArray="goals" />
      </button>
    </div>
  </div>
</template>
