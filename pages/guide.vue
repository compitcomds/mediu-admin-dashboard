<template>
  <div class="mx-auto">
    <h1 class="text-4xl font-semibold text-center mb-12 text-gray-800">
      Video Guide
    </h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8"
    >
      <template v-for="video in videos" :key="video.url">
        <Dialog>
          <DialogTrigger
            class="relative group bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all"
          >
            <div class="relative">
              <img
                :src="video.thumbnail"
                alt="Video Thumbnail"
                class="inset-0 w-full h-44 object-cover filter brightness-75 group-hover:opacity-80 transition-all"
              />
              <h3
                class="capitalize bg-[#28574e] py-2 absolute bottom-0 w-full font-semibold text-white text-center"
              >
                {{ video.title }}
              </h3>
              <div
                class="absolute inset-0 flex items-center justify-center group-hover:bg-black group-hover:bg-opacity-50 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="#28574e"
                  stroke="#28574e"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-play group-hover:scale-110 transition-all duration-200 lucide lucide-play"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent class="max-w-6xl pt-10">
            <div
              class="relative w-full h-full flex items-center justify-center"
            >
              <iframe
                :src="video.url"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full min-h-[500px] rounded-lg"
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const videos = [
  {
    url: "https://www.youtube.com/embed/yWEEgKjE6no?si=HatPTZTzv6oeSEX2",
    title: "Confirm a Order",
    thumbnail: "https://img.youtube.com/vi/yWEEgKjE6no/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/64j8oA_reCQ?si=spzW4bJIBQtQUTtC",
    title: "Create Collection",
    thumbnail: "https://img.youtube.com/vi/64j8oA_reCQ/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/zx-054RK_wA?si=F_OuoGrpBTWPTmjj",
    title: "Add Products",
    thumbnail: "https://img.youtube.com/vi/zx-054RK_wA/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/bmIFfbFHs9k?si=DeVlTJI6K0rtLH6h",
    title: "Active Products",
    thumbnail: "https://img.youtube.com/vi/bmIFfbFHs9k/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/dVaTI17eEtg?si=5JcJ0nQjKFlQeHjE",
    title: "Confirm Order Shipment",
    thumbnail: "https://img.youtube.com/vi/dVaTI17eEtg/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/z9q6fBhZujY?si=cB7lUlCB6ewV_Zzg",
    title: "Manage Inventory",
    thumbnail: "https://img.youtube.com/vi/z9q6fBhZujY/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/YedIr2hKbfw?si=1yScDtvC4fSqXreB",
    title: "Product Options And Varients",
    thumbnail: "https://img.youtube.com/vi/YedIr2hKbfw/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/xLNDNmG7TIc?si=uuORA_g5uyh6x_Fm",
    title: "Confirm Consultancy Booking",
    thumbnail: "https://img.youtube.com/vi/xLNDNmG7TIc/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/8DXzDL88uNI?si=aooNDp-UX0O2f1-1",
    title: "Create Consultancy Service",
    thumbnail: "https://img.youtube.com/vi/8DXzDL88uNI/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/zC4DXXGoFdI?si=IThv7NmUmnLKxqGx",
    title: "Multiple Orders",
    thumbnail: "https://img.youtube.com/vi/zC4DXXGoFdI/hqdefault.jpg",
  },
];

useHead({
  title: "Guide -  Mediu",
});
</script>

<style scoped></style>
