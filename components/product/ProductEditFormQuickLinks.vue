<template>
  <div class="mt-4">
    <h3 class="mb-2 flex items-center gap-2"><Link :size="13" />Quick Links</h3>
    <ul class="list-disc px-2 pl-6 text-sm">
      <li>
        <nuxt-link
          :to="`/inventory?query=${encodeURIComponent(props.title)}`"
          class="flex cursor-pointer items-center gap-2 hover:text-[#185c50] hover:underline"
          target="_blank"
          >Update Product Inventory <SquareArrowOutUpRightIcon :size="10"
        /></nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="`/collections`"
          class="flex cursor-pointer items-center gap-2 hover:text-[#185c50] hover:underline"
          target="_blank"
          >Create Collection/Brand<SquareArrowOutUpRightIcon :size="10"
        /></nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="`/guide`"
          class="flex cursor-pointer items-center gap-2 hover:text-[#185c50] hover:underline"
          target="_blank"
          >Help Guide <SquareArrowOutUpRightIcon :size="10"
        /></nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Link, SquareArrowOutUpRightIcon } from "lucide-vue-next";

const props = defineProps<{ title: string }>();
</script>
