<script setup>
import {
  activityEndTime,
  determineName,
  formatDuration,
  formatTime,
} from "@/api/utils";
import MapComponent from "@/components/application/MapComponent.vue";
const props = defineProps({
  activity: Object,
});
</script>

<template>
  <div class="mx-auto w-4/6">
    <div>
      <div class="h-48 w-full rounded-t-2xl" v-if="props.activity.gpx">
        <MapComponent :activity="props.activity" />
      </div>
      <img
        src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        class="h-48 w-full rounded-t-2xl object-cover"
        v-if="!props.activity.gpx"
      />
    </div>
    <div class="my-4 mt-0 h-fit w-full rounded-b-2xl bg-white px-4 py-2">
      <div class="flex space-x-4">
        <div class="flex w-1/3 flex-col">
          {{
            determineName(
              props.activity["start-time"],
              props.activity.sport,
              props.activity["detailed-sport-info"],
            )
          }}
          <br />

          {{ formatTime(props.activity["start-time"]) }} -
          {{
            activityEndTime(
              props.activity.duration,
              props.activity["start-time"],
            )
          }}
          <br />
          <span v-if="props.activity.location">{{
            props.activity.location
          }}</span>
        </div>
        <div class="flex w-full justify-around">
          <span v-if="props.activity.distance"
            >{{ props.activity.distance / 1000 }} km
          </span>
          <span v-if="props.activity.duration">{{
            formatDuration(props.activity.duration)
          }}</span>
          <span v-if="props.activity['heart-rate'].average"
            >{{ props.activity["heart-rate"].average }} bpm</span
          ><span v-if="props.activity.calories"
            >{{ props.activity.calories }} kcal</span
          >
          <span v-if="props.activity.fit">
            <span v-if="props.activity.fit.sessionMesgs[0].avgSpeed"
              >{{ props.activity.fit.sessionMesgs[0].avgSpeed }} km/h</span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
