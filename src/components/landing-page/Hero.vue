<template>

  <div class="relative bg-white">
    <Navbar class=" z-30 w-screen"></Navbar>
    <BgShape class="absolute end-0 invisible 2xl:visible"></BgShape>

    <div class="relative z-20 px-6 lg:px-8 flex flex-col-reverse items-center justify-center
                lg:flex-row lg:">
      <div class="flex flex-col text-center max-w-4xl py-16 sm:py-48 lg:py-56
                  lg:text-left lg:mr-10">
        <div class="lg:flex lg:flex-col lg:items-start">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Get started with Advanced Workout tracking.
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
            Transform your fitness journey with our intuitive Polar device companion.
            Visualize and track every workout detail – distance, heart rate, speed, and calories burned – all in one easy-to-use dashboard.
            Elevate your performance effortlessly!
          </p>
          <div class="mt-10 flex flex-row justify-center gap-x-6">
            <a href="#" class="rounded-md bg-[#FFC100] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FFE080] transition-colors duration-300 ease-in-out">Get started</a>
            <a href="#" class="text-sm font-semibold rounded-md px-3.5 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-gray-300 border border-opacity-10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow duration-300 ease-in-out">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <img src="/src/assets/Fitness%20stats-amico.png" alt="" class="w-[500px] h-[500] pt-16 lg:p-0 lg:ml-10">
    </div>

    <div class="px-6 lg:pb-48 lg:flex lg:flex-col-reverse lg:items-center">
      <img src="/src/assets/Smartwatch-amico.png" alt="" class="transform -scale-x-100 w-[500px] h-[500] lg:pt-24 ">

      <div class="my-16 lg:flex lg:text-center lg:max-w-screen-2xl">
        <div class="mx-3 py-3 lg:flex lg:flex-col lg:items-center lg:border-2 lg:border-gray-300 lg:border-opacity-30 lg:rounded-xl lg:flex-1 lg:shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <div class="flex items-center lg:pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFC100" class="w-10 h-10 lg:w-12 lg:h-12">
              <path class="shadow-[0_8px_30px_rgb(0,0,0,0.05)]" stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>

            <h1 class="font-bold text-lg ml-1 text-gray-900 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]
                       lg:text-3xl">Workout Tracking</h1>
          </div>
          <p class="mt-1 ml-2 leading-2 text-gray-600 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]
                    lg:m-0 lg:text-lg lg:mt-2 lg:leading-8 lg:pl-4 lg:pr-4 lg:pb-4">Comprehensive and intuitive,
            our platform tracks essential workout statistics including distance, heart rate, speed, and calories burned.
          </p>
        </div>

        <hr class="my-4 mx-3">

        <div class="mx-3 py-3 lg:flex lg:flex-col lg:items-center lg:border-2 lg:border-gray-300 lg:border-opacity-30 lg:rounded-xl lg:flex-1 lg:shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <div class="flex flex-row-reverse items-center lg:flex-row lg:pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFC100" class="w-10 h-10 lg:w-12 lg:h-12">
              <path class="shadow-[0_8px_30px_rgb(0,0,0,0.05)]" stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>

            <h1 class="font-bold text-lg mr-1 text-gray-900 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]
                       lg:text-3xl lg:ml-1 lg:mr-0" >Statistical Progress</h1>
          </div>
          <p class="text-end mt-1 mr-2 leading-2 text-gray-600 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]
                    lg:m-0 lg:text-center lg:text-lg lg:mt-2 lg:leading-8 lg:pl-4 lg:pr-4 lg:pb-4">Review your aggregated weekly stats
            to gain a detailed overview of your progress and performance trends.
          </p>
        </div>

        <hr class="my-4 mx-3">

        <div class="mx-3 py-3 lg:flex lg:flex-col lg:items-center lg:border-2 lg:border-gray-300 lg:border-opacity-30 lg:rounded-xl lg:flex-1 lg:shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <div class="flex items-center lg:pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFC100" class="w-9 h-10 lg:w-11 lg:h-12">
              <path class="shadow-[0_8px_30px_rgb(0,0,0,0.05)]" stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
            <h1 class="font-bold text-lg ml-1 text-gray-900 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]
                       lg:text-3xl">Weekly Goals</h1>
          </div>
          <p class="mt-1 ml-2 leading-2 text-gray-600 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]
                    lg:m-0 lg:text-lg lg:mt-2 lg:leading-8 lg:pl-4 lg:pr-4 lg:pb-4">Set, achieve, and exceed your weekly goals with customizable targets,
            empowering you to stay motivated and elevate your fitness journey.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-[#263238]">
    <div class="max-w-2xl mx-auto text-white py-6">
      <div class="text-center">
        <h3 class="text-2xl mb-3 font-bold lg:text-3xl lg:pt-8 lg:pb-4"> Stay fit. All day, every day. </h3>
      </div>
      <div class="mt-2 flex flex-col items-center text-sm text-gray-300 lg:text-md lg:pb-4">
        <p class="order-2 md:order-1 mt-4 md:mt-0"> &copy; Polar Peak, 2023. </p>
        <div class="order-1 md:order-2">
          <span class="px-2">About us</span>
          <span class="px-2 border-l">Contact us</span>
          <span class="px-2 border-l">Privacy Policy</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Navbar from "@/components/utils/Navbar.vue";
import BgShape from "@/components/landing-page/BgShape.vue";

</script>
