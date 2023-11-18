<template>
  <Navbar></Navbar>
  <div class="home">
    <h1>This is a profile page</h1>
    <p>{{ user }}</p>
    <PolarConnect :polar_status="polar_status" />
  </div>
</template>
<script setup>
import Navbar from "@/components/navbar.vue";
import PolarConnect from "@/components/PolarConnect.vue";
import { onMounted, ref } from "vue";
import { getUser } from "@/api/user";

const user = ref({});
const polar_status = ref(false);

onMounted(async () => {
  const doc = await getUser().then((res) => {
    user.value = res;
    polar_status.value = true;
  });
});
</script>
