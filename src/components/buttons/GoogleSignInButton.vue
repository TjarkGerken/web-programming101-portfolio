<script setup>
import { googleSignIn } from "@/api/auth";
const props = defineProps({ text: String, disabled: Boolean });
const emit = defineEmits([
  "google-sign-start",
  "google-sign-end",
  "google-sign-error",
]);

function signIn() {
  if (!props.disabled) {
    emit("google-sign-start");
    googleSignIn()
      .then(() => {
        emit("google-sign-end");
      })
      .catch(() => {
        emit("google-sign-error");
        console.warn();
      });
  }
}
</script>

<template>
  <button
    @click="signIn"
    :disabled="props.disabled"
    class="flex w-full items-center justify-around rounded-2xl border border-gray-300 border-opacity-30 px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.1)] disabled:bg-gray-400"
  >
    <img src="@/assets/GoogleLogo.svg" class="h-6" alt="Google Logo" />
    <span class="px-2 text-sm font-semibold">
      {{ props.text }}
    </span>
  </button>
</template>
