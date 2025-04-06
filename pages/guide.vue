<template>
  <div class="mx-auto">
    <h1 class="mb-12 text-center text-4xl font-semibold text-gray-800">
      Video Guide
    </h1>

    <div
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4"
    >
      <template v-for="video in videos" :key="video.url">
        <Dialog>
          <DialogTrigger
            class="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-2xl"
          >
            <div class="relative">
              <img
                :src="video.thumbnail"
                alt="Video Thumbnail"
                class="inset-0 h-44 w-full object-cover brightness-75 filter transition-all group-hover:opacity-80"
              />
              <h3
                class="absolute bottom-0 w-full bg-[#28574e] py-2 text-center font-semibold capitalize text-white"
              >
                {{ video.title }}
              </h3>
              <div
                class="absolute inset-0 flex items-center justify-center transition-all group-hover:bg-black group-hover:bg-opacity-50"
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
                  class="feather feather-play lucide lucide-play transition-all duration-200 group-hover:scale-110"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent class="max-w-6xl pt-10">
            <div
              class="relative flex h-full w-full items-center justify-center"
            >
              <iframe
                :src="video.url"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="min-h-[500px] w-full rounded-lg"
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

const videos: Array<{ url: string; title: string; thumbnail?: string }> = [
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
    title: "Product Options And Variants",
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
  {
    url: "https://www.youtube.com/embed/gV56UunwIxQ?si=0usnN6hfbN0KKGoX",
    title: "Create Role Management",
    thumbnail: "https://img.youtube.com/vi/gV56UunwIxQ/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/QbR3BGzqFIU?si=197QNdRQ6QSOJ-t8",
    title: "Accept Role Management",
    thumbnail: "https://img.youtube.com/vi/QbR3BGzqFIU/hqdefault.jpg",
  },
  {
    url: "https://www.youtube.com/embed/Y4f3A5WSn88?si=40i11pwkEBj77i3N",
    title: "Edit home page product",
    thumbnail: "https://img.youtube.com/vi/Y4f3A5WSn88/hqdefault.jpg",
  },
];

useHead({
  title: "Guide -  Mediu",
});
</script>

<style scoped></style>
