<script setup>
import {
  activityEndTime,
  determineName,
  formatDurationMinutes,
  formatTime,
} from "@/api/utils";
import MapComponent from "@/components/application/MapComponent.vue";
const props = defineProps({
  activity: Object,
});
</script>

<template>
  <router-link :to="'activity/' + String(props.activity.id)">

  <div
    class="h-fit w-full rounded-lg bg-white p-4 border border-gray-300 border-opacity-30 shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)]
            xl:w-2/3"
  >
      <div class="h-40 w-full" v-if="props.activity.gpx">
        <MapComponent :activity="props.activity" />
      </div>
      <div class="relative h-full" v-if="!props.activity.gpx">
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
          <div class="text-sm font-medium lg:text-md">
            {{ formatTime(props.activity["start-time"]) }} -
            {{
              activityEndTime(
                props.activity.duration,
                props.activity["start-time"],
              )
            }}
          </div>

          <span class="text-md font-bold lg:text-lg" v-if="props.activity.location">{{
            props.activity.location
          }}</span>

        </div>

        <hr class="my-2 lg:hidden" />

        <div
          class="flex flex-auto items-center"
        >
          <div class="flex-1 xl:flex">
            <div
              class="flex flex-col xl:flex-1 xl:text-center"
              v-if="props.activity.distance"
            >
              <span class="font-semibold">Distance</span>
              <span class="text-sm font-medium lg:text-md"
                >{{ props.activity.distance / 1000 }} km
              </span>
            </div>
            <div
              class="flex flex-col xl:flex-1 xl:text-center"
              v-if="props.activity.duration"
            >
              <span class="font-semibold">Time</span>
              <span class="text-sm font-medium lg:text-md">
                {{ formatDurationMinutes(props.activity.duration) }} min
              </span>
            </div>
            <div
              class="flex flex-col xl:flex-1 xl:text-center"
              v-if="props.activity['heart-rate'].average && !props.activity.fit"
            >
              <div v-if="!props.activity.sessionMesgs[0].avgSpeed">
                <span class="font-semibold">Avg. Heartrate</span>
                <span class="text-sm font-medium lg:text-md">
                  {{ props.activity["heart-rate"].average }} bpm
                </span>
              </div>
            </div>
          </div>
          <div class="flex-1 xl:flex">
            <div
              class="flex flex-col xl:flex-1 xl:text-center"
              v-if="props.activity.calories"
            >
              <span class="font-semibold">Calories</span>
              <span class="text-sm font-medium lg:text-md"> {{ props.activity.calories }} kcal </span>
            </div>
            <div
              class="flex flex-col xl:flex-1 xl:text-center"
              v-if="props.activity.fit"
            >
              <div
                class="flex flex-col  "
                v-if="props.activity.fit.sessionMesgs[0].avgSpeed"
              >
                <span class="font-semibold">Speed</span>
                <span class="text-sm font-medium xl:text-md">
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
