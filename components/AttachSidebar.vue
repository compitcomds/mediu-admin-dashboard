<template>
  <div class="flex min-h-screen">
    <Sidenav />
    <div class="lg:ml-64 flex-1 overflow-y-auto p-8 mt-10 bg-gray-100">
      <NavigationButton />

      <slot />
    </div>
  </div>
</template>

<script setup></script>
