<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    rel="stylesheet"
  />

  <NuxtLoadingIndicator />
  <NuxtLayout>
    <AttachSidebar>
      <NuxtPage />
    </AttachSidebar>
  </NuxtLayout>
</template>

<script setup></script>

<style>
html,
body {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
  font-style: normal;
  background-color: white !important;
}
</style>
