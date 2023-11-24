<script setup>
import { onMounted, ref } from "vue";
import { evaluateGoals } from "@/api/goals";
import CreateGoal from "@/components/CreateGoal.vue";
import DisplayGoal from "@/components/DisplayGoal.vue";
const goals = ref([]);

onMounted(() => {
  evaluateGoals().then((res) => {
    goals.value = res;
    console.log(res);
  });
});
</script>

<template>
  Goals Container
  <DisplayGoal v-for="goal in goals" :goal="goal" :key="goal.id" />
  <CreateGoal />
</template>
