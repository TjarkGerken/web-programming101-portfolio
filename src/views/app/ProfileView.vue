<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="lg:ml-28">
    <ProfileList :user="user" />
    <p>{{ user }}</p>
    <PolarConnect :polar_status="polar_status" />
  </div>
</template>
<script setup>
import PolarConnect from "@/components/application/PolarConnect.vue";
import { onMounted, ref } from "vue";
import { getUser } from "@/api/user";
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import ProfileList from "@/components/application/ProfileList.vue";

const user = ref({});
const polar_status = ref(false);

onMounted(async () => {
  await getUser().then((res) => {
    user.value = res;
    polar_status.value = true;
  });
});
</script>
