<script setup>
import { googleSignIn } from "@/api/auth";
const props = defineProps({ text: String });
</script>

<template>
  <div
    class="flex w-full items-center justify-around rounded-2xl border border-gray-300 border-opacity-30 px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
  >
    <img src="@/assets/GoogleLogo.svg" class="h-6" alt="Google Logo" />
    <button @click="googleSignIn" class="px-2 text-sm font-semibold">
      {{ props.text }}
    </button>
  </div>
</template>
