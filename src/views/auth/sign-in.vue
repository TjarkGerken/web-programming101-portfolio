<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!-- TODO: if user is logged in, redirect to dashboard -->
  <div class="flex h-full w-full flex-col md:flex-row">
    <div
      class="flex w-full flex-1 flex-col justify-center px-6 py-12 md:min-h-full md:w-1/3 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <button @click="googleSignIn">Login with Google</button>
      </div>
    </div>
    <div
      class="hidden h-full w-full bg-black md:block md:min-h-screen md:w-2/3"
    >
      <img
        class="h-full w-full object-cover bg-blend-darken"
        src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Gym pic"
      />
    </div>
  </div>
</template>
<script setup>
import { googleSignIn } from "@/api/auth";
</script>
