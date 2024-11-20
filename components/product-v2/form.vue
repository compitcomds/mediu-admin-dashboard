<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col lg:flex-row gap-5 flex-wrap"
  >
    <div class="space-y-4 flex-1">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Title <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="title"
          v-model="form.title"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          required
        />
      </div>

      <div>
        <label for="subtitle" class="block text-sm font-medium text-gray-700"
          >Subtitle</label
        >
        <input
          type="text"
          id="subtitle"
          v-model="form.metafields.productSubtitle"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description <span class="text-red-500">*</span></label
        >
        <textarea
          id="description"
          v-model="form.descriptionHtml"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="6"
          required
        ></textarea>
      </div>

      <div>
        <label for="gstApplied" class="block text-sm font-medium text-gray-700"
          >GST Applied <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="manufacturer"
          v-model.number="form.metafields.gstApplied"
          required
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        />
      </div>

      <div>
        <label
          for="safetyInformationAndPrecaution"
          class="block text-sm font-medium text-gray-700"
          >Safety Information and Precautions</label
        >
        <textarea
          id="safetyInformationAndPrecaution"
          v-model="form.metafields.safetyInformationAndPrecaution"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="3"
        ></textarea>
      </div>

      <div>
        <label for="howToUse" class="block text-sm font-medium text-gray-700"
          >How to Use</label
        >
        <textarea
          id="howToUse"
          v-model="form.metafields.howToUse"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="3"
        ></textarea>
      </div>

      <div>
        <label for="keyBenefits" class="block text-sm font-medium text-gray-700"
          >Key Benefits</label
        >
        <textarea
          id="keyBenefits"
          v-model="form.metafields.keyBenefits"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="3"
        ></textarea>
      </div>

      <div>
        <label
          for="manufacturer"
          class="block text-sm font-medium text-gray-700"
          >Brands</label
        >
        <input
          type="text"
          id="manufacturer"
          v-model="form.metafields.manufacturer"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        />
      </div>
    </div>
    <div class="lg:w-1/3 space-y-4 rounded-xl max-h-fit">
      <div>
        <label
          for="is-prescription-required"
          class="block text-sm font-medium text-gray-700 mb-2"
          >Prescription Required</label
        >
        <Switch
          :checked="form.metafields.requiresPrescription"
          @update:checked="toggleRequiresPrescription"
        />
      </div>

      <div>
        <p class="block text-sm font-medium text-gray-700 mb-2">
          Product Status
        </p>
        <Select v-model:model-value="form.status">
          <SelectTrigger class="bg-white font-medium py-1">
            <SelectValue placeholder="Select product status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="flex flex-col gap-4">
        <button
          type="submit"
          :disabled="isSubmitting || isDeleting"
          class="w-full py-2 px-4 bg-[#28574e] text-white font-semibold hover:bg-[#1f4d42] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span
            v-if="isSubmitting"
            class="flex items-center justify-center gap-1"
            >Submitting <Loader
          /></span>
          <span v-else>Submit</span>
        </button>
        <button
          v-if="!!props.productId"
          type="button"
          :disabled="isDeleting || isSubmitting"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full disabled:cursor-not-allowed disabled:opacity-70"
          @click="deleteProduct"
        >
          <span v-if="isDeleting" class="flex items-center justify-center gap-1"
            >Deleting... <Loader
          /></span>
          <span v-else>Delete Product</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const props = defineProps();

const isSubmitting = ref(false);
const isDeleting = ref(false);

const form = ref({
  title: "",
  descriptionHtml: "",
  metafields: {
    productSubtitle: "",
    gstApplied: "",
    safetyInformationAndPrecaution: "",
    howToUse: "",
    keyBenefits: "",
    manufacturer: "",
    requiresPrescription: false,
  },
  productOptions: [{ name: "Pack Size", values: [{ name: "" }] }],
  variants: [
    {
      price: "",
      compareAtPrice: "",
      sku: "",
      optionValues: [],
    },
  ],
  collections: [],
  tags: [],
  status: "ACTIVE",
});

const images = ref([]);
const removedImages = ref([]);
const addedImages = ref([]);

const handleSubmit = async () => {};
</script>
