<script setup>
import { ref } from "vue";

const props = defineProps({
  stats: Object,
});
const stats = props.stats;
const currentStat = ref(1);

/**
 *  Function to display the next stat.
 */
function incrementStat() {
  if (currentStat.value !== 4) {
    currentStat.value++;
  } else {
    currentStat.value = 1;
  }
}

/**
 * Function to display the previous stat.
 */
function decrementStat() {
  if (currentStat.value !== 1) {
    currentStat.value--;
  } else {
    currentStat.value = 4;
  }
}

/**
 * Function to check if the current stat should be displayed.
 * @param x Stat to check
 * @returns {boolean}  If the stat should be displayed
 */
function shouldRenderContent(x) {
  return currentStat.value === x;
}
</script>

<template>
  <div class="flex flex-row items-center justify-around gap-1">
    <div @click="decrementStat" class="md:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
        />
      </svg>
    </div>
    <div
      v-if="shouldRenderContent(1)"
      class="flex h-fit w-2/3 items-center justify-around rounded-md border border-gray-300 border-opacity-30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-9 w-2/5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div class="flex w-3/5 flex-col">
        <span class="font-medium">Time</span>
        <span class="text-xl font-bold">
          {{ stats.total_duration.replace("00:", "") }}
        </span>
      </div>
    </div>
    <div
      v-if="shouldRenderContent(2)"
      class="flex h-fit w-2/3 items-center justify-around rounded-md border border-gray-300 border-opacity-30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-9 w-2/5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
        />
      </svg>

      <div class="flex w-3/5 shrink-0 flex-col">
        <span class="font-medium">Distance</span>
        <span class="text-xl font-bold"> {{ stats.total_distance }} km </span>
      </div>
    </div>
    <div
      v-if="shouldRenderContent(3)"
      class="flex h-fit w-2/3 items-center justify-around rounded-md border border-gray-300 border-opacity-30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-9 w-2/5"
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

      <div class="flex w-3/5 flex-col">
        <span class="font-medium">Calories</span>
        <span class="text-xl font-bold"> {{ stats.total_calories }} </span>
      </div>
    </div>
    <div
      v-if="shouldRenderContent(4)"
      class="flex h-fit w-2/3 items-center justify-around rounded-md border border-gray-300 border-opacity-30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-9 w-2/5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <div class="flex w-3/5 flex-col">
        <span class="font-medium">Heartrate</span>
        <span v-if="stats.avg_hf" class="text-xl font-bold">
          {{ stats.avg_hf }}</span
        >
        <span v-else class="text-xl">/</span>
      </div>
    </div>
    <div class="hidden w-full flex-col gap-4 md:flex">
      <div class="flex flex-row gap-4">
        <div
          class="flex flex-1 items-center justify-around rounded-md border border-gray-300 border-opacity-30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-9 w-2/5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="flex w-3/5 flex-col">
            <span class="font-medium">Time</span>
            <span class="text-xl font-bold">
              {{ stats.total_duration.replace("00:", "") }}
            </span>
          </div>
        </div>
        <div
          class="flex flex-1 items-center justify-around rounded-md border border-gray-300 border-opacity-30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-9 w-2/5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
            />
          </svg>

          <div class="flex w-3/5 shrink-0 flex-col">
            <span class="font-medium">Distance</span>
            <span class="text-xl font-bold">
              {{ stats.total_distance }} km
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div
          class="flex flex-1 items-center justify-around rounded-md border border-gray-300 border-opacity-30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-9 w-2/5"
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

          <div class="flex w-3/5 flex-col">
            <span class="font-medium">Calories</span>
            <span class="text-xl font-bold"> {{ stats.total_calories }} </span>
          </div>
        </div>
        <div
          class="flex flex-1 items-center justify-around rounded-md border border-gray-300 border-opacity-30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-9 w-2/5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <div class="flex w-3/5 flex-col">
            <span class="font-medium">Heartrate</span>
            <span v-if="stats.avg_hf" class="text-xl font-bold">
              {{ stats.avg_hf }}</span
            >
            <span v-else class="text-xl">/</span>
          </div>
        </div>
      </div>
    </div>
    <div @click="incrementStat" class="md:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  </div>
</template>
