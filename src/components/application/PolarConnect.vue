<script setup>
import { deleteUser } from "@/api/polarconnection";

const props = defineProps(["polar_status"]);
</script>

<template>
  <div
    class="flex h-fit w-max rounded-3xl bg-white shadow-lg shadow-neutral-400"
  >
    <img src="@/assets/PolarLogo.png" alt="" class="w-1/5" />
    <div class="">
      <div class="flex h-full flex-col justify-center gap-3">
        <div class="text-2xl">
          <p v-if="props.polar_status">Connected to Polar</p>
          <p v-if="!props.polar_status">Not connected to Polar</p>
        </div>
        <div v-if="!props.polar_status">
          <a
            class="rounded-2xl border border-neutral-900 px-4 py-1 text-lg"
            href="https://flow.polar.com/oauth2/authorization?response_type=code&client_id=2641d2f7-caaa-4e19-8da7-3985f455266b"
          >
            Connect to Polar
          </a>
        </div>
        <div v-if="props.polar_status">
          <button
            class="rounded-2xl border border-neutral-900 px-4 py-1 text-lg"
            @click="deleteUser"
          >
            Unlink account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
