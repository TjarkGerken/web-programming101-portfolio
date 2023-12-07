<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="h-screen overflow-auto">
    <div
      v-if="activity !== {} && !isLoading && activity.gpx"
      class="min-h-96 h-80 w-full"
    >
      <InteractiveMapComponent :activity="activity" />
    </div>
    <div class="h-full w-screen px-4 md:px-8 lg:ml-32 lg:w-[calc(100%-128px)]">
      <div v-if="activity !== {} && !isLoading">
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
          <div class="text-xl font-semibold"></div>
        </div>
        <div class="mt-5 flex flex-col gap-4 md:flex-row md:gap-8">
          <div class="w-full md:w-1/2">
            <h1 class="text-xl md:text-2xl">Workout Info</h1>
            <div class="mt-6 flex flex-col gap-2">
              <div class="flex flex-row justify-between">
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
              <div class="flex flex-row justify-between">
                <div class="md:text-lg">Avg. Speed</div>
                <div class="font-semibold md:text-lg">
                  {{ activity.fit.sessionMesgs[0].avgSpeed }} km/h
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="activity.fit['lapMesgs']"
            class="w-full overflow-x-auto px-4 py-2 drop-shadow-lg md:w-1/2"
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
                    {{ Math.round(lap.totalDistance) / 100 }} km
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import { getExerciseByID } from "@/api/getPolarActivities";
import InteractiveMapComponent from "@/components/application/InteractiveMapComponent.vue";
import {
  activityEndTime,
  determineName,
  formatDurationMinutes,
  formatTime,
} from "@/api/utils";
import { Duration } from "luxon";

const route = useRoute();
const id = ref("");
const activity = ref({});
const isLoading = ref(true);

function secondsToMinutes(timerSeconds) {
  // function that transforms the seconds to a human readable output with the luxon package
  const time = Duration.fromObject({ seconds: timerSeconds });
  return time.toFormat("mm:ss");
}

onMounted(() => {
  id.value = route.params.id;
  getExerciseByID(id.value).then((res) => {
    activity.value = res;
    isLoading.value = false;
  });
});
</script>
