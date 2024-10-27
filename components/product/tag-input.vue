<template>
  <div class="flex flex-wrap items-center rounded">
    <input
      v-model="inputValue"
      @keydown.enter.prevent="addTag"
      @keydown.delete="removeLastTag"
      type="text"
      placeholder="Add a tag and press Enter"
      class="border-none outline-none flex-grow p-2 focus:ring-0"
    />
    <div class="flex flex-wrap space-x-2 mt-1">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="flex items-center bg-[#28574e] text-white rounded px-2 py-1"
      >
        {{ tag }}
        <button
          @click="removeTag(index)"
          class="ml-2 text-white hover:text-red-500"
          title="Remove Tag"
          type="button"
        >
          <X />
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { X } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const tags = ref([...props.modelValue]);
const inputValue = ref("");

watch(
  () => props.modelValue,
  (newVal) => {
    tags.value = [...newVal];
  }
);

const addTag = () => {
  const trimmedValue = inputValue.value.trim();
  if (trimmedValue && !tags.value.includes(trimmedValue)) {
    tags.value.push(trimmedValue);
    emit("update:modelValue", tags.value);
    inputValue.value = "";
  }
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
  emit("update:modelValue", tags.value);
};

const removeLastTag = (event) => {
  if (event.key === "Backspace" && inputValue.value === "") {
    tags.value.pop();
    emit("update:modelValue", tags.value);
  }
};
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
