<template>
  <div class="">
    <h2 class="text-xl font-semibold mb-4">Enter Dimensions and Weight</h2>
    <div>
      <div class="mb-4">
        <label for="length" class="block text-sm font-medium text-gray-700"
          >Length (cm):</label
        >
        <input
          v-model.number="form.length"
          type="text"
          id="length"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div class="mb-4">
        <label for="breadth" class="block text-sm font-medium text-gray-700"
          >Breadth (cm):</label
        >
        <input
          v-model.number="form.breadth"
          type="text"
          id="breadth"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div class="mb-4">
        <label for="height" class="block text-sm font-medium text-gray-700"
          >Height (cm):</label
        >
        <input
          v-model.number="form.height"
          type="text"
          id="height"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div class="mb-4">
        <label for="weight" class="block text-sm font-medium text-gray-700"
          >Weight (kg):</label
        >
        <input
          v-model.number="form.weight"
          type="text"
          id="weight"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = defineModel<{
  length: number;
  breadth: number;
  height: number;
  weight: number;
}>("dimensions", {
  default: {
    breadth: 0,
    length: 0,
    weight: 0,
    height: 0,
  },
});
</script>
