<template>
  <Select v-model="model" v-if="!!categories" required :disabled="!!disabled">
    <SelectTrigger
      class="w-full rounded-md border-2 border-gray-300 bg-transparent px-4 py-2"
    >
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="category in categories" :value="category.id">{{
          category.title
        }}</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

defineProps<{ disabled?: boolean }>();

const { data: categories } = await useLazyFetch("/api/articles/categories");

const model = defineModel({ default: "" });
</script>
