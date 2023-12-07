<script setup>
import { computed, ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  ComboboxOption,
  ComboboxOptions,
  ComboboxInput,
  Combobox,
  ComboboxButton,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { createGoal } from "@/api/goals";
import { useToast } from "vue-toast-notification";

/**
 *  Defines the emit Goal-Created. This is used in the parent component to refresh the goals after the creation.
 * @type {EmitFn<string[]>}
 */
const emit = defineEmits(["goal-created"]);
const props = defineProps({
  goalArray: {
    type: Object,
    default: () => ({}),
  },
});

const isOpen = ref(false);

// Initialize the form errors and the disabled state
const formErrors = ref({ date: "", goalType: "", goalValue: "" });
const disabled = ref(false);

// Formater for the datepicker
const formater = ref({
  date: "DD.MM.YYYY ",
  month: "MMM",
});

// Initialize the form values
const dateValue = ref([]);
const value = ref(0);

// Initialize the MultiSelect
const query = ref("");
const goal_types = [
  { id: 1, name: "Distance", unit: "Kilometers" },
  { id: 2, name: "Time", unit: "Minutes" },
  { id: 3, name: "Calories", unit: "Kilocalories" },
];
const selected_goal = ref(goal_types[0]);

/**
 *  Filters the goal types based on the query for the multiselect. Returns all goal types if the query is empty and filters the goal types based on the query otherwise.
 *  By https://headlessui.com/vue/combobox
 * @type {ComputedRef<[{unit: string, name: string, id: number},{unit: string, name: string, id: number},{unit: string, name: string, id: number}]|({unit: string, name: string, id: number}|{unit: string, name: string, id: number}|{unit: string, name: string, id: number})[]>}
 */
let filteredGoal = computed(() =>
  query.value === ""
    ? goal_types
    : goal_types.filter((goal) =>
        goal.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, "")),
      ),
);

/**
 * Function to close the modal.
 */
function closeModal() {
  isOpen.value = false;
}

/**
 *  Function to open the modal. And disallows creation when the user already has 3 active goals
 */
function openModal() {
  if (props.goalArray.length >= 3) {
    useToast().error("You can only have 3 goals at a time.");
    return;
  }
  isOpen.value = true;
}

/**
 * Function to validate the form
 * Validates that:
 * - The date is set
 * - The goal type is set
 * - The goal value is set and positive
 * @returns {boolean} If the form is valid
 */
function validateForm() {
  formErrors.value = {};

  if (!dateValue.value || dateValue.value.length !== 2) {
    formErrors.value.date = "Start and end date are required";
  }

  if (!selected_goal.value) {
    formErrors.value.goalType = "Goal type is required";
  }

  if (!value.value || value.value <= 0) {
    formErrors.value.goalValue = "Goal value is required and must be positive";
  }

  return Object.keys(formErrors.value).length === 0;
}

/**
 * Function to create a new goal. Disables the button while the request is running.
 */
function submitGoal() {
  disabled.value = true;
  if (!validateForm()) {
    disabled.value = false;
    return;
  }

  createGoal({
    start_date: dateValue.value[0].trim(),
    end_date: dateValue.value[1].trim(),
    goal_type: selected_goal.value.name,
    goal_value: value.value,
  })
    .then(() => {
      disabled.value = false;
      closeModal();
      // Emit goal-created to refresh the goals
      emit("goal-created");
    })
    .catch(() => {
      disabled.value = false;
    });
}
</script>

<template>
  <button type="button" @click="openModal">Add Goal</button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-20" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="h-fit w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Create a new Goal
              </DialogTitle>
              <div class="mt-2">
                <form action="" class="flex h-96 flex-col space-y-4">
                  <div>
                    <label for="value">Time Range</label>
                    <vue-tailwind-datepicker
                      v-model="dateValue"
                      as-single
                      use-range
                      :formatter="formater"
                      :shortcuts="false"
                      separator=" to "
                    />
                    <p class="text-sm text-red-600">{{ formErrors.date }}</p>
                  </div>

                  <div>
                    <label for="value">Goal Type</label>
                    <Combobox v-model="selected_goal">
                      <div class="relative mt-1">
                        <div
                          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                        >
                          <ComboboxInput
                            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            :display-value="(goal) => goal.name"
                            @change="query = $event.target.value"
                          />
                          <ComboboxButton
                            class="absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon
                              class="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </ComboboxButton>
                        </div>
                        <TransitionRoot
                          leave="transition ease-in duration-100"
                          leave-from="opacity-100"
                          leave-to="opacity-0"
                          @after-leave="query = ''"
                        >
                          <ComboboxOptions
                            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <div
                              v-if="filteredGoal.length === 0 && query !== ''"
                              class="relative cursor-default select-none px-4 py-2 text-gray-700"
                            >
                              Nothing found.
                            </div>

                            <ComboboxOption
                              v-for="goal in filteredGoal"
                              :key="goal.id"
                              v-slot="{ selected, active }"
                              as="template"
                              :value="goal"
                            >
                              <li
                                class="relative cursor-default select-none py-2 pl-10 pr-4"
                                :class="{
                                  'bg-accent-yellow text-white': active,
                                  'text-gray-900': !active,
                                }"
                              >
                                <span
                                  class="block truncate"
                                  :class="{
                                    'font-medium': selected,
                                    'font-normal': !selected,
                                  }"
                                >
                                  {{ goal.name }}
                                </span>
                                <span
                                  v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                                  :class="{
                                    'text-white': active,
                                    'text-accent-yellow': !active,
                                  }"
                                >
                                  <CheckIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </li>
                            </ComboboxOption>
                          </ComboboxOptions>
                        </TransitionRoot>
                      </div>
                    </Combobox>
                    <p class="text-sm text-red-600">
                      {{ formErrors.goalType }}
                    </p>
                  </div>
                  <div>
                    <label for="value">{{ selected_goal.unit }}</label>
                    <input
                      id="value"
                      v-model="value"
                      type="number"
                      min="0"
                      pattern="\d+"
                      class="-z-20 w-full cursor-default overflow-hidden rounded-lg border-none bg-white py-2 pl-3 pr-10 text-left text-sm leading-5 text-gray-900 drop-shadow focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-accent-yellow-light sm:text-sm"
                    />
                    <p class="text-sm text-red-600">
                      {{ formErrors.goalValue }}
                    </p>
                  </div>
                </form>
              </div>

              <div class="mt-4 flex w-full justify-around">
                <button
                  :disabled="disabled"
                  type="button"
                  class="inline-flex w-1/3 justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:bg-gray-400"
                  @click="closeModal"
                >
                  Dismiss
                </button>
                <button
                  :disabled="disabled"
                  type="button"
                  class="inline-flex w-1/3 justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:bg-gray-400"
                  @click="submitGoal"
                >
                  Create
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
