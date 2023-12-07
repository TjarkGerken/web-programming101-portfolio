<template>
  <Navbar class="z-30"> </Navbar>
  <div class="z-0 bg-white px-8 py-16">
    <div
      class="flex flex-col items-center text-center xl:flex-row xl:justify-center"
    >
      <img
        src="/src/assets/Team%20page-amico.png"
        alt=""
        class="h-[500] w-[500px]"
      />
      <div class="max-w-4xl py-8 xl:pl-16">
        <h1
          class="text-2xl font-bold drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:text-left xl:text-3xl"
        >
          Welcome to Peak Pulse
        </h1>
        <p
          class="pb-8 pt-2 text-justify leading-8 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        >
          At Peak Pulse we're passionate about transforming your fitness
          journey. Our platform was born from a desire to revolutionize the way
          you interact with your exercise data collected from Polar devices.
        </p>

        <hr class="mx-3 xl:hidden" />

        <h1
          class="pt-8 text-2xl font-bold drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:text-left xl:text-3xl"
        >
          Our Mission
        </h1>
        <p
          class="pt-2 text-justify leading-8 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        >
          We believe in empowering fitness enthusiasts like you to achieve their
          goals by providing a comprehensive and intuitive platform. We strive
          to offer an all-in-one solution for visualizing, analyzing, and
          tracking your workout statistics. From distance and heart rate to
          speed and calories burned, our goal is to make your fitness data
          easily accessible and actionable.
        </p>
      </div>
    </div>

    <div
      class="flex flex-col items-center text-center xl:flex-row-reverse xl:justify-center"
    >
      <img
        src="/src/assets/Scrum%20board-amico.png"
        alt=""
        class="h-[500] w-[500px]"
      />
      <div class="max-w-4xl py-8 xl:pr-16">
        <h1
          class="text-2xl font-bold drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:text-left xl:text-3xl"
        >
          Why Choose Us?
        </h1>
        <p
          class="pb-8 pt-2 text-justify leading-8 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        >
          With a team dedicated to innovation, we've crafted a user-friendly
          dashboard that simplifies complex data into easily understandable
          insights. Our commitment lies in offering you a seamless experience
          that motivates and drives you towards your fitness aspirations.
        </p>

        <hr class="mx-3 xl:hidden" />

        <h1
          class="pt-8 text-2xl font-bold drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:text-left xl:text-3xl"
        >
          What Sets Us Apart
        </h1>
        <p
          class="pt-2 text-justify leading-8 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        >
          Advanced Tracking: Gain insights into every aspect of your workout
          routine with detailed statistics. Customizable Goals: Set and achieve
          weekly targets tailored to your fitness objectives. Engaging
          Interface: Experience a visually appealing and intuitive dashboard for
          effortless navigation and tracking. Motivation at Your Fingertips:
          Stay motivated with clear, concise, and personalized progress updates.
        </p>
      </div>
    </div>

    <div
      class="flex flex-col items-center text-center xl:flex-row xl:justify-center"
    >
      <img
        src="/src/assets/Fitting%20piece-amico.png"
        alt=""
        class="h-[500] w-[500px] py-4 xl:h-[500px]"
      />

      <div class="xl:flex xl:flex-col xl:items-start">
        <div class="max-w-4xl py-8 xl:pb-4 xl:pl-16">
          <h1
            class="text-2xl font-bold drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)] xl:text-left xl:text-3xl"
          >
            Join Us in Your Fitness Journey
          </h1>
          <p
            class="pt-2 text-justify leading-8 drop-shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
          >
            Whether you're a beginner or a seasoned athlete, Peak Pulse is your
            partner in achieving fitness milestones. We invite you to explore
            our platform and embark on a transformative journey towards a
            healthier, fitter you.
          </p>
        </div>

        <router-link
          to="/auth/register"
          class="rounded-md bg-accent-yellow px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-accent-yellow-light xl:ml-16"
          >Get started</router-link
        >
      </div>
    </div>
  </div>

  <div class="bg-[#263238]">
    <div class="mx-auto max-w-2xl py-6 text-white">
      <div class="text-center">
        <h3 class="mb-3 text-2xl font-bold lg:pb-4 lg:pt-8 lg:text-3xl">
          Stay fit. All day, every day.
        </h3>
      </div>
      <div
        class="lg:text-md mt-2 flex flex-col items-center text-sm text-gray-300 lg:pb-4"
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

<script setup>
import Navbar from "@/components/utils/Navbar.vue";
</script>