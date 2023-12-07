<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="h-screen overflow-auto">
    <div
      v-if="activity !== {} && !isLoading && activity.gpx"
      class="min-h-96 h-80 w-full"
    >
      <InteractiveMapComponent :activity="activity" />
    </div>
    <div
      class="h-full w-screen px-2 sm:px-4 md:px-8 lg:ml-32 lg:w-[calc(100%-128px)]"
    >
      <div v-if="activity !== {} && !isLoading">
        <div class="flex items-center justify-between">
          <div class="mt-6 flex flex-col lg:w-1/4">
            <div
              class="flex w-full flex-col gap-2 text-2xl font-semibold leading-none md:flex-row md:text-3xl"
            >
              <span class="w-full md:whitespace-nowrap">
                {{
                  determineName(
                    activity["start-time"],
                    activity.sport,
                    activity["detailed-sport-info"],
                  )
                }}
              </span>
              <span class="hidden md:block">-</span>
              <span v-if="activity.location">{{ activity.location }}</span>
            </div>
            <div class="mt-1 text-lg font-semibold tracking-tight md:text-xl">
              {{ new Date(activity["start-time"]).toLocaleDateString("de-DE") }}
              {{ formatTime(activity["start-time"]) }}
              -
              {{ activityEndTime(activity.duration, activity["start-time"]) }}
            </div>
          </div>
          <div>
            <button @click="toggleDeleteModal()">
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-5 flex flex-col gap-4 md:flex-row md:gap-8">
          <div class="h-fit w-full md:w-1/2">
            <h1 class="text-xl md:text-2xl">Workout Info</h1>
            <div class="mt-6 flex flex-col gap-5">
              <div
                class="flex flex-row items-center gap-4 rounded-lg bg-white px-4 py-2 drop-shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-10 w-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                  />
                </svg>

                <div class="flex w-full flex-col px-8">
                  <div class="flex w-full flex-row justify-between">
                    <div class="md:text-lg">Duration</div>
                    <div class="font-semibold md:text-lg">
                      {{ formatDurationMinutes(activity.duration) }} min
                    </div>
                  </div>
                  <div class="flex flex-row justify-between">
                    <div class="md:text-lg">Distance</div>
                    <div class="font-semibold md:text-lg">
                      {{ activity.distance / 1000 }} km
                    </div>
                  </div>
                  <div class="flex flex-row justify-between">
                    <div class="md:text-lg">Avg. Speed</div>
                    <div class="font-semibold md:text-lg">
                      {{ activity.fit.sessionMesgs[0].avgSpeed }} km/h
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-row items-center gap-4 rounded-lg bg-white px-4 py-2 drop-shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-10 w-10"
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

                <div class="flex w-full flex-col px-8">
                  <div class="flex flex-row justify-between">
                    <div class="md:text-lg">Calories</div>
                    <div class="font-semibold md:text-lg">
                      {{ activity.calories }} kcal
                    </div>
                  </div>
                  <div class="flex flex-row justify-between">
                    <div class="md:text-lg">Avg. Heart Rate</div>
                    <div class="font-semibold md:text-lg">
                      {{ activity["heart-rate"].average }} bpm
                    </div>
                  </div>
                  <div class="flex flex-row justify-between">
                    <div class="md:text-lg">Max Heart Rate</div>
                    <div class="font-semibold md:text-lg">
                      {{ activity["heart-rate"].maximum }} bpm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="activity.fit['lapMesgs']"
            class="w-full overflow-x-auto py-2 drop-shadow-lg md:w-1/2 md:py-0"
          >
            <h1 class="text-xl md:text-2xl">Lap Times</h1>
            <table class="mt-6 min-w-full divide-y divide-gray-200">
              <thead class="bg-accent-yellow text-white">
                <tr>
                  <th
                    class="px-1 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-3 md:px-6"
                  >
                    Lap
                  </th>
                  <th
                    class="px-1 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-3 md:px-6"
                  >
                    Total Time
                  </th>
                  <th
                    class="hidden px-3 py-3 text-left text-xs font-medium uppercase tracking-wider md:block md:px-6"
                  >
                    Total Calories
                  </th>
                  <th
                    class="px-1 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-3 md:px-6"
                  >
                    Average Heart Rate
                  </th>
                  <th
                    class="px-1 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-3 md:px-6"
                  >
                    Total Distance
                  </th>
                  <th
                    class="px-1 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-3 md:px-6"
                  >
                    Average Speed
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  class="hover:bg-gray-100"
                  v-for="(lap, index) in activity.fit['lapMesgs']"
                  :key="index"
                >
                  <td
                    class="whitespace-nowrap px-1 py-4 text-sm text-gray-500 sm:px-3 md:px-6"
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    class="whitespace-nowrap px-1 py-4 text-sm text-gray-500 sm:px-3 md:px-6"
                  >
                    {{ secondsToMinutes(lap.totalTimerTime) }}
                  </td>
                  <td
                    class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 md:block md:px-6"
                  >
                    {{ lap.totalCalories }} kcal
                  </td>
                  <td
                    class="whitespace-nowrap px-1 py-4 text-sm text-gray-500 sm:px-3 md:px-6"
                  >
                    {{ lap.avgHeartRate }} bpm
                  </td>
                  <td
                    class="whitespace-nowrap px-1 py-4 text-sm text-gray-500 sm:px-3 md:px-6"
                  >
                    {{ Math.round(lap.totalDistance) / 1000 }} km
                  </td>
                  <td
                    class="whitespace-nowrap px-1 py-4 text-sm text-gray-500 sm:px-3 md:px-6"
                  >
                    {{
                      Math.round(100 * ((lap.avgSpeed * 1000) / 277.8)) / 100
                    }}
                    km/h
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
    v-if="deleteModalOpen"
    @click="toggleDeleteModal()"
  ></div>
  <div
    v-if="deleteModalOpen"
    class="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center px-5"
  >
    <div class="flex flex-col rounded-lg bg-white p-4 md:px-16 md:py-8">
      <span class="text-center text-2xl font-semibold">Delete Activity</span>
      <span class="text-center">Are you sure you want to delete this?</span>
      <div class="mt-5 flex justify-around">
        <button
          class="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white"
          @click="toggleDeleteModal()"
        >
          Dismiss
        </button>
        <button
          class="rounded-lg bg-red-800 px-4 py-2 text-white"
          @click="deleteExercise()"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import { deleteExerciseByID, getExerciseByID } from "@/api/getPolarActivities";
import InteractiveMapComponent from "@/components/application/InteractiveMapComponent.vue";
import {
  activityEndTime,
  determineName,
  formatDurationMinutes,
  formatTime,
} from "@/api/utils";
import { Duration } from "luxon";
import router from "@/router";

const route = useRoute();
const id = ref("");
const activity = ref({});
const isLoading = ref(true);
const deleteModalOpen = ref(false);
function secondsToMinutes(timerSeconds) {
  // function that transforms the seconds to a human-readable output with the luxon package
  const time = Duration.fromObject({ seconds: timerSeconds });
  return time.toFormat("mm:ss");
}

function toggleDeleteModal() {
  // function that toggles the delete modal
  deleteModalOpen.value = !deleteModalOpen.value;
}

function deleteExercise() {
  // function that deletes the exercise
  deleteExerciseByID(id.value);
  router.push("/activities");
}

onMounted(() => {
  id.value = route.params.id;
  getExerciseByID(id.value).then((res) => {
    activity.value = res;
    isLoading.value = false;
  });
});
</script>
