<script setup>
import Navbar from "@/components/utils/Navbar.vue";
</script>

<template>
  <Navbar></Navbar>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full">
    <body class="h-full">
    ```
  -->
  <main
    class="flex h-full place-items-center items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p class="text-2xl font-semibold text-accent-yellow">404</p>
      <h1
        class="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl"
      >
        Page not found
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="rounded-md bg-accent-yellow px-12 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-yellow-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
          >Go back home</router-link
        >
      </div>
    </div>
  </main>
</template>

<style scoped></style>
