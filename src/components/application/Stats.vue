<script setup>
import { ref } from "vue";

const props = defineProps({
  stats: Object,
});
const stats = props.stats;
const currentStat = ref(1);
console.log(stats);
function incrementStat() {
  if (currentStat.value !== 4) {
    currentStat.value++;
  } else {
    currentStat.value = 1;
  }
}
function decrementStat() {
  if (currentStat.value !== 1) {
    currentStat.value--;
  } else {
    currentStat.value = 4;
  }
}
</script>

<template>
  <div class="flex flex-row items-center justify-between gap-8">
    <div @click="decrementStat">
      <svg
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM22 7L1 7V9L22 9V7Z"
          fill="black"
        />
      </svg>
    </div>
    <div
      v-if="currentStat === 1"
      class="flex h-fit w-full items-center justify-around rounded-2xl p-4 shadow-sm shadow-neutral-400 lg:w-5/12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-3 h-8 w-8 lg:h-10 lg:w-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div class="flex flex-col font-semibold lg:text-xl">
        <span>Time</span>
        <span class="text-xl lg:text-2xl">
          {{ stats.total_duration.replace("00:", "") }}
        </span>
      </div>
    </div>
    <div
      v-if="currentStat === 2"
      class="flex h-fit w-full items-center justify-around rounded-2xl p-4 shadow-sm shadow-neutral-400 lg:w-5/12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-3 h-8 w-8 lg:h-10 lg:w-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
        />
      </svg>

      <div class="flex shrink-0 flex-col font-semibold lg:text-xl">
        <span>Distance</span>
        <span class="text-xl lg:text-2xl"> {{ stats.total_distance }} km </span>
      </div>
    </div>
    <div
      v-if="currentStat === 3"
      class="flex h-fit w-full items-center justify-around rounded-2xl p-4 shadow-sm shadow-neutral-400 lg:w-5/12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-3 h-8 w-8 lg:h-10 lg:w-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
        />
      </svg>

      <div class="flex flex-col font-semibold lg:text-xl">
        <span>Calories</span>
        <span class="text-xl lg:text-2xl"> {{ stats.total_calories }} </span>
      </div>
    </div>
    <div
      v-if="currentStat === 4"
      class="flex h-fit w-full items-center justify-around rounded-2xl p-4 shadow-sm shadow-neutral-400 lg:w-5/12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-3 h-8 w-8 lg:h-10 lg:w-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <div class="flex flex-col font-semibold lg:text-xl">
        <span>Heartrate</span>
        <span class="text-xl lg:text-2xl" v-if="stats.avg_hf">
          {{ stats.avg_hf }}</span
        >
        <span class="text-xl lg:text-2xl" v-else>/</span>
      </div>
    </div>
    <div @click="incrementStat">
      <svg
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.29289L15.3431 0.928932C14.9526 0.538408 14.3195 0.538408 13.9289 0.928932C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM0 9H21V7H0L0 9Z"
          fill="black"
        />
      </svg>
    </div>
  </div>
</template>
