<script setup>
import { onMounted, ref } from "vue";
import { evaluateGoals } from "@/api/goals";
import CreateGoal from "@/components/goals/CreateGoal.vue";
import DisplayGoal from "@/components/goals/DisplayGoal.vue";
const goals = ref([]);

function getGoals() {
  evaluateGoals().then((res) => {
    goals.value = res;
    if (goals.value.length > 9) {
      goals.value = goals.value.slice(0, 9);
    }
  });
}

onMounted(() => {
  getGoals();
});
</script>

<template>
  <div class="flex h-full w-full items-center px-2 py-5">
    <div
      class="mx-auto flex h-fit w-full flex-col justify-evenly gap-2 rounded-3xl p-8 py-4 shadow-lg shadow-neutral-400"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold lg:text-2xl">Goals</h2>
      </div>
      <DisplayGoal v-for="goal in goals" :goal="goal" :key="goal.id" />
      <button
        class="flex flex-row items-center justify-center gap-6 rounded-xl border-4 border-solid p-2 font-bold"
      >
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 11.125V19.875M19.875 15.5H11.125M28.625 15.5C28.625 17.2236 28.2855 18.9303 27.6259 20.5227C26.9663 22.1151 25.9995 23.562 24.7808 24.7808C23.562 25.9995 22.1151 26.9663 20.5227 27.6259C18.9303 28.2855 17.2236 28.625 15.5 28.625C13.7764 28.625 12.0697 28.2855 10.4773 27.6259C8.88488 26.9663 7.43799 25.9995 6.21922 24.7808C5.00045 23.562 4.03367 22.1151 3.37408 20.5227C2.71449 18.9303 2.375 17.2236 2.375 15.5C2.375 12.019 3.75781 8.68064 6.21922 6.21922C8.68064 3.75781 12.019 2.375 15.5 2.375C18.981 2.375 22.3194 3.75781 24.7808 6.21922C27.2422 8.68064 28.625 12.019 28.625 15.5Z"
            stroke="#232531"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <CreateGoal @goal-created="getGoals" />
      </button>
    </div>
  </div>
</template>
