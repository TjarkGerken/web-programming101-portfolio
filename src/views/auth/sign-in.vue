<template>
  <!-- TODO: if user is logged in, redirect to dashboard -->

  <div class="flex h-full w-full flex-col md:flex-row">
    <div
      class="flex w-full flex-1 flex-col justify-center px-6 py-12 md:min-h-full md:w-1/3 lg:px-8"
    >
      <button
        class="flex items-center justify-center gap-2 place-self-start self-start rounded-2xl bg-accent-yellow px-4 py-2 text-sm font-semibold text-white hover:bg-accent-yellow-light"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <router-link to="/">Back</router-link>
      </button>
      <div class="flex flex-col sm:mx-auto sm:w-full sm:max-w-sm">
        <router-link to="/">
          <img
            class="mx-auto h-20 w-auto"
            src="@/assets/logo.png"
            alt="Your Company"
          />
        </router-link>
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
        <router-link
          to="/auth/register"
          class="text-center text-sm font-semibold text-accent-yellow hover:text-accent-yellow-light"
          >Need an account? Register here</router-link
        >
      </div>
      <form class="space-y-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              v-model="email"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-yellow sm:text-sm sm:leading-6"
            />
          </div>
          <p class="text-red-500">{{ formErrors.email }}</p>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-yellow sm:text-sm sm:leading-6"
            />
            <p class="text-red-500">{{ formErrors.password }}</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            @click.prevent="submitForm"
            class="flex w-full justify-center rounded-md bg-accent-yellow px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-yellow-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
          >
            Sign in
          </button>
        </div>
      </form>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <GoogleSignInButton text="Login with Google" />
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
import { MailPasswordSignIn } from "@/api/auth";
import { ref } from "vue";
import GoogleSignInButton from "@/components/buttons/GoogleSignInButton.vue";

let email = ref("");
let password = ref("");
let formErrors = ref({}); // Add this line

const validateForm = () => {
  let errors = {};

  if (!email.value) {
    errors.email = "Email is required";
  }

  if (!password.value) {
    errors.password = "Password is required";
  }

  formErrors.value = errors;

  return Object.keys(errors).length === 0;
};

const submitForm = async () => {
  if (validateForm()) {
    await MailPasswordSignIn(email.value, password.value);
  }
};
</script>
