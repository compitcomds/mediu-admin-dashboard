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
          v-model="form.productSubtitle"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
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
        ></textarea>
      </div>

      <div>
        <label for="images" class="block text-sm font-medium text-gray-700 mb-4"
          >Images <span class="text-red-500">*</span></label
        >
        <ProductNewImagePicker
          v-if="!productId"
          v-model:model-value="form.images"
        />
        <ProductImages
          v-else
          :images="form.images"
          v-model:removed-images="removedImages"
          v-model:added-images="addedImages"
        />
      </div>

      <div>
        <label for="title" class="block text-sm font-medium text-gray-700"
          >SKU <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="sku"
          v-model="form.sku"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          required
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
        />
      </div>

      <div>
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Price <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          id="price"
          v-model="form.price"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          placeholder="0"
          required
        />
      </div>

      <div>
        <label
          for="compareAtPrice"
          class="block text-sm font-medium text-gray-700"
          >Compare At Price</label
        >
        <input
          type="text"
          id="compareAtPrice"
          v-model="form.compareAtPrice"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          placeholder="0"
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
        />
      </div>

      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700"
          >Quantity <span class="text-red-500">*</span></label
        >
        <input
          type="number"
          id="quantity"
          v-model.number="form.quantity"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
          required
        />
      </div>

      <div>
        <ProductOptionInput
          :productId="productId"
          v-model:model-value="options"
        />
      </div>

      <div>
        <ProductVariantsInput
          :options="options"
          v-model:model-value="variants"
          :default-variants="variants"
        />
      </div>

      <!-- <div>
      <label for="allowBackOrder" class="flex items-center">
        <input
          type="checkbox"
          id="allowBackOrder"
          v-model="form.allowBackOrder"
          class="mr-2"
        />
        Allow Back Order
      </label>
    </div> -->

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
          v-model="form.manufacturer"
          class="mt-1 block w-full border border-gray-300 p-2 focus:border-[#28574e] focus:outline-none"
        />
      </div>
    </div>
    <div class="lg:w-1/3 space-y-4 rounded-xl max-h-fit">
      <div>
        <label for="collections" class="block text-sm font-medium text-gray-700"
          >Collections <span class="text-red-500">*</span></label
        >
        <ProductCollectionBox v-model:model-value="form.collections" />
      </div>
      <div>
        <label for="tags" class="block text-sm font-medium text-gray-700 mb-2"
          >Tags</label
        >
        <ProductTagInput v-model:model-value="form.tags" />
      </div>

      <div>
        <label
          for="concerns"
          class="block text-sm font-medium text-gray-700 mb-2"
          >Concerns</label
        >
        <ProductConcernInput v-model:model-value="form.tags" />
      </div>

      <div>
        <label
          for="ingredients"
          class="block text-sm font-medium text-gray-700 mb-2"
          >Ingredients</label
        >
        <ProductIngredientsInput v-model:model-value="form.tags" />
      </div>

      <div>
        <label
          for="is-prescription-required"
          class="block text-sm font-medium text-gray-700 mb-2"
          >Prescription Required</label
        >
        <Switch
          :checked="form.requiresPrescription"
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
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

const props = defineProps({
  onSubmit: {
    type: Function,
    default: () => {},
  },
  defaultValues: {
    type: Object,
    default: {},
  },
  productId: {
    type: String,
    default: null,
  },
});

const router = useRouter();

const isSubmitting = ref(false);
const isDeleting = ref(false);
const removedImages = ref([]);
const addedImages = ref([]);

const options = ref<Array<{ name: string; values: { name: string }[] }>>(
  props.defaultValues.options || [
    {
      name: "Pack Size",
      values: [{ name: "" }],
    },
  ]
);

const variants = ref<Array<{ [key: string]: string }>>(
  props.defaultValues.variants || []
);

const form = ref({
  title: props.defaultValues?.title || "",
  description: props.defaultValues?.description || "",
  images: props.defaultValues?.images || [],
  sku: props.defaultValues?.sku || "",
  collections: props.defaultValues?.collections || [],
  price:
    props.defaultValues?.price !== undefined ? props.defaultValues.price : "0",
  compareAtPrice: props.defaultValues?.compareAtPrice || "",
  gstApplied:
    props.defaultValues?.gstApplied !== undefined
      ? props.defaultValues.gstApplied
      : "",
  quantity:
    props.defaultValues?.quantity !== undefined
      ? props.defaultValues.quantity
      : 0,
  allowBackOrder: props.defaultValues?.allowBackOrder || false,
  tags: props.defaultValues?.tags || [],
  safetyInformationAndPrecaution:
    props.defaultValues?.safetyInformationAndPrecaution || "",
  howToUse: props.defaultValues?.howToUse || "",
  keyBenefits: props.defaultValues?.keyBenefits || "",
  manufacturer: props.defaultValues?.manufacturer || "",
  hsnCode: props.defaultValues?.hsnCode || "",
  requiresPrescription: props.defaultValues?.requiresPrescription || false,
  productSubtitle: props.defaultValues?.productSubtitle || "",
  status: props.defaultValues?.status || "active",
});

const toggleRequiresPrescription = () => {
  form.value.requiresPrescription = !form.value.requiresPrescription;
};

const deleteProduct = async () => {
  isDeleting.value = true;
  try {
    await axios.delete(`/api/product/${props.productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Product deleted successfully! Redirecting to products page...");
    router.push("/product");
  } catch (err: any) {
    alert(
      err.message ||
        "Unable to delete the product at the time. Please try again later."
    );
  } finally {
    isDeleting.value = false;
  }
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // Parse decimal values
    const images = [];

    // for new product only
    if (!props.productId) {
      for (const image of form.value.images) {
        images.push(await fileToBase64(image));
      }
    }

    const parsedData = {
      ...form.value,
      price: parseFloat(form.value.price),
      compareAtPrice: parseFloat(form.value.compareAtPrice),
      gstApplied: parseFloat(form.value.gstApplied),
      images,
      addedImages: addedImages.value,
      removedImages: removedImages.value,
      options: options.value,
      variants: variants.value,
    };

    if (
      Number.isNaN(parsedData.price) ||
      Number.isNaN(parsedData.compareAtPrice) ||
      Number.isNaN(parsedData.gstApplied)
    ) {
      throw new Error(
        "Invalid Input! Price, Compare at price and GST Applied must be decimal values."
      );
    }

    await props.onSubmit(parsedData);
  } catch (error: any) {
    console.log(error);
    alert(error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
