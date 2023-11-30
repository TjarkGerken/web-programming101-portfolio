<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="lg:ml-28">
    <div class="mx-5 mt-5">
      <ProfileList class="shadow-lg shadow-neutral-700" :user="user" />
      <div class="flex w-full justify-center lg:justify-start">
        <PolarConnect class="m-5 p-5" :polar_status="polar_status" />
      </div>
    </div>
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
    polar_status.value = !!user.value;
  });
});
</script>
