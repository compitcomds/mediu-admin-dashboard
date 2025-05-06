<template>
  <div class="container mx-auto flex items-center justify-between px-4 py-4">
    <h1 class="text-xl font-bold">Product Section Manager</h1>
    <div class="flex items-center gap-x-4">
      <button
        @click="saveChanges"
        :disabled="isSaving"
        class="rounded-md bg-[#238878] px-4 py-2 font-medium text-white transition hover:bg-[#21413c] disabled:animate-pulse disabled:opacity-80"
      >
        <span v-if="!isSaving">Save Changes</span>
        <span v-else>Saving...</span>
      </button>
    </div>
  </div>

  <main class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <label class="mb-2 block font-medium text-gray-700">Select Section</label>
      <div class="mb-4 flex flex-wrap gap-3">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="selectedSection = section"
          class="rounded-md px-4 py-2"
          :class="
            selectedSection.id === section.id
              ? 'bg-[#238878] text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          "
        >
          {{ section.name }}
        </button>
      </div>
    </div>

    <div class="mb-6">
      <div class="border-b border-gray-200">
        <ul class="-mb-px flex flex-wrap">
          <li
            v-for="subcategory in selectedSection.subcategories"
            :key="subcategory.id"
            class="mr-2"
          >
            <button
              @click="selectedSubcategory = subcategory"
              class="inline-block border-b-2 px-4 py-2 text-sm font-medium"
              :class="
                selectedSubcategory.id === subcategory.id
                  ? 'border-[#238878] text-[#238878]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              "
            >
              {{ subcategory.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <EditHomeProductSelect
      :selected-section="selectedSection"
      :selected-subcategory="selectedSubcategory"
      :model-value="selectedProducts"
    />
  </main>
</template>

<script setup lang="ts">
import axios from "axios";
import { toast } from "vue-sonner";
import {
  type Section,
  type Subcategory,
  type Product,
} from "~/components/edit-home/types";

const sections: Section[] = [
  {
    id: 1,
    name: "Featured Products",
    subcategories: [
      { id: 1, name: "Hair", tag: "home-featured-product-hair" },
      { id: 2, name: "Skin", tag: "home-featured-product-skin" },
      { id: 3, name: "Baby Care", tag: "home-featured-product-baby" },
      {
        id: 101,
        name: "Featured Hair",
        tag: "featured-home-hair",
      },
      {
        id: 102,
        name: "Featured Skin",
        tag: "featured-home-skin",
      },
      {
        id: 103,
        name: "Featured Baby Care",
        tag: "featured-home-baby",
      },
    ],
  },
  {
    id: 2,
    name: "Radiant Skin Secrets",
    subcategories: [
      { id: 5, name: "Sunscreen", tag: "home-radiant-skin-sunscreen" },
      { id: 4, name: "Moisturizers", tag: "home-radiant-skin-moisturizer" },
      { id: 6, name: "Anti-Aging", tag: "home-radiant-skin-anti-aging" },
    ],
  },
  {
    id: 3,
    name: "Hair Care Must Haves",
    subcategories: [
      {
        id: 7,
        name: "Hair Serum",
        tag: "home-hair-care-must-haves-hair-serum",
      },
      {
        id: 8,
        name: "Shampoo & Conditioner",
        tag: "home-hair-care-must-haves-Shampoo-and-conditioner",
      },
      { id: 9, name: "Minoxidil", tag: "home-hair-care-must-haves-minoxidil" },
    ],
  },
];

const selectedSection = ref<Section>(sections[0]);
const selectedSubcategory = ref<Subcategory>(sections[0].subcategories[0]);

const selectedProducts = ref<Record<string, Product>>({});
const fetchedProducts = ref<Record<string, Product>>({});
const isSaving = ref(false);

const homePageTags = sections
  .map((sect) => sect.subcategories.map((subcat) => subcat.tag))
  .flat();

watch(selectedSection, (newSection) => {
  selectedSubcategory.value = newSection.subcategories[0];
});

const fetchSelectedProducts = async () => {
  try {
    const { data } = await axios.get(
      `/api/products/home?limit=100&query=${homePageTags.map((tag) => `(tag:${tag})`).join(" OR ")}`,
    );
    for (const product of data.products || []) {
      selectedProducts.value[product.id] = product;
      fetchedProducts.value[product.id] = cloneProduct(product);
    }
  } catch (e: any) {
    toast.error(e.message, { richColors: true });
  }
};

const saveChanges = async () => {
  isSaving.value = true;
  try {
    const products = Object.values(selectedProducts.value).flat();
    const promises: Promise<any>[] = [];
    for (const product of products) {
      const fetchedProductsValue = fetchedProducts.value;
      if (
        Object.keys(fetchedProductsValue).includes(product.id) &&
        haveSameElements(fetchedProductsValue[product.id].tags, product.tags)
      )
        continue;
      promises.push(
        axios.put(`/api/product/${product.id}/partial-update`, {
          tags: product.tags,
        }),
      );
      fetchedProducts.value[product.id] = cloneProduct(product);
      if (promises.length === 3) {
        await Promise.all(promises);
        promises.length = 0;
      }
    }
    if (promises.length > 0) await Promise.all(promises);
    toast.success(
      "Successfully updated the home page! Please wait 1-2 minutes for the changes to be reflected. ",
      { richColors: true },
    );
  } catch (error: any) {
    toast.error(error.message, { richColors: true });
  } finally {
    isSaving.value = false;
  }
};

function cloneProduct(product: Product) {
  return {
    ...product,
    tags: [...product.tags],
  } as Product;
}

function haveSameElements(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  if (set1.size !== set2.size) return false;

  return Array.from(set1).every((item) => set2.has(item));
}

onMounted(() => {
  fetchSelectedProducts();
});
</script>
