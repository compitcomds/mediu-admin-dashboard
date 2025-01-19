<template>
  <div class="flex min-h-screen">
    <Sidenav />
    <div
      class="mt-10 flex-1 overflow-y-auto bg-gray-100 px-2 py-8 sm:px-8 lg:ml-64"
    >
      <NavigationButton />
      <slot />
    </div>
  </div>
</template>

<script setup></script>
