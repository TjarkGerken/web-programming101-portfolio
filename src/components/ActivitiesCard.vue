<script setup>
import { ref } from "vue";

const center = ref([116.54875, 40.45064]);
const projection = ref("EPSG:4326");
const zoom = ref(17);
const rotation = ref(0);
const strokeWidth = ref(3);
const strokeColor = ref("black");
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
      <ol-map
        :loadTilesWhileAnimating="true"
        :loadTilesWhileInteracting="true"
        :controls="[]"
        :interactions="[]"
        style="height: 400px"
      >
        <ol-view
          ref="view"
          :center="center"
          :rotation="rotation"
          :zoom="zoom"
          :projection="projection"
        />

        <ol-tile-layer>
          <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
          <ol-source-vector>
            <ol-feature>
              <ol-geom-line-string
                :coordinates="[
                  [116.544921, 40.451633],
                  [116.545264, 40.451649],
                  [116.545865, 40.451698],
                  [116.546144, 40.451551],
                  [116.546337, 40.451274],
                  [116.546788, 40.451143],
                  [116.547324, 40.451078],
                  [116.547539, 40.450996],
                  [116.547839, 40.450719],
                  [116.54844, 40.450506],
                  [116.548933, 40.450604],
                  [116.549448, 40.450604],
                  [116.550242, 40.450376],
                  [116.550865, 40.450163],
                  [116.551702, 40.449935],
                  [116.552581, 40.449576],
                ]"
              ></ol-geom-line-string>
              <ol-style>
                <ol-style-stroke
                  :color="strokeColor"
                  :width="strokeWidth"
                ></ol-style-stroke>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </ol-map>
      <!-- TODO: https://vue3openlayers.netlify.app/componentsguide/styles/stroke/ -->
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
