<script setup>
import { nextTick, onMounted, ref } from "vue";
import { LongLatListForMapUsage } from "@/api/gpxConversion";
import { LineString } from "ol/geom";

const props = defineProps({
  activity: {
    type: Object,
    default: () => ({}),
  },
});

// Set the default values for the map.
const projection = ref("EPSG:4326");
const zoom = ref(null);
const rotation = ref(0);
const strokeWidth = ref(3);
const strokeColor = ref("#6F42C1");
const center = ref([8.5344, 49.4738]);
const viewRef = ref(null);

/**
 * Update the view of the map to fit the gpx file.
 */
function updateMap() {
  if (props.activity.gpx) {
    const coordinates = LongLatListForMapUsage(props.activity.gpx);
    const lineString = new LineString(coordinates);
    const extent = lineString.getExtent();
    viewRef.value.fit(extent, { minResolution: 0.00001 });
  }
}

onMounted(() => {
  // Wait for the next Tick to update the map. So its fully initialized.
  nextTick(() => {
    updateMap();
  });
});
</script>

<template>
  <ol-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    style="height: 100%; width: 100%"
  >
    <ol-view
      ref="viewRef"
      min-resolution="0.00001"
      :constrain-resolution="true"
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
