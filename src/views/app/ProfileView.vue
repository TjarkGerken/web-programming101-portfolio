<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="lg:ml-28">
    <h1>This is a profile page</h1>
    <p>{{ user }}</p>
    <PolarConnect :polar_status="polar_status" />
  </div>
</template>
<script setup>
import PolarConnect from "@/components/PolarConnect.vue";
import { onMounted, ref } from "vue";
import { getUser } from "@/api/user";
import ApplicationNavbar from "@/components/ApplicationNavbar.vue";

const user = ref({});
const polar_status = ref(false);

onMounted(async () => {
  await getUser().then((res) => {
    user.value = res;
    polar_status.value = true;
  });
});
</script>
