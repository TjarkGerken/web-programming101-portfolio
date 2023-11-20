<script setup>
const props = defineProps(["polar_status"]);

// TODO: Add a function to unlink the Polar account
</script>

<template>
  <div v-if="!props.polar_status">
    <a
      href="https://flow.polar.com/oauth2/authorization?response_type=code&client_id=2641d2f7-caaa-4e19-8da7-3985f455266b"
      >Connect to Polar</a
    >
  </div>
  <div v-if="props.polar_status">
    <a
      href="https://flow.polar.com/oauth2/authorization?response_type=code&client_id=2641d2f7-caaa-4e19-8da7-3985f455266b"
      >Connect to Polar</a
    >
    <button @click="">Unlink account</button>
  </div>
</template>
