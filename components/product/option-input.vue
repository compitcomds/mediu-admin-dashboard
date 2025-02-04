<template>
  <div class="flex items-center gap-3 lg:gap-10">
    <label for="product-options" class="block text-sm font-medium text-gray-700"
      >Product Options</label
    >
  </div>

  <div class="mt-3">
    <div v-for="(option, index) in options" class="mb-6 flex">
      <div class="mb-3 flex flex-1 flex-col gap-3 border border-gray-400 p-3">
        <div>
          <label class="mb-1 block" :for="`option-name-${index}`"
            >Option Name</label
          >
          <input
            type="text"
            v-model.trim="option.name"
            v-on:keydown.enter.prevent="enterPressedOnOptionName(index)"
            :id="`option-name-${index}`"
            disabled
            required
            class="block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          />
        </div>
        <div>
          <p>Option Values <span class="text-red-500">*</span></p>
          <template v-for="i in option.values.length">
            <div class="relative">
              <input
                type="text"
                v-model.trim="option.values[i - 1].name"
                :id="`option-${index}-value-${i - 1}`"
                v-on:keydown.enter.prevent="
                  optionValueEnterKeyPressed(index, i - 1)
                "
                class="block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
                required
                :disabled="!!disabledForm"
              />
              <button
                v-if="option.values.length > 1 && !disabledForm"
                class="absolute right-1 top-1/2 flex h-fit max-h-[80%] -translate-y-1/2 items-center gap-2 bg-white px-2 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white"
                type="button"
                @click="deleteOptionValue(index, i - 1)"
              >
                <Trash width="16" /> <span class="sr-only">Delete Option</span>
              </button>
            </div>
          </template>
        </div>
        <button
          v-if="!disabledForm"
          type="button"
          class="flex w-fit items-center gap-2 rounded-md bg-white px-5 py-2 text-sm"
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
  modelValue: undefined | Array<{ name: string; values: { name: string }[] }>;
  productId?: string;
  disabledForm?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const options = ref<Array<{ name: string; values: { name: string }[] }>>(
  props.modelValue || [],
);

const addNewOption = () => {
  options.value.push({ name: "", values: [{ name: "" }] });
  nextTick(() => {
    document.getElementById(`option-name-${options.value.length - 1}`)?.focus();
  });
};

const deleteOption = (index: number) => {
  if (!(index >= 0 && index < options.value.length)) return;
  options.value.splice(index, 1);
};

const addNewOptionValue = (index: number) => {
  options.value[index].values.push({ name: "" });
  nextTick(() => {
    document
      .getElementById(
        `option-${index}-value-${options.value[index].values.length - 1}`,
      )
      ?.focus();
  });
};

const deleteOptionValue = (index: number, i: number) => {
  if (!(index >= 0 && index < options.value.length)) return;
  if (options.value[index].values.length === 1) return;
  if (!(i >= 0 && i < options.value[index].values.length)) return;

  options.value[index].values.splice(i, 1);
};

const optionValueEnterKeyPressed = (index: number, i: number) => {
  if (!(index >= 0 && index < options.value.length)) return;
  if (i === options.value[index].values.length - 1) addNewOptionValue(index);
  else {
    document.getElementById(`option-${index}-value-${i + 1}`)?.focus();
  }
};

const enterPressedOnOptionName = (index: number) => {
  if (!(index >= 0 && index < options.value.length)) return;
  document.getElementById(`option-${index}-value-0`)?.focus();
};

watch(
  () => options.value,
  () => {
    emit("update:modelValue", options.value);
  },
);
</script>
