<template>
  <div class="container mx-auto flex items-center justify-between px-4 py-4">
    <h1 class="text-xl font-bold">Product Section Manager</h1>
    <div class="flex items-center gap-x-4">
      <button
        @click="saveChanges"
        class="rounded-md bg-[#238878] px-4 py-2 font-medium text-white transition hover:bg-[#21413c]"
      >
        Save Changes
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

    <!-- Subcategory Tabs -->
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
      :available-tags="homePageTags"
      :model-value="selectedProducts"
    />
  </main>
</template>

<script setup lang="ts">
import axios from "axios";
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
      { id: 1, name: "Hair", tag: "featured-product-hair" },
      { id: 2, name: "Skin", tag: "featured-product-skin" },
      { id: 3, name: "Baby Care", tag: "featured-product-baby" },
    ],
  },
  {
    id: 2,
    name: "Radiant Skin Secrets",
    subcategories: [
      { id: 4, name: "Moisturizers", tag: "radiant-skin-moisturizer" },
      { id: 5, name: "Sunscreen", tag: "radiant-skin-sunscreen" },
      { id: 6, name: "Anti-Aging", tag: "radiant-skin-anti-aging" },
    ],
  },
  {
    id: 3,
    name: "Hair Care Must Haves",
    subcategories: [
      { id: 7, name: "Shampoo", tag: "hair-care-shampoo" },
      { id: 8, name: "Conditioner", tag: "hair-care-conditioner" },
      { id: 9, name: "Treatments", tag: "hair-care-treatment" },
      { id: 10, name: "Styling", tag: "hair-care-styling" },
    ],
  },
  {
    id: 4,
    name: "Baby Care Essentials",
    subcategories: [
      { id: 11, name: "Bath", tag: "baby-care-bath" },
      { id: 12, name: "Essentials", tag: "baby-care-essentials" },
    ],
  },
];

const selectedSection = ref<Section>(sections[0]);
const selectedSubcategory = ref<Subcategory>(sections[0].subcategories[0]);

const selectedProducts = ref<Product[]>([]);
const isSaving = ref(false);

const homePageTags = sections
  .map((sect) => sect.subcategories.map((subcat) => subcat.tag))
  .flat();

watch(selectedSection, (newSection) => {
  selectedSubcategory.value = newSection.subcategories[0];
});

const fetchByTag = async (tag: string) => {};

const fetchSelectedProducts = async () => {
  try {
    const { data } = await axios.get(
      `/api/products/home?limit=100&query=${homePageTags.map((tag) => `(tag:${tag})`).join(" OR ")}`,
    );
    selectedProducts.value = data.products || [];
  } catch (e: any) {
    alert(e.message);
  }
};

const saveChanges = async () => {
  isSaving.value = true;
  try {
    const products = Object.values(selectedProducts.value).flat();
    const promises: Promise<any>[] = [];
    for (const product of products) {
      promises.push(
        axios.put(`/api/product/${product.id}/partial-update`, {
          tags: product.tags,
        }),
      );
      if (promises.length === 5) {
        await Promise.all(promises);
        promises.length = 0;
      }
    }
    if (promises.length > 0) await Promise.all(promises);
    alert("Successfully updated the home page!");
  } catch (error: any) {
    alert(error.message);
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchSelectedProducts();
});
</script>
