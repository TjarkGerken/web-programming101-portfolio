<template>
  <Navbar class="border-b-2 border-gray-50" />
  <Team />
  <Content />
  <CTA />
</template>

<script setup>
import Navbar from "@/components/utils/Navbar.vue";
import CTA from "@/components/landing-page/CTA.vue";
import Team from "@/components/landing-page/Team.vue";
import Content from "@/components/landing-page/Content.vue";
</script>
