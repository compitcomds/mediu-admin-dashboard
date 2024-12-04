<template>
  <Dialog v-model:open="open">
    <DialogTrigger
      class="py-2 px-6 bg-[#238878] text-white font-semibold rounded-xl hover:bg-[#328575]"
    >
      Create New Ticket
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ticket Form</DialogTitle>
      </DialogHeader>
      <form
        @submit.prevent="submitTicket"
        class="space-y-6 max-h-[80vh] px-1 overflow-y-auto"
      >
        <div class="flex flex-col">
          <label for="title" class="text-sm font-medium text-gray-700"
            >Ticket Title</label
          >
          <input
            type="text"
            id="title"
            v-model="ticket.title"
            class="mt-3 p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter a brief title"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="description" class="text-sm font-medium text-gray-700"
            >Ticket Description</label
          >
          <textarea
            id="description"
            v-model="ticket.description"
            rows="5"
            class="mt-3 p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Describe your issue in detail"
            required
          ></textarea>
        </div>

        <div class="flex flex-col">
          <label for="image" class="text-sm font-medium text-gray-700"
            >Upload Image (Optional)</label
          >
          <input
            type="file"
            id="image"
            @change="handleImageUpload"
            accept="image/*"
            class="mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div v-if="ticket.imageUrl" class="relative">
            <img :src="ticket.imageUrl" alt="Ticket Image" class="max-w-full" />
            <button
              @click="removeImage"
              class="absolute right-2 top-2 text-white p-1 rounded-full bg-red-500 hover:bg-red-400"
            >
              <X :width="16" :height="16" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-4 flex items-start justify-center bg-[#238878] disabled:cursor-not-allowed text-white font-semibold rounded-xl"
        >
          <span v-if="!isSubmitting">Submit Ticket</span>
          <span v-else class="flex items-center gap-1"
            >Submitting <Loader
          /></span>
        </button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import uploadImageInAppwrite from "~/appwrite/upload-image";
import createTicketInAppwrite from "~/appwrite/help-and-support/create-ticket";
import { X } from "lucide-vue-next";

const open = ref(false);
const isSubmitting = ref(false);
const ticket = ref<{
  title: string;
  description: string;
  imageUrl: string | null;
  image: File | null;
}>({
  title: "",
  description: "",
  imageUrl: null,
  image: null,
});

const resetTicket = () => {
  removeImage();
  ticket.value = {
    title: "",
    description: "",
    imageUrl: null,
    image: null,
  };
};

const submitTicket = async () => {
  isSubmitting.value = true;
  try {
    let image: URL | string | undefined = undefined;
    if (ticket.value.image)
      image = await uploadImageInAppwrite(
        ticket.value.image,
        "help-and-support"
      );

    await createTicketInAppwrite({
      title: ticket.value.title,
      description: ticket.value.description,
      image,
    });
    alert("Successfully raised the ticket.");
    resetTicket();
    open.value = false;
  } catch (error: any) {
    alert(
      error.message || "Unable to raise the ticket. Please try again later."
    );
  } finally {
    isSubmitting.value = false;
  }
};

const removeImage = () => {
  if (!ticket.value.image || !ticket.value.imageUrl) return;
  URL.revokeObjectURL(ticket.value.imageUrl);
  ticket.value.imageUrl = null;
  ticket.value.image = null;
};

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      ticket.value.imageUrl = e.target?.result as string;
      ticket.value.image = file;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped></style>
