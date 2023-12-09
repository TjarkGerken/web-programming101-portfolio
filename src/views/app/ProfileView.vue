<script setup>
import PolarConnect from "@/components/application/PolarConnect.vue";
import { onMounted, ref } from "vue";
import { getUser } from "@/api/user";
import ApplicationNavbar from "@/components/utils/ApplicationNavbar.vue";
import ProfileList from "@/components/application/ProfileList.vue";

/**
 *  The user object
 * @type {Ref<UnwrapRef<{birthdate: string, gender: string, weight: string, "first-name": string, "last-name": string, height: string}>>}
 */
const user = ref({
  "first-name": "",
  "last-name": "",
  gender: "",
  weight: "",
  height: "",
  birthdate: "",
});
/**
 * If the user has connected his polar account
 * @type {Ref<UnwrapRef<boolean>>}
 */
const polar_status = ref(false);
/**
 * If the user is editing his profile
 * @type {Ref<UnwrapRef<boolean>>}
 */
const is_editing = ref(false);

// Check if the user is logged in and get the user object. Additionally, check if the user has connected his polar account.
onMounted(async () => {
  await getUser().then((res) => {
    if (res) {
      user.value = res;
      polar_status.value = !!user.value;
    } else {
      polar_status.value = false;
    }
  });
});
</script>

<template>
  <ApplicationNavbar></ApplicationNavbar>
  <div class="px-8 pb-6 pt-10 xl:ml-36 xl:mr-8 xl:mt-10 xl:pt-0">
    <ProfileList :user="user" :is_editing="is_editing" />
  </div>
  <PolarConnect
    class="px-4 pb-16 xl:ml-32 xl:px-8"
    :polarStatus="polar_status"
  />
</template>
