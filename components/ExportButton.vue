<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const props = defineProps<{
  title?: string;
  class?: string;
  api: string;
}>();

const isLoading = ref(false);
const progress = ref(0);
const totalItems = 42;

const handleExport = () => {
  isLoading.value = true;
  progress.value = 0;

  // Simulate progress - replace with actual export logic
  const interval = setInterval(() => {
    progress.value += 5;
    if (progress.value >= 100) {
      clearInterval(interval);
      isLoading.value = false;
      progress.value = 0;
    }
  }, 100);
};
</script>

<template>
  <Dialog>
    <DialogTrigger :class="props.class"> <slot>Export</slot> </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title || "Export" }}</DialogTitle>
        <DialogDescription class="sr-only">
          Export the data into a CSV file.
        </DialogDescription>
      </DialogHeader>

      <button
        @click="handleExport"
        class="relative mx-auto mt-4 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-primary text-sm text-primary-foreground hover:bg-primary/90"
      >
        <span>Export</span>
        <span class="text-[9px]">{{ totalItems }} items</span>
        <div v-if="isLoading" class="absolute inset-0">
          <svg class="h-full w-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke-width="4"
              fill="none"
              class="origin-center stroke-white/30"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke-width="4"
              fill="none"
              class="origin-center stroke-white transition-all duration-200"
              :style="{
                strokeDasharray: `${2 * Math.PI * 36}`,
                strokeDashoffset: `${2 * Math.PI * 36 * (1 - progress / 100)}`,
              }"
            />
          </svg>
        </div>
      </button>
    </DialogContent>
  </Dialog>
</template>
