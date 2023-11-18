<template>
  <header class="bg-white border-gray-50 border-2">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <router-link to="" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
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
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <router-link
          to="/"
          class="text-sm font-semibold leading-6 text-gray-900"
          >Home</router-link
        >
        <router-link
          to="/about"
          class="text-sm font-semibold leading-6 text-gray-900"
          >About</router-link
        >
      </PopoverGroup>
      <div
        class="hidden lg:flex lg:flex-1 lg:justify-end"
        v-if="!isAuthenticated"
      >
        <router-link
          to="/auth/login"
          class="text-sm font-semibold leading-6 text-gray-900"
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
          to="/"
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
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <router-link to="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
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
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton
                    v-for="item in [...products, ...callsToAction]"
                    :key="item.name"
                    as="a"
                    :href="item.href"
                    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >{{ item.name }}</DisclosureButton
                  >
                </DisclosurePanel>
              </Disclosure>
              <router-link
                to="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Features</router-link
              >
              <router-link
                to="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Marketplace</router-link
              >
              <router-link
                to="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Company</router-link
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
                to="/"
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
import { computed, reactive, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import store from "@/store";
import { logout } from "@/api/auth";

const mobileMenuOpen = ref(false);
const isAuthenticated = store.state.user.loggedIn;
</script>
