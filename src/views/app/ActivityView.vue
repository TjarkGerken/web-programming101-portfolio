<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div v-if="activity.gpx" class="h-96 w-full">
    <InteractiveMapComponent :activity="activity" />
  </div>
  <div
    class="h-full w-screen px-8 lg:ml-32 lg:h-screen lg:w-[calc(100%-128px)]"
  >
    <div v-if="activity !== {} && !isLoading">
      <div v-if="activity.gpx" class="h-96 w-full">
        <InteractiveMapComponent :activity="activity" />
      </div>
      <div class="mt-6 flex flex-col font-maven lg:w-1/4">
        <div class="flex gap-2 text-3xl font-semibold leading-none">
          <span>
            {{
              determineName(
                activity["start-time"],
                activity.sport,
                activity["detailed-sport-info"],
              )
            }}
          </span>
          -

          <span v-if="activity.location">{{ activity.location }}</span>
        </div>
        <div class="font-semibold tracking-tight">
          {{ new Date(activity["start-time"]).toLocaleDateString("de-DE") }}
          {{ formatTime(activity["start-time"]) }}
          -
          {{ activityEndTime(activity.duration, activity["start-time"]) }}
        </div>
        <div class="text-xl font-semibold"></div>
      </div>
      {{ activity }}
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
  formatDate,
  formatTime,
} from "@/api/utils";

const route = useRoute();
const id = ref("");
const activity = ref({});
const isLoading = ref(true);
onMounted(() => {
  id.value = route.params.id;
  getExerciseByID(id.value).then((res) => {
    activity.value = res;
    isLoading.value = false;
  });
});
</script>