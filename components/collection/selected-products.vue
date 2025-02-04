<template>
  <Collapsible v-model:open="isOpen" class="flex flex-col gap-y-2">
    <CollapsibleTrigger>
      <h4 class="flex items-center gap-2 py-2 text-xs hover:bg-white/40">
        Selected Products: {{ model?.length || 0 }}
        <ChevronsUpDown class="h-4 w-4" />
      </h4>
    </CollapsibleTrigger>
    <CollapsibleContent class="flex flex-col gap-y-2">
      <template v-for="product in model" :key="product.product_id">
        <div
          class="flex items-center rounded-lg border border-gray-200 p-3 transition duration-150 ease-in-out hover:bg-gray-50"
        >
          <input
            type="checkbox"
            :disabled="!!props.hideAllProductsList || !!props.disabledForm"
            :value="{ product_id: product.product_id, title: product.title }"
            v-model="model"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
          />
          <span class="ml-3 text-gray-700">{{ product.title }}</span>
        </div>
      </template>
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
import { ChevronsUpDown } from "lucide-vue-next";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const isOpen = ref(true);
const props = defineProps<{
  hideAllProductsList?: boolean;
  disabledForm?: boolean;
}>();
const model = defineModel<any[]>("products");
</script>
