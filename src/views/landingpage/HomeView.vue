<script setup>
import Navbar from "@/components/utils/LandingPageNavbar.vue";
import BgShape from "@/components/landing-page/BgShape.vue";
</script>
<template>
  <Navbar class="z-30"></Navbar>
  <div class="relative z-0 bg-white">
    <BgShape class="invisible absolute end-0 2xl:visible"></BgShape>

    <div
      class="xl: relative z-20 flex flex-col-reverse items-center justify-center px-8 xl:flex-row xl:px-8"
    >
      <div
        class="flex max-w-4xl flex-col py-16 text-center sm:py-48 xl:mr-10 xl:py-56 xl:text-left"
      >
        <div class="xl:flex xl:flex-col xl:items-start">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Get started with Advanced Workout tracking.
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Transform your fitness journey with our intuitive Polar device
            companion. Visualize and track every workout detail – distance,
            heart rate, speed, and calories burned – all in one easy-to-use
            dashboard. Elevate your performance effortlessly!
          </p>
          <div class="mt-10 flex flex-row justify-center gap-x-6">
            <router-link
              to="/auth/register"
              class="rounded-md bg-accent-yellow px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-accent-yellow-light"
              >Get started</router-link
            >
            <router-link
              to="/about"
              class="rounded-md border border-gray-300 border-opacity-30 px-3.5 py-2.5 text-sm font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)]"
              >Learn more <span aria-hidden="true">→</span></router-link
            >
          </div>
        </div>
      </div>
      <img
        src="/src/assets/Fitness%20stats-amico.png"
        alt=""
        class="h-[500] w-[500px] pt-16 xl:ml-10 xl:p-0"
      />
    </div>

    <div class="px-6 xl:flex xl:flex-col-reverse xl:items-center xl:pb-48">
      <img
        src="/src/assets/Smartwatch-amico.png"
        alt=""
        class=" mb-8 h-[500] w-[500px] -scale-x-100 transform xl:pt-24 xl:mb-0"
      />

      <div class="mb-16 xl:flex xl:max-w-screen-2xl xl:text-center">
        <div
          class="mx-3 py-3 xl:flex xl:flex-1 xl:flex-col xl:items-center xl:rounded-xl xl:border-2 xl:border-gray-300 xl:border-opacity-30 xl:shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        >
          <div class="flex items-center text-accent-yellow xl:pt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-10 w-10 xl:h-12 xl:w-12"
            >
              <path
                class="shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
              />
            </svg>

            <h1
              class="ml-1 text-lg font-bold text-gray-900 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:text-3xl xl:ml-2"
            >
              Workout Tracking
            </h1>
          </div>
          <p
            class="leading-2 ml-2 mt-1 text-gray-600 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:m-0 xl:mt-2 xl:pb-4 xl:pl-4 xl:pr-4 xl:text-lg xl:leading-8"
          >
            Comprehensive and intuitive, our platform tracks essential workout
            statistics including distance, heart rate, speed, and calories
            burned.
          </p>
        </div>

        <hr class="mx-3 my-4" />

        <div
          class="mx-3 py-3 xl:flex xl:flex-1 xl:flex-col xl:items-center xl:rounded-xl xl:border-2 xl:border-gray-300 xl:border-opacity-30 xl:shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        >
          <div
            class="flex flex-row-reverse items-center text-accent-yellow xl:flex-row xl:pt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-10 w-10 xl:h-12 xl:w-12"
            >
              <path
                class="shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>

            <h1
              class="mr-1 text-lg font-bold text-gray-900 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:ml-2 xl:mr-0 xl:text-3xl "
            >
              Statistical Progress
            </h1>
          </div>
          <p
            class="leading-2 mr-2 mt-1 text-end text-gray-600 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:m-0 xl:mt-2 xl:pb-4 xl:pl-4 xl:pr-4 xl:text-center xl:text-lg xl:leading-8"
          >
            Review your aggregated weekly stats to gain a detailed overview of
            your progress and performance trends.
          </p>
        </div>

        <hr class="mx-3 my-4" />

        <div
          class="mx-3 py-3 xl:flex xl:flex-1 xl:flex-col xl:items-center xl:rounded-xl xl:border-2 xl:border-gray-300 xl:border-opacity-30 xl:shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        >
          <div class="flex items-center text-accent-yellow xl:pt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-10 w-9 xl:h-12 xl:w-11"
            >
              <path
                class="shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            <h1
              class="ml-1 text-lg font-bold text-gray-900 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:text-3xl xl:ml-2"
            >
              Weekly Goals
            </h1>
          </div>
          <p
            class="leading-2 ml-2 mt-1 text-gray-600 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:m-0 xl:mt-2 xl:pb-4 xl:pl-4 xl:pr-4 xl:text-lg xl:leading-8"
          >
            Set, achieve, and exceed your weekly goals with customizable
            targets, empowering you to stay motivated and elevate your fitness
            journey.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-[#263238]">
    <div class="mx-auto max-w-2xl py-6 text-white">
      <div class="text-center">
        <h3 class="mb-3 text-2xl font-bold xl:pb-4 xl:pt-8 xl:text-3xl">
          Stay fit. All day, every day.
        </h3>
      </div>
      <div
        class="xl:text-md mt-2 flex flex-col items-center text-sm text-gray-300 xl:pb-4"
      >
        <p class="order-2 mt-4 md:order-1 md:mt-0">&copy; Peak Pulse, 2023.</p>
        <div class="order-1 md:order-2">
          <router-link
              to="/about" class="px-2">About us
          </router-link>
          <a class="border-l px-2" href="mailto:email@example.com">Contact us</a>
        </div>
      </div>
    </div>
  </div>
</template>
