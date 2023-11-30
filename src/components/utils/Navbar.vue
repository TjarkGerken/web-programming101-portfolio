<template>
  <header class="bg-transparent shadow-[rgba(17,_17,_26,_0.1)_0px_0px_8px]">
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1 2xl:ml-48">
        <router-link to="" class="-m-1.5 flex items-center p-1.5">
          <img
            src="@/assets/logo.png"
            class="h-[25px] w-[25px] 2xl:h-[35px] 2xl:w-[35px]"
            alt="Company Logo"
          />

          <div class="text-md ml-2 font-bold 2xl:text-xl">Peak Pulse</div>
        </router-link>
      </div>

      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <PopoverGroup class="hidden lg:flex lg:gap-x-12 2xl:mr-44">
        <router-link
          to="/"
          class="text-xl font-semibold leading-6 text-gray-900"
          >Home</router-link
        >
        <router-link
          to="/about"
          class="text-xl font-semibold leading-6 text-gray-900"
          >About</router-link
        >
      </PopoverGroup>

      <div
        class="hidden lg:flex lg:flex-1 lg:justify-end"
        v-if="!isAuthenticated"
      >
        <router-link
          to="/auth/login"
          class="text-xl font-semibold leading-6 text-gray-900 2xl:mr-48"
          >Log in <span aria-hidden="true">&rarr;</span></router-link
        >
      </div>

      <div
        class="hidden lg:flex lg:flex-1 lg:justify-end"
        v-if="isAuthenticated"
      >
        <button
          @click="logout"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Logout
        </button>
      </div>

      <div
        class="hidden lg:flex lg:flex-1 lg:justify-end"
        v-if="isAuthenticated"
      >
        <router-link
          to="/dashboard"
          class="text-sm font-semibold leading-6 text-gray-900"
          >Dashboard <span aria-hidden="true">&rarr;</span></router-link
        >
      </div>
    </nav>
    <Dialog
      as="div"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-30" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <router-link to="#" class="-m-1.5 flex items-center p-1.5">
            <span class="sr-only">Your Company</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 378 375"
              fill="none"
            >
              <path d="M132 0L181 28V352.5L132 325.5V0Z" fill="black" />
              <path
                d="M197.5 121.5L246.5 149V344L197.5 316.5V121.5Z"
                fill="black"
              />
              <path d="M263 51.5L312 78.5V331.5L263 304.5V51.5Z" fill="black" />
              <path
                d="M329 144.5L377.5 172.5V322.5L329 295.5V144.5Z"
                fill="black"
              />
              <path d="M0.5 210.5L49.5 238.5V375L0.5 348V210.5Z" fill="black" />
              <path
                d="M66.5 103.5L115.5 130V365L66.5 337.5V103.5Z"
                fill="black"
              />
            </svg>
            <div class="ml-2 font-bold">Polar Peak</div>
          </router-link>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link
                to="/"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Home</router-link
              >
              <router-link
                to="/about"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >About</router-link
              >
            </div>
            <div class="py-6" v-if="!isAuthenticated">
              <router-link
                to="/auth/login"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Log in</router-link
              >
            </div>
            <div class="py-6" v-if="isAuthenticated">
              <router-link
                to="/dashboard"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Dashboard</router-link
              >
            </div>
            <div class="py-6" v-if="isAuthenticated">
              <button
                @click="logout"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import store from "@/store";
import { logout } from "@/api/auth";

const mobileMenuOpen = ref(false);
const isAuthenticated = store.state.user.loggedIn;
</script>
