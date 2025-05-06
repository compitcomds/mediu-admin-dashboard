<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-96 rounded-lg bg-white p-6 shadow-lg">
      <h2 class="mb-4 text-xl font-semibold">Enter Dimensions and Weight</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="length" class="block text-sm font-medium text-gray-700"
            >Length (cm):</label
          >
          <input
            v-model="form.length"
            type="text"
            id="length"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div class="mb-4">
          <label for="breadth" class="block text-sm font-medium text-gray-700"
            >Breadth (cm):</label
          >
          <input
            v-model="form.breadth"
            type="text"
            id="breadth"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div class="mb-4">
          <label for="height" class="block text-sm font-medium text-gray-700"
            >Height (cm):</label
          >
          <input
            v-model="form.height"
            type="text"
            id="height"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div class="mb-4">
          <label for="weight" class="block text-sm font-medium text-gray-700"
            >Weight (kg):</label
          >
          <input
            v-model="form.weight"
            type="text"
            id="weight"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div class="flex justify-between">
          <button
            type="submit"
            class="rounded-md bg-[#28574e] px-4 py-2 font-semibold text-white hover:bg-[#2d7d65]"
          >
            Submit
          </button>
          <button
            type="button"
            @click="closeDialog"
            class="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["submit", "close"]);

const form = ref({
  length: "1",
  breadth: "1",
  height: "1",
  weight: "1",
});

const submitForm = () => {
  const { breadth, height, length, weight } = form.value;
  const b = parseFloat(breadth);
  const h = parseFloat(height);
  const l = parseFloat(length);
  const w = parseFloat(weight);

  if (
    Number.isNaN(b) ||
    Number.isNaN(h) ||
    Number.isNaN(l) ||
    Number.isNaN(w)
  ) {
    toast.error(
      "Length, breadth, height and weight must be decimal values. Please enter valid decimal values for each.",
      { richColors: true },
    );
    return;
  }

  if (b <= 0.5 || h <= 0.5 || l <= 0.5) {
    toast.error("Length, height and width must be greater than 0.5 cms", {
      richColors: true,
    });
    return;
  }
  if (w <= 0) {
    toast.error("Weight must be greater than 0 kgs", { richColors: true });
    return;
  }
  emit("submit", { length: l, breadth: b, height: h, weight: w });
  closeDialog();
};

const closeDialog = () => {
  emit("close");
};
</script>
