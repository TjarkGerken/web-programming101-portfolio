<template>
  <div class="">
    <img src="/src/assets/Account-amico.png" alt="" class="w-[500px]">
    <h3 class="text-2xl font-bold text-gray-900 mt-4 xl:text-3xl xl:mt-16">
      Your Information
    </h3>
  </div>
  <div
    class="mt-4"
  >
    <dl class="divide-y divide-gray-100">
      <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-md font-semibold leading-6 text-gray-900">Full name</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {{ props.user["first-name"] }} {{ " " }}
          {{ props.user["last-name"] }}
        </dd>
      </div>
      <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-md font-semibold leading-6 text-gray-900">Birthdate</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {{ props.user["birthdate"] }}
        </dd>
      </div>
      <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-md font-semibold leading-6 text-gray-900">
          Email address
        </dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {{ store.state.user.data.email }}
        </dd>
      </div>
      <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-md font-semibold leading-6 text-gray-900">Gender</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {{ props.user["gender"]}}
        </dd>
      </div>
      <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-md font-semibold leading-6 text-gray-900">Weight</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {{ props.user["weight"] }} kg
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import store from "../../store";

let props = defineProps({ user: Object });
</script>
