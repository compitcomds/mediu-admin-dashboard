<template>
  <div class="flex items-center gap-3 lg:gap-10">
    <label for="product-options" class="block text-sm font-medium text-gray-700"
      >Product Options</label
    >
    <button
      type="button"
      class="flex px-5 py-2 rounded-md text-sm items-center gap-2 bg-white"
      @click="addNewOption"
    >
      <PlusCircle width="20" /> Add Options
    </button>
  </div>

  <div class="mt-3">
    <div v-for="(option, index) in options" class="mb-6 flex">
      <button
        class="flex h-fit px-2 hover:text-white hover:bg-red-500 transition border border-gray-400 border-r-0 py-2 text-red-500 text-sm items-center gap-2"
        type="button"
        @click="deleteOption(index)"
      >
        <Trash width="16" /> <span class="sr-only">Delete Option</span>
      </button>
      <div class="flex flex-1 flex-col gap-3 border border-gray-400 p-3 mb-3">
        <div>
          <label class="block mb-1" :for="`option-name-${index}`"
            >Option Name</label
          >
          <input
            type="text"
            v-model="option.name"
            :id="`option-name-${index}`"
            required
            class="block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          />
        </div>
        <div>
          <p>Option Values</p>
          <template v-for="i in option.values.length">
            <div class="relative">
              <input
                type="text"
                v-model="option.values[i - 1]"
                class="block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
              />
              <button
                class="absolute right-1 top-1/2 -translate-y-1/2 flex h-fit px-2 hover:text-white hover:bg-red-500 bg-white max-h-[80%] py-2 text-red-500 text-sm items-center gap-2"
                type="button"
                @click="deleteOptionValue(index, i - 1)"
              >
                <Trash width="16" /> <span class="sr-only">Delete Option</span>
              </button>
            </div>
          </template>
        </div>
        <button
          type="button"
          class="flex px-5 py-2 rounded-md w-fit text-sm items-center gap-2 bg-white"
          @click="addNewOptionValue(index)"
        >
          <PlusCircle width="20" /> Add Option Value
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusCircle, Trash } from "lucide-vue-next";

const props = defineProps<{
  modelValue: undefined | Array<{ name: string; values: string[] }>;
}>();

const emit = defineEmits(["update:modelValue"]);

const options = ref<Array<{ name: string; values: string[] }>>(
  props.modelValue || []
);

const addNewOption = () => {
  options.value.push({ name: "", values: [""] });
};

const deleteOption = (index: number) => {
  if (!(index >= 0 && index < options.value.length)) return;
  options.value.splice(index, 1);
};

const addNewOptionValue = (index: number) => {
  options.value[index].values.push("");
};

const deleteOptionValue = (index: number, i: number) => {
  if (!(index >= 0 && index < options.value.length)) return;
  if (!(i >= 0 && i < options.value[index].values.length)) return;

  options.value[index].values.splice(i, 1);
};

watch(
  () => options.value,
  () => {
    emit("update:modelValue", options.value);
  }
);
</script>
