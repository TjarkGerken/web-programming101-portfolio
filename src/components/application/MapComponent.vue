<script setup>
import { nextTick, onMounted, ref } from "vue";
import { LongLatListForMapUsage } from "@/api/gpxConversion";
import { LineString } from "ol/geom";

const props = defineProps({
  activity: Object,
});
const projection = ref("EPSG:4326");
const zoom = ref(null);
const rotation = ref(0);
const strokeWidth = ref(3);
const strokeColor = ref("black");
const center = ref([8.5344, 49.4738]);
const viewRef = ref(null);
function updateMap() {
  if (props.activity.gpx) {
    const coordinates = LongLatListForMapUsage(props.activity.gpx);
    const lineString = new LineString(coordinates);
    const extent = lineString.getExtent();
    viewRef.value.fit(extent, { minResolution: 0.0001 });
  }
}

onMounted(() => {
  nextTick(() => {
    updateMap();
  });
});
</script>

<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    :controls="[]"
    :interactions="[]"
    style="height: 100%; width: 100%"
  >
    <ol-view
      ref="viewRef"
      minResolution="0.00001"
      :constrainResolution="true"
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
            :coordinates="LongLatListForMapUsage(props.activity.gpx)"
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
</template>

<style scoped></style>
