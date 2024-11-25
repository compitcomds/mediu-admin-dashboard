<template>
  <!-- {{ data }} -->
  <TableRow>
    <TableCell>
      <nuxt-link :to="`/product/edit/${product.id}`">
        <img
          :src="
            product.image?.src ||
            `https://placehold.co/400x400?text=${product.title}`
          "
          :alt="product.title"
        />
      </nuxt-link>
    </TableCell>
    <TableCell class="font-medium">
      <nuxt-link :to="`/product/edit/${product.id}`"
        >{{ productId }}
      </nuxt-link></TableCell
    >
    <TableCell
      ><nuxt-link :to="`/product/edit/${product.id}`">{{
        product.title
      }}</nuxt-link></TableCell
    >
    <TableCell>{{ documents.length }} </TableCell>
    <TableCell>
      <AlertPeople
        :documents="documents"
        :product-title="product.title"
        :product-id="productId"
      />
    </TableCell>
  </TableRow>
</template>

<script setup lang="ts">
import axios from "axios";
import { TableCell, TableRow } from "@/components/ui/table";
const { productId, documents } = defineProps<{
  documents: any[];
  productId: string;
}>();

const { data } = await axios.get(`/api/product/${productId}`);
const product = data.product;
console.log(product);
</script>
