<script setup>
import {
  activityEndTime,
  determineName,
  formatDurationMinutes,
  formatTime,
} from "@/api/utils";
import MapComponent from "@/components/application/MapComponent.vue";
const props = defineProps({
  activity: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <router-link
    :to="'activity/' + String(props.activity.id)"
    class="xl:flex xl:justify-center"
  >
    <div
      class="h-fit w-full rounded-lg border border-gray-300 border-opacity-30 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)]"
    >
      <div v-if="props.activity.gpx" class="h-40 w-full">
        <MapComponent :activity="props.activity" />
      </div>
      <div v-if="!props.activity.gpx" class="relative h-full">
        <img
          src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="absolute left-0 top-0 h-full w-full rounded-t-2xl object-cover"
        />
      </div>
      <div class="h-fit w-full rounded-b-2xl bg-white px-2 pt-3">
        <div class="flex flex-col xl:flex-row">
          <div class="flex flex-col lg:w-1/5">
            <div class="text-md font-bold lg:w-1/2 lg:text-lg">
              {{
                determineName(
                  props.activity["start-time"],
                  props.activity.sport,
                  props.activity["detailed-sport-info"],
                )
              }}
            </div>
            <div class="lg:text-md text-sm font-medium">
              {{ formatTime(props.activity["start-time"]) }} -
              {{
                activityEndTime(
                  props.activity.duration,
                  props.activity["start-time"],
                )
              }}
            </div>

            <span
              v-if="props.activity.location"
              class="text-md font-bold lg:text-lg"
              >{{ props.activity.location }}</span
            >
          </div>

          <hr class="my-2 lg:hidden" />

          <div class="flex flex-auto items-center">
            <div class="flex-1 xl:flex">
              <div
                v-if="props.activity.distance"
                class="flex flex-col xl:flex-1 xl:text-center"
              >
                <span class="font-semibold">Distance</span>
                <span class="lg:text-md text-sm font-medium"
                  >{{ props.activity.distance / 1000 }} km
                </span>
              </div>
              <div
                v-if="props.activity.duration"
                class="flex flex-col xl:flex-1 xl:text-center"
              >
                <span class="font-semibold">Time</span>
                <span class="lg:text-md text-sm font-medium">
                  {{ formatDurationMinutes(props.activity.duration) }} min
                </span>
              </div>
              <div
                v-if="
                  props.activity['heart-rate'].average && !props.activity.fit
                "
                class="flex flex-col xl:flex-1 xl:text-center"
              >
                <div v-if="!props.activity.sessionMesgs[0].avgSpeed">
                  <span class="font-semibold">Avg. Heartrate</span>
                  <span class="lg:text-md text-sm font-medium">
                    {{ props.activity["heart-rate"].average }} bpm
                  </span>
                </div>
              </div>
            </div>
            <div class="flex-1 xl:flex">
              <div
                v-if="props.activity.calories"
                class="flex flex-col xl:flex-1 xl:text-center"
              >
                <span class="font-semibold">Calories</span>
                <span class="lg:text-md text-sm font-medium">
                  {{ props.activity.calories }} kcal
                </span>
              </div>
              <div
                v-if="props.activity.fit"
                class="flex flex-col xl:flex-1 xl:text-center"
              >
                <div
                  v-if="props.activity.fit.sessionMesgs[0].avgSpeed"
                  class="flex flex-col"
                >
                  <span class="font-semibold">Speed</span>
                  <span class="xl:text-md text-sm font-medium">
                    {{ props.activity.fit.sessionMesgs[0].avgSpeed }} km/h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
