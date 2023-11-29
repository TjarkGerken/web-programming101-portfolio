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
  <div
    class="h-fit w-full rounded-3xl bg-white p-4 shadow-lg shadow-neutral-400"
  >
    <div class="h-80 w-full rounded-t-2xl">
      <div class="h-full w-full" v-if="props.activity.gpx">
        <MapComponent :activity="props.activity" />
      </div>
      <div class="relative h-full">
        <img
          src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="absolute left-0 top-0 h-full w-full rounded-t-2xl object-cover"
          v-if="!props.activity.gpx"
        />
      </div>
    </div>
    <div class="h-fit w-full rounded-b-2xl bg-white px-2 pt-3">
      <div class="flex flex-col space-x-4 lg:flex-row">
        <div class="flex flex-col font-maven lg:w-1/4">
          <div class="text-xl font-semibold leading-none lg:w-1/2">
            {{
              determineName(
                props.activity["start-time"],
                props.activity.sport,
                props.activity["detailed-sport-info"],
              )
            }}
          </div>
          <div class="font-semibold tracking-tight">
            {{ formatTime(props.activity["start-time"]) }} -
            {{
              activityEndTime(
                props.activity.duration,
                props.activity["start-time"],
              )
            }}
          </div>
          <div class="text-xl font-semibold">
            <span v-if="props.activity.location">{{
              props.activity.location
            }}</span>
          </div>
        </div>
        <hr class="my-1 lg:hidden" />
        <div
          class="grid w-full grid-cols-2 justify-around font-maven font-semibold lg:flex lg:flex-row"
        >
          <div
            class="flex flex-col items-center justify-center"
            v-if="props.activity.distance"
          >
            <span class="">Distance</span>
            <span class="text-2xl"
              >{{ props.activity.distance / 1000 }} km
            </span>
          </div>
          <div
            class="flex flex-col items-center justify-center"
            v-if="props.activity.duration"
          >
            <span class="">Duration</span>
            <span class="text-2xl">
              {{ formatDurationMinutes(props.activity.duration) }} min
            </span>
          </div>
          <div
            class="flex flex-col items-center justify-center"
            v-if="props.activity['heart-rate'].average && !props.activity.fit"
          >
            <div v-if="!props.activity.sessionMesgs[0].avgSpeed">
              <span class="">Heartrate</span>
              <span class="text-2xl">
                {{ props.activity["heart-rate"].average }} bpm
              </span>
            </div>
          </div>
          <div
            class="flex flex-col items-center justify-center"
            v-if="props.activity.calories"
          >
            <span class="">Calories</span>
            <span class="text-2xl"> {{ props.activity.calories }} kcal </span>
          </div>
          <div
            class="flex flex-col items-center justify-center"
            v-if="props.activity.fit"
          >
            <div
              class="flex flex-col items-center justify-center"
              v-if="props.activity.fit.sessionMesgs[0].avgSpeed"
            >
              <span class="">Speed</span>
              <span class="text-2xl">
                {{ props.activity.fit.sessionMesgs[0].avgSpeed }} km/h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
