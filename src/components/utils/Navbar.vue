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
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <PopoverGroup class="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-12">
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
        class="hidden lg:flex lg:flex-1 lg:justify-end 2xl:mr-48"
        v-if="!isAuthenticated"
      >
        <router-link
          to="/auth/login"
          class="text-xl font-semibold leading-6 text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></router-link
        >
      </div>

      <div
        class="hidden lg:flex lg:flex-1 lg:justify-end 2xl:mr-48"
        v-if="isAuthenticated"
      >
        <router-link
          to="/dashboard"
          class="text-xl font-semibold leading-6 text-gray-900"
          >Dashboard </router-link
        >
        <button
            @click="logout"
            class="text-xl font-semibold leading-6 text-gray-900 ml-12"
        >
          Logout <span aria-hidden="true">&larr;</span>
        </button>
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
            <img
              src="@/assets/logo.png"
              class="h-[25px] w-[25px] 2xl:h-[35px] 2xl:w-[35px]"
              alt="Company Logo"
            />
          </router-link>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
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
