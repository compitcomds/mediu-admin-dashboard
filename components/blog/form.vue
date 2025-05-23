<template>
  <form @submit.prevent="saveForm">
    <h2 class="mb-6 text-2xl font-bold text-gray-800">
      {{ title || "Create New Content" }}
    </h2>
    <div class="grid gap-6 md:grid-cols-6 md:flex-row">
      <div class="flex-1 space-y-4 md:col-span-4">
        <div>
          <label
            for="title"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Title <span class="text-red-500">*</span></label
          >
          <input
            v-model.trim="formData.title"
            type="text"
            id="title"
            class="w-full rounded-md border-2 bg-transparent px-4 py-2"
            placeholder="Enter title"
            required
            :disabled="!!isDisabled"
          />
        </div>

        <!-- Handle -->
        <div>
          <label
            for="handle"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Handle
            <span class="text-xs text-gray-500"
              >(example: /my-awesome-article)</span
            ><span class="text-red-500">*</span></label
          >

          <input
            v-model.trim="formData.handle"
            type="text"
            id="handle"
            class="w-full rounded-md border-2 bg-transparent px-4 py-2"
            placeholder="Enter handle"
            :disabled="!!isDisabled"
            required
          />
        </div>

        <!-- Summary -->
        <div>
          <label
            for="summary"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Summary
          </label>
          <textarea
            v-model.trim="formData.summary"
            id="summary"
            rows="3"
            class="w-full rounded-md border-2 bg-transparent px-4 py-2"
            :disabled="isDisabled"
            placeholder="Enter summary"
          ></textarea>
        </div>

        <!-- Body -->
        <div>
          <label for="body" class="mb-1 block text-sm font-medium text-gray-700"
            >Body
          </label>
          <ClientOnly>
            <TiptapEditor
              v-model="formData.body"
              id="body"
              :disabled="!!isDisabled"
            />
          </ClientOnly>
        </div>
      </div>

      <div class="flex-1 space-y-4 md:col-span-2">
        <div>
          <label for="image" class="block"
            >Featured Image <span class="text-red-500">*</span></label
          >
          <div v-if="formData.image" class="relative mb-4">
            <img :src="formData.image.url" />
            <button
              class="absolute right-2 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-300"
              @click="removeFeaturedImage"
              :disabled="!!isDisabled"
            >
              <X />
            </button>
          </div>
          <MediaUpload
            v-else
            :limit="1"
            @upload-success="updateFeaturedImage"
            :disabled="!!isDisabled"
          />
        </div>
        <div>
          <label class="flex cursor-pointer items-center space-x-2">
            <span class="text-sm font-medium text-gray-700">Publish</span>
          </label>
          <Switch
            :checked="formData.isPublished"
            @update:checked="togglePublish"
            :disabled="!!isDisabled"
          />
        </div>

        <!-- Publish Date -->
        <div v-if="!formData.isPublished">
          <label
            for="publishDate"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Set Publish Date</label
          >
          <input
            v-model="formData.publishDate"
            type="datetime-local"
            id="publishDate"
            :disabled="isDisabled"
            class="w-full rounded-md border-2 border-gray-300 bg-transparent px-4 py-2"
          />
        </div>

        <div>
          <label for="tags" class="mb-1 block text-sm font-medium text-gray-700"
            >Tags</label
          >
          <div class="mb-2 flex flex-wrap gap-2">
            <button
              v-for="(tag, index) in formData.tags"
              :key="index"
              type="button"
              @click.prevent="removeTag(index)"
              class="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200"
              :disabled="!!isDisabled"
            >
              {{ tag }}
              <X :size="15" class="hover:text-red-500" />
            </button>
          </div>
          <div class="flex">
            <input
              v-model="newTag"
              type="text"
              class="flex-1 rounded-l-md border-2 border-gray-300 bg-transparent px-4 py-2"
              placeholder="Add a tag"
              @keydown.enter.prevent="addTag"
              :disabled="!!isDisabled"
            />
            <button
              @click.prevent="addTag"
              type="button"
              class="rounded-r-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
              :disabled="!!isDisabled"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label
            for="category"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Category <span class="text-red-500">*</span></label
          >
          <BlogCategoryInput
            v-model="formData.blogId"
            :disabled="!!isDisabled"
          />
        </div>

        <div>
          <label
            for="authorName"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Author Name <span class="text-red-500">*</span></label
          >
          <input
            v-model.trim="formData.author.name"
            type="text"
            id="authorName"
            class="w-full rounded-md border-2 border-gray-300 bg-transparent px-4 py-2"
            placeholder="Enter author name"
            :disabled="!!isDisabled"
            required
          />
        </div>

        <div>
          <label
            for="metaTitle"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Meta Title <span class="text-red-500">*</span></label
          >
          <input
            v-model.trim="formData.metafields.metaTitle"
            type="text"
            id="metaTitle"
            class="w-full rounded-md border-2 border-gray-300 bg-transparent px-4 py-2"
            placeholder="Enter meta title"
            :disabled="!!isDisabled"
            required
          />
        </div>

        <div>
          <label
            for="metaDescription"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Meta Description <span class="text-red-500">*</span></label
          >
          <input
            v-model.trim="formData.metafields.metaDescription"
            type="text"
            id="metaDescription"
            class="w-full rounded-md border-2 border-gray-300 bg-transparent px-4 py-2"
            placeholder="Enter meta description"
            :disabled="!!isDisabled"
            required
          />
        </div>

        <div>
          <label
            for="metaKeywords"
            class="mb-1 block text-sm font-medium text-gray-700"
            >Meta Keywords <span class="text-red-500">*</span></label
          >
          <input
            v-model.trim="formData.metafields.metaKeywords"
            type="text"
            id="metaKeywords"
            class="w-full rounded-md border-2 border-gray-300 bg-transparent px-4 py-2"
            placeholder="keyword1, keyword2..."
            :disabled="!!isDisabled"
            required
          />
        </div>

        <!-- Save Button -->
        <div class="mt-6">
          <button
            v-if="!isDisabled"
            type="submit"
            :disabled="isSubmitting || !!isDisabled"
            class="mb-4 w-full bg-[#28574e] px-4 py-2 font-semibold text-white hover:bg-[#1f4d42] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span
              v-if="isSubmitting"
              class="flex items-center justify-center gap-1"
              >Submitting <Loader
            /></span>
            <span v-else>Submit</span>
          </button>
          <button
            v-if="!!props.onDelete && !isDisabled"
            type="button"
            :disabled="isDeleting"
            class="w-full rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            @click="handleDelete"
          >
            <span
              v-if="isDeleting"
              class="flex items-center justify-center gap-1"
              >Deleting... <Loader
            /></span>
            <span v-else>Delete Article</span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
import { toast } from "vue-sonner";

const props = defineProps<{
  onSubmit: (values: any) => Promise<void>;
  defaultValues?: any;
  onDelete?: () => Promise<void>;
  title?: string;
  isDisabled?: boolean;
}>();

const formatPublishDateTime = (date: Date | string) => {
  date = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formData = ref(
  !!props.defaultValues
    ? {
        ...props.defaultValues,
        publishDate: formatPublishDateTime(props.defaultValues.publishDate),
      }
    : {
        title: "",
        image: undefined,
        handle: "",
        body: "",
        blogId: "",
        summary: "",
        isPublished: false,
        publishDate: formatPublishDateTime(new Date()),
        tags: [] as string[],
        author: {
          name: "",
        },
        metafields: {
          metaTitle: "",
          metaDescription: "",
          metaKeywords: "",
        },
      },
);

const isSubmitting = ref(false);
const isDeleting = ref(false);

const newTag = ref("");

const addTag = () => {
  if (newTag.value.trim()) {
    formData.value.tags.push(newTag.value.trim());
    newTag.value = "";
  }
};

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1);
};

const updateFeaturedImage = (image: any) => {
  if (image?.length < 1) return;
  formData.value.image = image[0];
};

const removeFeaturedImage = () => {
  formData.value.image = null;
};

const validateFormData = () => {
  if (!formData.value.image) {
    throw new Error("Blog does not have a featured image.");
  }
  if (!formData.value.blogId)
    throw new Error("Please select the blog category.");
};

const convertMetafields = () => {
  const metafields: { namespace: "custom"; key: string; value: string }[] = [];
  for (const key of Object.keys(formData.value.metafields)) {
    metafields.push({
      namespace: "custom",
      key,
      value: formData.value.metafields[key],
    });
  }
  return metafields;
};

const saveForm = async () => {
  isSubmitting.value = true;
  try {
    validateFormData();
    await props.onSubmit({
      ...formData.value,
      metafields: convertMetafields(),
    });
    toast.success("Successfully submitted the article.", { richColors: true });
  } catch (error: any) {
    toast.error(error.response?.statusText || error.message, {
      richColors: true,
    });
  } finally {
    isSubmitting.value = false;
  }
};

const handleDelete = async () => {
  isDeleting.value = true;
  if (!props.onDelete) return;
  try {
    await props.onDelete();
  } catch (error: any) {
    toast.error(error.response?.statusText || error.message, {
      richColors: true,
    });
  } finally {
    isDeleting.value = false;
  }
};

const togglePublish = () => {
  formData.value.isPublished = !formData.value.isPublished;
};
</script>
