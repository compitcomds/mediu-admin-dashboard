<template>
  <div class="flex items-center justify-between space-x-4 my-4">
    <!-- Back Button -->
    <button
      @click="goBack"
      type="button"
      class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center hover:bg-gray-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-5 h-5 mr-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>

    <!-- Forward Button -->
    <button
      type="button"
      @click="goForward"
      class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center hover:bg-gray-300"
    >
      Forward
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-5 h-5 ml-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
  },
};
</script>

<style scoped>
/* Custom styles for the component if needed */
</style>
