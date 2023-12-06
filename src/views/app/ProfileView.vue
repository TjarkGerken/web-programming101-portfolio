<script setup>
import PolarConnect from "@/components/application/PolarConnect.vue";
import { onMounted, ref } from "vue";
import { getUser } from "@/api/user";
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import ProfileList from "@/components/application/ProfileList.vue";

const user = ref({});
const polar_status = ref(false);
const is_editing = ref(false);

onMounted(async () => {
  await getUser().then((res) => {
    user.value = res;
    polar_status.value = !!user.value;
  });
});

</script>

<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="px-8 pt-10 pb-6 xl:ml-36 xl:mt-10 xl:pt-0 xl:mr-8">
    <ProfileList :user="user"  :is_editing="is_editing"/>
  </div>
  <PolarConnect class="px-4 pb-16 xl:ml-32 xl:px-8" :polar_status="polar_status" />
</template>
