<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col flex-wrap gap-5 lg:flex-row"
  >
    <div class="flex-1 space-y-4">
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
          :disabled="!!disabledForm"
        />
      </div>

      <div>
        <label for="subtitle" class="block text-sm font-medium text-gray-700"
          >Subtitle <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="subtitle"
          v-model="form.productSubtitle"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          :disabled="!!disabledForm"
          required
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description <span class="text-red-500">*</span></label
        >
        <textarea
          id="description"
          v-model="form.description"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="6"
          required
          :disabled="!!disabledForm"
        ></textarea>
      </div>

      <div>
        <label for="images" class="mb-4 block text-sm font-medium text-gray-700"
          >Images <span class="text-red-500">*</span></label
        >
        <ProductNewImagePicker
          v-if="!productId"
          v-model:model-value="form.images"
          :disabled-form="disabledForm"
        />
        <ProductImages
          v-else
          :images="form.images"
          v-model:removed-images="removedImages"
          v-model:added-images="addedImages"
          :disabled-form="disabledForm"
        />
      </div>

      <div>
        <label for="gstApplied" class="block text-sm font-medium text-gray-700"
          >HSN Code <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="hsnCode"
          v-model="form.hsnCode"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          placeholder="0"
          required
          :disabled="!!disabledForm"
        />
      </div>

      <div>
        <ProductOptionInput
          :productId="productId"
          v-model:model-value="options"
          :disabled-form="disabledForm"
        />
      </div>

      <div :class="{ hidden: variants.length <= 1 }">
        <ProductVariantsInput
          :options="options"
          v-model:model-value="variants"
          :default-variants="variants"
          :disabled-form="disabledForm"
        />
      </div>

      <div v-if="variants.length === 1">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >SKU <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="sku"
          v-model="variants[0].sku"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          required
          :disabled="!!disabledForm"
        />
      </div>

      <div v-if="variants.length === 1">
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Price <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="price"
          v-model="variants[0].price"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          placeholder="0"
          required
          :disabled="!!disabledForm"
        />
      </div>

      <div v-if="variants.length === 1">
        <label
          for="compareAtPrice"
          class="block text-sm font-medium text-gray-700"
          >Compare At Price</label
        >
        <input
          type="text"
          id="compareAtPrice"
          v-model="variants[0].compareAtPrice"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          placeholder="0"
          :disabled="!!disabledForm"
        />
      </div>

      <div>
        <label for="gstApplied" class="block text-sm font-medium text-gray-700"
          >GST Applied <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="gstApplied"
          v-model="form.gstApplied"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          placeholder="0"
          required
          :disabled="!!disabledForm"
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
          v-model="form.safetyInformationAndPrecaution"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="3"
          :disabled="!!disabledForm"
        ></textarea>
      </div>

      <div>
        <label for="howToUse" class="block text-sm font-medium text-gray-700"
          >How to Use</label
        >
        <textarea
          id="howToUse"
          v-model="form.howToUse"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="3"
          :disabled="!!disabledForm"
        ></textarea>
      </div>

      <div>
        <label for="keyBenefits" class="block text-sm font-medium text-gray-700"
          >Key Benefits</label
        >
        <textarea
          id="keyBenefits"
          v-model="form.keyBenefits"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          rows="3"
          :disabled="!!disabledForm"
        ></textarea>
      </div>
    </div>
    <div class="max-h-fit space-y-4 rounded-xl lg:w-1/3">
      <div>
        <ProductCollectionBox
          :fetched-collections="fetchedCollections.collections"
          v-model:model-value="form.collections"
          :disabled-form="!!disabledForm"
        />
      </div>
      <div>
        <ProductBrands
          :fetched-collections="fetchedCollections.collections"
          v-model:model-value="form.collections"
          :disabled-form="!!disabledForm"
        />
      </div>
      <div>
        <label for="tags" class="mb-2 block text-sm font-medium text-gray-700"
          >Tags</label
        >
        <ProductTagInput
          v-model:model-value="form.tags"
          :disabled-form="!!disabledForm"
        />
      </div>

      <div>
        <label
          for="concerns"
          class="mb-2 block text-sm font-medium text-gray-700"
          >Concerns</label
        >
        <ProductConcernInput
          v-model:model-value="form.tags"
          :disabled-form="!!disabledForm"
        />
      </div>

      <div>
        <label
          for="ingredients"
          class="mb-2 block text-sm font-medium text-gray-700"
          >Ingredients</label
        >
        <ProductIngredientsInput
          v-model:model-value="form.tags"
          :disabled-form="!!disabledForm"
        />
      </div>

      <div>
        <label
          for="is-prescription-required"
          class="mb-2 block text-sm font-medium text-gray-700"
          >Prescription Required</label
        >
        <Switch
          :checked="form.requiresPrescription"
          @update:checked="toggleRequiresPrescription"
          :disabled="!!disabledForm"
        />
      </div>

      <div>
        <p class="mb-2 block text-sm font-medium text-gray-700">
          Product Status
        </p>

        <Select v-model:model-value="form.status">
          <SelectTrigger
            :disabled="!!disabledForm"
            class="bg-white py-1 font-medium"
          >
            <SelectValue placeholder="Select product status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="flex flex-col gap-4">
        <button
          v-if="!!props.onSubmit"
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-[#28574e] px-4 py-2 font-semibold text-white hover:bg-[#1f4d42] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span
            v-if="isSubmitting"
            class="flex items-center justify-center gap-1"
            >Submitting <Loader
          /></span>
          <span v-else>Submit</span>
        </button>
        <nuxt-link
          v-if="props.defaultValues?.status === 'active' && !!props.handle"
          :to="`https://mediu.in/shop/product/${props.handle}`"
          target="_blank"
          class="flex w-full items-center justify-center border border-[#28574e] px-4 py-2 font-semibold hover:bg-[#1f4d42] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          View Live
        </nuxt-link>
        <ProductDeleteButton
          v-if="!!props.productId && !!props.onSubmit"
          :product-id="props.productId"
        />

        <ProductEditFormQuickLinks v-if="props.productId" :title="form.title" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "vue-sonner";

const props = defineProps<{
  onSubmit?: (values: any) => Promise<void>;
  defaultValues?: any;
  productId?: string;
  handle?: string | null;
  disabledForm?: boolean;
}>();

const isSubmitting = ref(false);
const removedImages = ref([]);
const addedImages = ref([]);

const { data: fetchedCollections } = await axios.get("/api/collections/all");

const options = ref<Array<{ name: string; values: { name: string }[] }>>([
  {
    name: "Pack Size",
    values: [{ name: "" }],
  },
]);

if (
  props.defaultValues?.options &&
  !(
    props.defaultValues.options.length === 1 &&
    props.defaultValues.options[0].name.includes("Title")
  )
) {
  options.value = props.defaultValues.options;
}

const variants = ref<Array<{ [key: string]: string }>>(
  props.defaultValues?.variants || [],
);

const form = ref({
  title: props.defaultValues?.title || "",
  description: props.defaultValues?.description || "",
  images: props.defaultValues?.images || [],
  collections: props.defaultValues?.collections || [],
  gstApplied:
    props.defaultValues?.gstApplied !== undefined
      ? props.defaultValues.gstApplied
      : "",
  allowBackOrder: props.defaultValues?.allowBackOrder || false,
  tags: props.defaultValues?.tags || [],
  safetyInformationAndPrecaution:
    props.defaultValues?.safetyInformationAndPrecaution || "",
  howToUse: props.defaultValues?.howToUse || "",
  keyBenefits: props.defaultValues?.keyBenefits || "",
  hsnCode: props.defaultValues?.hsnCode || "",
  requiresPrescription: props.defaultValues?.requiresPrescription || false,
  productSubtitle: props.defaultValues?.productSubtitle || "",
  status: props.defaultValues?.status || "active",
});

const toggleRequiresPrescription = () => {
  form.value.requiresPrescription = !form.value.requiresPrescription;
};

const handleSubmit = async () => {
  if (!props.onSubmit) return;
  isSubmitting.value = true;
  try {
    const images = [];

    if (!props.productId) {
      for (const image of form.value.images) {
        images.push(await fileToBase64(image));
      }
    }

    const parsedData = {
      ...form.value,
      gstApplied: parseFloat(form.value.gstApplied),
      images,
      addedImages: addedImages.value,
      removedImages: removedImages.value,
      options: options.value,
      variants: variants.value,
      collections: fetchedCollections.collections
        .filter((collection: any) =>
          form.value.collections.includes(collection.handle),
        )
        .map((collection: any) => collection.id),
    };

    if (Number.isNaN(parsedData.gstApplied)) {
      throw new Error(
        "Invalid Input! Price, Compare at price and GST Applied must be decimal values.",
      );
    }

    await props.onSubmit(parsedData);
  } catch (error: any) {
    console.log(error);
    toast.error(error.message, { richColors: true });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped></style>
