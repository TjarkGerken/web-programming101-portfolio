<script setup>
import { googleSignIn } from "@/api/auth";
const props = defineProps({
  text: {
    type: String,
    default: () => "",
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
});

/**
 * Emit different events for the google sign in button.
 * This allows the parent component to set the appropriate state of the "disabled" variable. While the request is signed the variable is set to true to avoid further requests.
 * @type {EmitFn<(string)[]>}
 */

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
      });
  }
}
</script>

<template>
  <button
    :disabled="props.disabled"
    class="flex w-full items-center justify-around rounded-2xl border border-gray-300 border-opacity-30 px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.1)] disabled:bg-gray-400"
    @click="signIn"
  >
    <img src="@/assets/GoogleLogo.svg" class="h-6" alt="Google Logo" />
    <span class="px-2 text-sm font-semibold">
      {{ props.text }}
    </span>
  </button>
</template>
