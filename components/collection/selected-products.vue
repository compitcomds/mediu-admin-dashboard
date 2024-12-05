<template>
  <Collapsible v-model:open="isOpen" class="flex flex-col gap-y-2">
    <CollapsibleTrigger>
      <h4 class="text-xs hover:bg-white/40 py-2 flex items-center gap-2">
        Selected Products: {{ model?.length || 0 }}
        <ChevronsUpDown class="h-4 w-4" />
      </h4>
    </CollapsibleTrigger>
    <CollapsibleContent class="flex flex-col gap-y-2">
      <template v-for="product in model" :key="product.product_id">
        <div
          class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out"
        >
          <input
            type="checkbox"
            :disabled="!!props.hideAllProductsList"
            :value="{ product_id: product.product_id, title: product.title }"
            v-model="model"
            class="w-4 h-4 text-blue-600 disabled:cursor-not-allowed border-gray-300 rounded focus:ring-blue-500"
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
}>();
const model = defineModel<any[]>("products");
</script>
