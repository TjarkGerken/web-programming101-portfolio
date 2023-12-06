<script setup>
import { deleteUser } from "@/api/polarconnection";

const props = defineProps(["polar_status"]);
</script>

<template>
  <div class="">
    <div class="flex">
      <img
        src="@/assets/PolarLogo.png"
        alt=""
        class="w-3/12 xl:h-[100px] xl:w-[100px]"
      />
      <div class="">
        <div class="flex h-full flex-col justify-center gap-2">
          <div class="text-sm font-medium">
            <p v-if="props.polar_status">Connected to Polar</p>
            <p v-if="!props.polar_status">Not connected to Polar</p>
          </div>
          <div v-if="!props.polar_status">
            <a
              class="rounded-md border border-gray-300 border-opacity-30 px-3.5 py-2.5 text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)]"
              href="https://flow.polar.com/oauth2/authorization?response_type=code&client_id=2641d2f7-caaa-4e19-8da7-3985f455266b"
            >
              Connect to Polar
            </a>
          </div>
          <div v-if="props.polar_status">
            <button
              class="rounded-md border border-gray-300 border-opacity-30 px-3.5 py-2.5 text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-shadow duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)]"
              @click="deleteUser()"
            >
              Unlink account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
