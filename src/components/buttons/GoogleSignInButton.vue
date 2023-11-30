<script setup>
import { googleSignIn } from "@/api/auth";
const props = defineProps({ text: String });
</script>

<template>
  <div
    class="flex items-center justify-around rounded-2xl border border-neutral-900 px-4 py-2 shadow-lg shadow-neutral-700"
  >
    <img src="@/assets/GoogleLogo.svg" class="h-6" alt="Google Logo" />
    <button @click="googleSignIn" class="px-2 text-sm font-semibold">
      {{ props.text }}
    </button>
  </div>
</template>
