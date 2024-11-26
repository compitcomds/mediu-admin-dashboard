<template>
  <AttachSidebar>
    <div class="flex justify-between gap-2">
      <h1 class="text-3xl font-bold mb-4">Consultancy Services</h1>
      <nuxt-link
        to="/consultancy/services/create"
        class="bg-black flex items-center justify-center px-6 py-1 text-white text-lg rounded-lg"
      >
        <span>Create New Service</span>
      </nuxt-link>
    </div>
  </AttachSidebar>
</template>

<script setup lang="ts"></script>
