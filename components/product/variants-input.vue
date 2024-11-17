<template>
  <h3 class="block mb-3 text-sm font-medium text-gray-700">Variants</h3>
  <Table>
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
        <!-- <TableHead class="uppercase"
          >Quantity <span class="text-red-500">*</span></TableHead
        > -->
        <TableHead class="uppercase"
          >SKU <span class="text-red-500">*</span></TableHead
        >
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(variant, index) in variants">
        <TableCell>{{ index + 1 }}</TableCell>
        <TableCell v-for="(option, i) in options"
          >{{ variant.optionValues[i].name }}
        </TableCell>
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
            v-model="variant.compareAtPrice"
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
            placeholder="0"
            required
          />
        </TableCell>
        <!-- <TableCell>
          <input
            type="number"
            v-model="variant.inventory_quantity"
            class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
            placeholder="0"
            required
          />
        </TableCell> -->
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
  </Table>
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

const { options, defaultVariants } = defineProps<{
  options: Array<{ name: string; values: { name: string }[] }>;
  modelValue: Array<{ [key: string]: string }>;
  defaultPrice?: string | number;
  defaultVariants: any[];
}>();
const emit = defineEmits(["update:modelValue"]);

const variants = ref<
  Array<{
    price: string;
    compareAtPrice: string;
    sku: string;
    optionValues: Array<{
      name: string;
      optionName: string;
    }>;
  }>
>(defaultVariants || []);

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
        compareAtPrice: variants.value[i].compareAtPrice,
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
  options: Array<{ name: string; values: { name: string }[] }>
) {
  const result: Array<{
    price: string;
    compareAtPrice: string;
    sku: string;
    optionValues: Array<{ name: string; optionName: string }>;
  }> = [];

  function combine(
    index: number,
    currentCombination: Array<{ name: string; optionName: string }>
  ) {
    if (index === options.length) {
      // Push the combination with price, compareAtPrice, and sku as strings
      result.push({
        price: "",
        compareAtPrice: "",
        sku: "",
        optionValues: currentCombination,
      });
      return;
    }

    const currentOption = options[index];
    for (const value of currentOption.values) {
      // Create a new combination object with the current option's value
      const newCombination = [
        ...currentCombination,
        { name: value.name, optionName: currentOption.name },
      ];
      combine(index + 1, newCombination);
    }
  }

  // Start the recursive combination process
  combine(0, []);

  return result;
}
</script>
