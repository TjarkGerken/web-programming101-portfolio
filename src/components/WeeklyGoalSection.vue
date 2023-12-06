<script setup>
import { getUser } from "@/api/user";
import { forEach } from "ol/geom/flat/segments";
import CreateGoal from "@/components/goals/CreateGoal.vue";

//TODO: Get User Goals and Format
let userGoals = [
  {
    name: "Run 5km",
    completed: true,
  },
  {
    name: "Run 5km",
    completed: false,
  },
  {
    name: "Run 5km",
    completed: false,
  },
];
</script>

<template>
  <div class="flex h-full flex-col justify-between gap-6 lg:w-1/3">
    <div
      class="flex h-full flex-col justify-evenly gap-2 rounded-3xl p-8 shadow-lg shadow-neutral-400"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold lg:text-2xl">Weekly Goals</h2>
        <h5 class="text-lg font-bold lg:text-2xl">2/5</h5>
      </div>
      <template v-for="goal in userGoals">
        <div
          :class="`flex flex-row items-center justify-start gap-4 rounded-xl border-4 border-solid p-2 ${
            goal.completed ? 'border-green-400' : 'border-neutral-400'
          }`"
        >
          <template v-if="goal.completed">
            <div class="">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.125 16.5938L14.4062 19.875L19.875 12.2188M28.625 15.5C28.625 17.2236 28.2855 18.9303 27.6259 20.5227C26.9663 22.1151 25.9995 23.562 24.7808 24.7808C23.562 25.9995 22.1151 26.9663 20.5227 27.6259C18.9303 28.2855 17.2236 28.625 15.5 28.625C13.7764 28.625 12.0697 28.2855 10.4773 27.6259C8.88488 26.9663 7.43799 25.9995 6.21922 24.7808C5.00045 23.562 4.03367 22.1151 3.37408 20.5227C2.71449 18.9303 2.375 17.2236 2.375 15.5C2.375 12.019 3.75781 8.68064 6.21922 6.21922C8.68064 3.75781 12.019 2.375 15.5 2.375C18.981 2.375 22.3194 3.75781 24.7808 6.21922C27.2422 8.68064 28.625 12.019 28.625 15.5Z"
                  stroke="#C1EBB0"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </template>
          <template v-else>
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35 17.5C35 27.165 27.165 35 17.5 35C7.83502 35 0 27.165 0 17.5C0 7.83502 7.83502 0 17.5 0C27.165 0 35 7.83502 35 17.5ZM1.80182 17.5C1.80182 26.1699 8.83013 33.1982 17.5 33.1982C26.1699 33.1982 33.1982 26.1699 33.1982 17.5C33.1982 8.83013 26.1699 1.80182 17.5 1.80182C8.83013 1.80182 1.80182 8.83013 1.80182 17.5Z"
                fill="#595959"
              />
            </svg>
          </template>
          <div class="flex flex-col">
            <h3 class="font-bold">{{ goal.name }}</h3>
          </div>
        </div>
      </template>
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
        <CreateGoal />
      </button>
    </div>
    <div
      class="flex h-1/3 flex-col justify-start rounded-3xl p-8 shadow-lg shadow-neutral-400"
    >
      <h2 class="font-bold lg:text-2xl">Achievements</h2>
      <div class="h-44"></div>
    </div>
  </div>
</template>
