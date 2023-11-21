<script setup>
import {
  activityEndTime,
  formatDate,
  formatDuration,
  formatTime,
} from "@/api/utils";
import MapComponent from "@/components/MapComponent.vue";

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
      {{ props.activity["detailed-sport-info"] }} -
      {{ formatDate(props.activity["start-time"]) }} <br />
      {{ formatTime(props.activity["start-time"]) }} -
      {{
        activityEndTime(props.activity.duration, props.activity["start-time"])
      }}
      <br />
      {{ props.activity.distance / 1000 }} km <br />
      {{ formatDuration(props.activity.duration) }}
    </div>
  </div>
</template>
