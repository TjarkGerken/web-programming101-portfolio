<script setup>
import { googleSignIn } from "@/api/auth";
const props = defineProps({ text: String });
</script>

<template>
  <button @click="googleSignIn">{{ text }}</button>
</template>

<style scoped></style>
