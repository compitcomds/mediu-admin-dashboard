<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="lg:w-[150px]">Consultancy</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Tags</TableHead>
        <TableHead>Edit</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="service in services">
        <TableCell>
          <nuxt-link :to="`/consultancy/services/s/${service.$id}`"
            ><img
              :src="
                service.image || `https://placehold.co/400x400?text=consultancy`
              "
              :alt="service.title"
          /></nuxt-link>
        </TableCell>
        <TableCell>{{ service.title }}</TableCell>
        <TableCell>{{ service.descriptionHtml }}</TableCell>
        <TableCell>{{ service.price }}</TableCell>
        <TableCell> {{ service.tags.join(",") }}</TableCell>
        <TableCell>
          <nuxt-link
            :to="`/consultancy/services/s/${service.$id}`"
            class="bg-black py-1 px-3 text-white rounded-lg"
            >Edit</nuxt-link
          >
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getConsultancyServices from "~/appwrite/consultancy/get-services";

const { total, documents: services } = await getConsultancyServices();
</script>
