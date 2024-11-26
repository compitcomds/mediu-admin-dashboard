<template>
  <AttachSidebar>
    <div class="flex justify-between gap-2 mb-6">
      <h1 class="text-3xl font-bold mb-4">Consultancy Services</h1>
      <nuxt-link
        to="/consultancy/services/create"
        class="bg-black flex items-center justify-center px-4 text-white rounded-lg"
      >
        <span>Create New Service</span>
      </nuxt-link>
    </div>

    <ConsultancyAllServices />
  </AttachSidebar>
</template>

<script setup lang="ts"></script>
