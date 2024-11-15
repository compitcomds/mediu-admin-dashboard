<template>
  <div>
    <label
      for="product-variants"
      class="block text-sm font-medium text-gray-700"
      >Variants
    </label>
  </div>
  <!-- <Table>
    <TableHeader>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead
          class="uppercase"
          v-for="option in options"
          :key="option.name"
          >{{ option.name }}</TableHead
        >
        <TableHead class="uppercase"
          >Price <span class="text-red-500">*</span>
        </TableHead>
        <TableHead class="uppercase"
          >Compare at price (MRP) <span class="text-red-500">*</span></TableHead
        >
        <TableHead class="uppercase"
          >Quantity <span class="text-red-500">*</span></TableHead
        >
        <TableHead class="uppercase"
          >SKU <span class="text-red-500">*</span></TableHead
        >
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(variant, index) in variants">
        <TableCell>{{ index + 1 }}</TableCell>
        <TableCell v-for="(_, index) in options">{{
          variant[`option${index + 1}`]
        }}</TableCell>
        <TableCell>
          <input
            type="number"
            v-model="variant.price"
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
            placeholder="0"
            required
          />
        </TableCell>
        <TableCell>
          <input
            type="number"
            v-model="variant.compare_at_price"
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
            placeholder="0"
            required
          />
        </TableCell>
        <TableCell>
          <input
            type="number"
            v-model="variant.inventory_quantity"
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
            placeholder="0"
            required
          />
        </TableCell>
        <TableCell>
          <input
            type="text"
            v-model="variant.sku"
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
            placeholder="0"
            required
          />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table> -->
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const { options } = defineProps<{
  options: Array<{ name: string; values: string[] }>;
  modelValue: Array<{ [key: string]: string }>;
  defaultPrice?: string | number;
}>();
const emit = defineEmits(["update:modelValue"]);

const variants = ref<Array<{ [key: string]: string }>>([]);

watch(
  () => variants.value,
  (newVariants) => {
    emit("update:modelValue", newVariants);
  },
  { deep: true, immediate: true }
);

watch(
  () => options,
  () => {
    const newVariants = generateCombinations(options);
    let i;
    for (i = 0; i < newVariants.length; i++) {
      if (i >= variants.value.length) {
        variants.value.push(newVariants[i]);
        continue;
      }
      variants.value[i] = {
        ...newVariants[i],
        price: variants.value[i].price,
        compare_at_price: variants.value[i].compare_at_price,
        inventory_quantity: variants.value[i].inventory_quantity,
        sku: variants.value[i].sku,
      };
    }

    if (newVariants.length < variants.value.length) {
      variants.value.splice(newVariants.length);
    }
  },
  { deep: true, immediate: true }
);

function generateCombinations(
  options: Array<{ name: string; values: string[] }>
) {
  const result: Array<{ [key: string]: any }> = [];
  function combine(index: number, currentCombination: { [key: string]: any }) {
    if (index === options.length) {
      result.push({
        ...currentCombination,
        price: 0,
        compare_at_price: 0,
        inventory_quantity: 0,
        sku: "",
      });

      return;
    }
    const currentOption = options[index];
    const optionKey = `option${index + 1}`;
    for (const value of currentOption.values) {
      const newCombination = { ...currentCombination, [optionKey]: value };
      combine(index + 1, newCombination);
    }
  }
  combine(0, {});
  return result;
}
</script>
