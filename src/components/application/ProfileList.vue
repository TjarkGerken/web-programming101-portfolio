<template>
  <div class="">
    <div class="flex justify-between xl:items-end">
      <h3 class="mt-4 text-2xl font-bold text-gray-900 xl:mt-16 xl:text-3xl">
        Your Information
      </h3>
      <button @click="toggleEdit" class="mt-4">
        <svg
          v-if="!is_editing"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#0f172a"
          class="h-5 w-5 xl:mb-1 xl:h-7 xl:w-7"
        >
          <path
            class="shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        <svg
          v-if="is_editing"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5 xl:mb-1 xl:h-7 xl:w-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
          />
        </svg>
      </button>
    </div>
    <div class="mt-4 justify-between">
      <dl class="divide-y divide-gray-100">
        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          :class="{ 'py-5': is_editing, 'py-6': !is_editing }"
        >
          <dt
            class="text-md flex items-center font-semibold leading-6 text-gray-900"
          >
            Full name
          </dt>
          <dd
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            v-if="!is_editing"
          >
            {{ props.user["first-name"] }} {{ " " }}
            {{ props.user["last-name"] }}
          </dd>
          <div class="flex">
            <input
              type="text"
              v-if="is_editing"
              :value="props.user['first-name']"
              placeholder="First Name"
              class="mr-4 mt-1 w-1/2 flex-1 appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm leading-tight text-gray-900 focus:border-accent-yellow focus:bg-white focus:outline-none"
            />
            <input
              type="text"
              v-if="is_editing"
              :value="props.user['last-name']"
              placeholder="Last Name"
              class="mt-1 w-1/2 flex-1 appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm leading-tight text-gray-900 focus:border-accent-yellow focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          :class="{ 'py-5': is_editing, 'py-6': !is_editing }"
        >
          <dt
            class="text-md flex items-center font-semibold leading-6 text-gray-900"
          >
            Birthdate
          </dt>
          <dd
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            v-if="!is_editing"
          >
            {{ props.user["birthdate"] }}
          </dd>
          <div v-if="is_editing" class="mt-1">
            <label for="value"></label>
            <vue-tailwind-datepicker
              id="MyInput"
              v-model="dateValue"
              as-single
              :formatter="formater"
              :placeholder="props.user['birthdate']"
              :shortcuts="false"
              separator=" to "
              input-classes="text-sm bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-accent-yellow mt-1"
            />
          </div>
        </div>

        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          :class="{ 'py-5': is_editing, 'py-6': !is_editing }"
        >
          <dt
            class="text-md flex items-center font-semibold leading-6 text-gray-900"
          >
            Email address
          </dt>
          <dd
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            v-if="!is_editing"
          >
            {{ store.state.user.data.email }}
          </dd>
          <input
            type="email"
            v-if="is_editing"
            :value="store.state.user.data.email"
            placeholder="Email"
            class="mr-4 mt-1 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm leading-tight text-gray-900 focus:border-accent-yellow focus:bg-white focus:outline-none"
          />
        </div>

        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          :class="{ 'py-5': is_editing, 'py-6': !is_editing }"
        >
          <dt
            class="text-md flex items-center font-semibold leading-6 text-gray-900"
          >
            Gender
          </dt>
          <dd
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            v-if="!is_editing"
          >
            {{ formatGender(props.user["gender"]) }}
          </dd>
          <select
              v-model="selectedOption"
              v-if="is_editing"
              class="mr-4 mt-1 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm leading-tight text-gray-900 focus:border-accent-yellow focus:bg-white focus:outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Diverse">Diverse</option>
          </select>
        </div>

        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          :class="{ 'py-5': is_editing, 'py-6': !is_editing }"
        >
          <dt
            class="text-md flex items-center font-semibold leading-6 text-gray-900"
          >
            Weight
          </dt>
          <dd
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            v-if="!is_editing"
          >
            {{ props.user["weight"] }} kg
          </dd>
          <input
            type="number"
            v-if="is_editing"
            :value="props.user['weight']"
            placeholder="Weight"
            class="mr-4 mt-1 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm leading-tight text-gray-900 focus:border-accent-yellow focus:bg-white focus:outline-none"
          />
        </div>
      </dl>
      <!--    <img src="/src/assets/Account-amico.png" alt="" class="w-[500px]">-->
    </div>
  </div>
</template>

<script setup>
import store from "../../store";
import {ref, watch} from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";

let props = defineProps({ user: Object });
const is_editing = ref(false);
const dateValue = ref([]);

const formater = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});

const toggleEdit = () => {
  is_editing.value = !is_editing.value;
};
// Expose the toggleEdit function to the template
defineExpose({ toggleEdit });

const formatGender = (x) => {
  if (x) {
    let y = x.toLowerCase();
    y = y[0].toUpperCase() + y.slice(1);
    return y;
  }
};


const selectedOption = ref("")

watch(() => props.user, (newValue) => {
  if (newValue) {
    selectedOption.value = formatGender(newValue["gender"]);
  }
})

</script>