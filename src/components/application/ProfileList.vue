<script setup>
import store from "../../store";
import { ref, watch } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { updateUser } from "@/api/user";

let props = defineProps({ user: Object });
const is_editing = ref(false);

const first_name = ref("");
const last_name = ref("");
const gender = ref("");
const birthdate = ref("");
const weight = ref("");
const height = ref("");

const previous_values = {};
const formater = ref({
  date: "YYYY-MM-DD",
  month: "MMM",
});

const toggleEdit = () => {
  first_name.value = props.user["first-name"];
  last_name.value = props.user["last-name"];
  birthdate.value = props.user["birthdate"];
  weight.value = props.user["weight"];
  height.value = props.user["height"];

  previous_values.value = {
    "first-name": first_name.value,
    "last-name": last_name.value,
    birthdate: birthdate.value,
    gender: gender.value,
    weight: weight.value,
    height: height.value,
  };
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

async function updateProfile() {
  const patchedData = {
    "first-name": first_name.value,
    "last-name": last_name.value,
    birthdate: String(birthdate.value),
    gender: gender.value,
    weight: weight.value,
    height: height.value,
  };
  if (JSON.stringify(previous_values.value) === JSON.stringify(patchedData)) {
    toggleEdit();
    return;
  }

  await updateUser(patchedData);
  toggleEdit();
  window.location.reload();
}

watch(
  () => props.user,
  (newValue) => {
    if (newValue) {
      gender.value = formatGender(newValue["gender"]);
    }
  },
);
</script>

<template>
  <div class="">
    <div class="flex justify-between xl:items-end">
      <h3 class="mt-4 text-2xl font-bold text-gray-900 xl:mt-16 xl:text-3xl">
        Your Information
      </h3>
      <button v-if="!is_editing" class="mt-4" @click="toggleEdit()">
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
      </button>
      <button v-if="is_editing" class="mt-4" @click="updateProfile()">
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
            v-if="!is_editing"
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ props.user["first-name"] }} {{ " " }}
            {{ props.user["last-name"] }}
          </dd>
          <div class="flex">
            <input
              v-if="is_editing"
              v-model="first_name"
              type="text"
              placeholder="First Name"
              class="mr-4 mt-1 w-1/2 flex-1 appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm leading-tight text-gray-900 focus:border-accent-yellow focus:bg-white focus:outline-none"
            />
            <input
              v-if="is_editing"
              v-model="last_name"
              type="text"
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
            v-if="!is_editing"
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ props.user["birthdate"] }}
          </dd>
          <div v-if="is_editing" class="mt-1">
            <label for="value"></label>
            <vue-tailwind-datepicker
              id="MyInput"
              v-model="birthdate"
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
          >
            {{ store.state.user.data.email }}
          </dd>
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
            v-if="!is_editing"
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ formatGender(props.user["gender"]) }}
          </dd>
          <select
            v-if="is_editing"
            v-model="gender"
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
            v-if="!is_editing"
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ props.user["weight"] }} kg
          </dd>
          <input
            v-if="is_editing"
            v-model="weight"
            type="number"
            placeholder="Weight"
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
            Height
          </dt>
          <dd
            v-if="!is_editing"
            class="mt-1 flex items-center text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ props.user["height"] }} cm
          </dd>
          <input
            v-if="is_editing"
            v-model="height"
            type="number"
            placeholder="Height"
            class="mr-4 mt-1 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm leading-tight text-gray-900 focus:border-accent-yellow focus:bg-white focus:outline-none"
          />
        </div>
      </dl>
    </div>
  </div>
</template>
