<script setup>
const props = defineProps({
  stats: Object,
});
const stats = props.stats;
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <div class="flex w-full justify-around py-2">
      <div
        class="flex h-fit w-48 items-center justify-around rounded-2xl p-4 shadow-lg shadow-neutral-400 lg:w-5/12"
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
        class="flex h-fit w-48 items-center justify-around rounded-2xl p-4 shadow-lg shadow-neutral-400 lg:w-5/12"
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
          <span class="text-xl lg:text-2xl">
            {{ stats.total_distance }} km
          </span>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-around py-2">
      <div
        class="flex h-fit w-48 items-center justify-around rounded-2xl p-4 shadow-lg shadow-neutral-400 lg:w-5/12"
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
        class="flex h-fit w-48 items-center justify-around rounded-2xl p-4 shadow-lg shadow-neutral-400 lg:w-5/12"
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
    </div>
  </div>
</template>
