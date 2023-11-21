<script setup>
// Define the props
import { DateTime, Duration } from "luxon";

const props = defineProps({
  activity: Object,
});

function formatDuration(isoDuration) {
  const duration = Duration.fromISO(isoDuration);
  return duration.toFormat("hh:mm:ss");
}

function formatDate(isoDate) {
  const date = DateTime.fromISO(isoDate);
  return date.toFormat("dd.MM.yyyy");
}
function formatTime(isoDate) {
  const date = DateTime.fromISO(isoDate);
  return date.toFormat("HH:mm");
}

function activityEndTime(isoDuration, IsoDate) {
  const duration = Duration.fromISO(isoDuration);
  const date = DateTime.fromISO(IsoDate);
  return date.plus(duration).toFormat("HH:mm");
}
</script>

<template>
  <div class="mx-auto w-4/6">
    <div>
      <img
        src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        class="h-48 w-full rounded-t-2xl object-cover"
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
      {{ props.activity.distance }} <br />
      {{ formatDuration(props.activity.duration) }}
    </div>
  </div>
</template>

<style scoped></style>
