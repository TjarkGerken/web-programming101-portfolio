<template>
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
          Register a new account
        </h2>
        <router-link
          to="/auth/login"
          class="text-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >Already have an Account? Login here</router-link
        >
      </div>
      <form class="space-y-6" action="#" method="POST">
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
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="mt-2">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
            </div>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="mt-2">
          <label
            for="confirm-password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Confirm Password</label
          >
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            v-model="confirmPassword"
            required=""
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <p class="text-red-500">{{ formErrors.confirmPassword }}</p>
        <div>
          <button
            type="submit"
            @click.prevent="submitForm"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <GoogleSignInButton text="Register with Google" />
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
import { MailPasswordRegister } from "@/api/auth";
import { ref } from "vue";
import GoogleSignInButton from "@/components/buttons/GoogleSignInButton.vue";

let email = ref("");
let password = ref("");
let formErrors = ref({}); // Add this line
let confirmPassword = ref(); // Add this line

const validateForm = () => {
  let errors = {};

  if (!email.value) {
    errors.email = "Email is required";
  }

  if (!password.value) {
    errors.password = "Password is required";
  }
  if (password.value.length < 6) {
    errors.password = "Password must be longer than 6 characters";
  }

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = "Passwords do not match";
  }

  formErrors.value = errors;

  return Object.keys(errors).length === 0;
};

const submitForm = async () => {
  if (validateForm()) {
    await MailPasswordRegister(email.value, password.value);
  }
};
</script>
