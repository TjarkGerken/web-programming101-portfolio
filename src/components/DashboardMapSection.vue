<script setup>
import MapComponent from "@/components/MapComponent.vue";
</script>

<template>
  <div
    class="flex w-full flex-col justify-start rounded-3xl bg-white p-8 shadow-lg shadow-neutral-300 lg:h-[55%]"
  >
    <div class="h-full"></div>
    <div
      class="flex h-full flex-col items-center justify-between lg:h-1/2 lg:flex-row"
    >
      <div
        class="flex w-full flex-row items-center justify-between text-center font-bold lg:flex-col"
      >
        <h4 class="text-lg">Total Time</h4>
        <h3 class="text-lg lg:text-3xl">56 min.</h3>
      </div>
      <div
        class="flex w-full flex-row items-center justify-between text-center font-bold lg:flex-col"
      >
        <h4 class="text-lg">Total Distance</h4>
        <h3 class="text-lg lg:text-3xl">24.35km</h3>
      </div>
      <div
        class="flex w-full flex-row items-center justify-between text-center font-bold lg:flex-col"
      >
        <h4 class="text-lg">Pace (min/km)</h4>
        <h3 class="text-lg lg:text-3xl">05:48</h3>
      </div>
      <div
        class="flex w-full flex-row items-center justify-between text-center font-bold lg:flex-col"
      >
        <h4 class="text-lg">Calories Burned</h4>
        <h3 class="text-lg lg:text-3xl">1543 kCal</h3>
      </div>
    </div>
  </div>
</template>
