<template>
  {{ options }}
  <br /><br />
  {{ variants }}

  <div>
    <label
      for="product-variants"
      class="block text-sm font-medium text-gray-700"
      >Variants
    </label>
  </div>
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
        <TableHead class="uppercase">Price</TableHead>
        <TableHead class="uppercase">Compare at price</TableHead>
        <TableHead class="uppercase">Quantity</TableHead>
        <TableHead class="uppercase">SKU</TableHead>
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

const { options } = defineProps<{
  options: Array<{ name: string; values: string[] }>;
}>();

const variants = ref(generateCombinations(options));

watch(
  () => options,
  () => {
    const newVariants = generateCombinations(options);
    variants.value = newVariants;
  },
  { deep: true, immediate: true }
);

function generateCombinations(
  options: Array<{ name: string; values: string[] }>
) {
  const result: Array<{ [key: string]: any }> = [];
  function combine(
    index: number,
    currentCombination: { [key: string]: string }
  ) {
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

function updateVariants(
  newOptions: Array<{ name: string; values: string[] }>,
  existingVariants: Array<any>
) {
  const newVariants = generateCombinations(newOptions);
  const updatedVariants: Array<any> = [];

  // Create a Map of existing variants keyed by their combination
  const existingMap = new Map(
    existingVariants.map((variant) => {
      const key = Object.keys(variant)
        .filter((k) => k.startsWith("option"))
        .sort()
        .join("-");
      return [key, variant];
    })
  );

  // Iterate over the new variants and either update or add them
  for (const newVariant of newVariants) {
    const key = Object.keys(newVariant)
      .filter((k) => k.startsWith("option"))
      .sort()
      .join("-");
    if (existingMap.has(key)) {
      // If this combination already exists, keep the previous values
      const existingVariant = existingMap.get(key);
      updatedVariants.push({
        ...newVariant,
        price: existingVariant?.price || 0,
        compare_at_price: existingVariant?.compare_at_price || 0,
        inventory_quantity: existingVariant?.inventory_quantity || 0,
        sku: existingVariant?.sku || "",
      });
      existingMap.delete(key); // Remove the combination from the map, as it has been processed
    } else {
      // Otherwise, it's a new combination
      updatedVariants.push(newVariant);
    }
  }

  // Any remaining combinations in existingMap should be removed
  for (const [key, existingVariant] of existingMap) {
    // These variants no longer exist, so you could remove them or do something else if needed
    // For now, we'll just leave them out
  }

  return updatedVariants;
}
</script>
