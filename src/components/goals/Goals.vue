<script setup>
import { onMounted, ref } from "vue";
import { evaluateGoals } from "@/api/goals";
import CreateGoal from "@/components/goals/CreateGoal.vue";
import DisplayGoal from "@/components/goals/DisplayGoal.vue";
const goals = ref([]);

function getGoals() {
  evaluateGoals().then((res) => {
    goals.value = res;
    if (goals.value.length > 7) {
      goals.value = goals.value.slice(0, 7);
    }
  });
  console.log("hi");
}

onMounted(() => {
  getGoals();
});
</script>

<template>
  <div class="flex h-full w-full items-center px-2">
    <div
      class="mx-auto flex h-fit w-full flex-col justify-evenly gap-2 rounded-3xl p-8 py-4 shadow-sm shadow-neutral-400"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold lg:text-2xl">Goals</h2>
      </div>
      <DisplayGoal v-for="goal in goals" :goal="goal" :key="goal.id" />
      <button
        class="flex flex-row items-center justify-center gap-6 rounded-xl bg-[#6F42C1] p-2 font-bold text-white"
      >
        <CreateGoal @goal-created="getGoals" />
      </button>
    </div>
  </div>
</template>
