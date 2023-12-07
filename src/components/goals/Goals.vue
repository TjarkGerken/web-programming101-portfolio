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
  <div class="flex flex-col w-full items-center gap-4">

    <DisplayGoal v-for="goal in goals" :key="goal.id" :goal="goal" />
    <div class="w-full flex justify-center xl:justify-end">
      <button
        class="w-full rounded-md bg-accent-yellow px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-accent-yellow-light mt-4 mb-16"
      >
        <CreateGoal @goal-created="getGoals" />
      </button>
    </div>
  </div>

</template>
