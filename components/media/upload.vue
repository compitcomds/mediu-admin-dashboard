<template>
  <Dialog>
    <DialogTrigger :as-child="true">
      <slot>
        <button
          type="button"
          :disabled="!!disabled"
          class="rounded-md bg-black px-5 py-1 text-white"
        >
          Upload Media
        </button>
      </slot>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload Media</DialogTitle>
        <DialogDescription>Upload your images and videos</DialogDescription>
      </DialogHeader>

      <div v-if="errorMessage" class="py-2 text-red-600">
        <p>Error: {{ errorMessage }}</p>
        <button
          @click="resetUploader"
          type="button"
          class="mt-2 rounded bg-[#238878] px-4 py-2 font-medium text-white hover:bg-[#23887796] focus:outline-none focus:ring-2 focus:ring-[#238878]"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="uploadedFiles.length > 0" class="text-center">
        <p class="mb-2 text-start font-medium text-[#238878]">
          Upload successful! 🥳
        </p>
        <div class="my-4 grid grid-cols-2 gap-2">
          <div
            v-for="(file, index) in uploadedFiles"
            :key="index"
            class="overflow-hidden rounded"
          >
            <img
              v-if="file.type.startsWith('image/')"
              :src="file.url"
              :alt="file.name"
              class="h-32 w-full object-cover"
            />
            <video
              v-else-if="file.type.startsWith('video/')"
              :src="file.url"
              controls
              class="h-32 w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
            <p class="mt-1 truncate text-xs">{{ file.name }}</p>
          </div>
        </div>
        <button
          type="button"
          :disabled="!!disabled"
          @click="resetUploader"
          class="rounded bg-[#238878] px-4 py-2 font-medium text-white hover:bg-[#23887796] focus:outline-none focus:ring-2 focus:ring-[#238878]"
        >
          Upload More
        </button>
      </div>

      <div v-else class="flex flex-col gap-4">
        <label
          class="flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-[#238878] bg-white px-4 py-6 text-[#238878] transition-colors hover:bg-[#e5fefa]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span class="mt-2 text-base">Select images and videos</span>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileSelect"
            accept="image/*"
            class="hidden"
            :multiple="limit === undefined || limit > 1"
          />
        </label>

        <div v-if="selectedFiles.length > 0" class="mb-2 text-sm text-gray-600">
          <p>Selected {{ selectedFiles.length }} file(s):</p>
          <ul class="mt-2 max-h-32 overflow-y-auto">
            <li
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="flex items-center justify-between py-1"
            >
              <span class="max-w-[200px] truncate"
                >{{ file.name }} ({{ formatFileSize(file.size) }})</span
              >
              <button
                type="button"
                @click="removeFile(index)"
                class="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div
          v-if="isUploading"
          class="flex flex-col items-center justify-center"
        >
          <Loader />
        </div>

        <button
          @click="uploadFiles"
          type="button"
          :disabled="selectedFiles.length === 0 || isUploading || !!disabled"
          :class="[
            'w-full rounded px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#238878]',
            selectedFiles.length > 0
              ? 'bg-[#238878] text-white hover:bg-[#23887796]'
              : 'cursor-not-allowed bg-gray-300 text-gray-500',
          ]"
        >
          <span v-if="isUploading">Uploading...</span>
          <span v-else>Upload </span>
        </button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

const { limit, disabled } = defineProps<{
  limit?: number;
  disabled?: boolean;
}>();

const emit = defineEmits(["upload-success", "upload-error"]);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<File[]>([]);
const isUploading = ref(false);
const uploadedFiles = ref<Array<{ name: string; url: string; type: string }>>(
  [],
);
const errorMessage = ref("");

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const newFiles = Array.from(input.files);
    selectedFiles.value = [...selectedFiles.value, ...newFiles];
  }
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

const generateUniqueFilename = (file: File): string => {
  const timestamp = new Date().getTime();
  return `${timestamp}-${file.name}`;
};

const resetUploader = () => {
  selectedFiles.value = [];
  isUploading.value = false;
  uploadedFiles.value = [];
  errorMessage.value = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) {
    errorMessage.value = "Please select at least one file";
    return;
  }

  try {
    isUploading.value = true;
    errorMessage.value = "";
    uploadedFiles.value = [];

    const stagedUploadInputs = selectedFiles.value.map((file) => ({
      filename: generateUniqueFilename(file),
      mimeType: file.type,
      resource: file.type.startsWith("video/") ? "VIDEO" : "IMAGE",
      fileSize: String(file.size),
    }));

    const { data: responseData } = await axios.post("/api/media/create", {
      input: stagedUploadInputs,
    });

    if (
      !responseData ||
      !Array.isArray(responseData) ||
      responseData.length === 0
    ) {
      throw new Error("Invalid response from server");
    }

    const uploadPromises = responseData.map((stagedTarget, index) => {
      const file = selectedFiles.value[index];
      const formData = new FormData();
      for (const param of stagedTarget.parameters) {
        formData.append(param.name, param.value);
      }
      formData.append("file", file);
      return axios.post(stagedTarget.url, formData).then(() => ({
        url: stagedTarget.resourceUrl,
        name: file.name,
        type: file.type,
        size: file.size,
      }));
    });

    const results = await Promise.all(uploadPromises);

    emit(
      "upload-success",
      results.map((res) => ({
        url: res.url,
        altText: `Article | ${res.name}`,
      })),
    );
  } catch (error: any) {
    errorMessage.value =
      error?.response?.statusText || error instanceof Error
        ? error.message
        : "An unknown error occurred";
    emit("upload-error", errorMessage.value);
    console.error("Upload error:", error);
  } finally {
    isUploading.value = false;
  }
};
</script>
