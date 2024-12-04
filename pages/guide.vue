<template>
  <div class="mx-auto">
    <h1 class="text-4xl font-semibold text-center mb-12 text-gray-800">Video Guide</h1>

    <!-- Video Cards Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
      <div v-for="(video, index) in videos" :key="index" class="relative group bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all" @click="openModal(video.url)">
        
        <!-- Video Thumbnail -->
        <div class="relative pb-9/16">
          <img :src="video.thumbnail" alt="Video Thumbnail" class="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition-all">
        </div>

        <!-- Play Button (SVG) -->
        <div class="absolute inset-0 flex items-center justify-center group-hover:bg-black group-hover:bg-opacity-50 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#28574e" stroke="#28574e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play group-hover:scale-110 transition-all duration-200 lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        </div>

        <!-- Video Title -->
        <div class="p-4 bg-[#28574e]">
          <h3 class="text-lg font-semibold text-white text-center">{{ video.title }}</h3>
        </div>
      </div>
    </div>

    <!-- Full-Screen Video Modal (Popup) -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
      <div class="relative w-full max-w-6xl h-full flex items-center justify-center">
        <button @click="closeModal" class="absolute top-4 right-4 text-white text-6xl font-bold hover:text-gray-400">
          &times;
        </button>
        <iframe 
          :src="currentVideoUrl" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen 
          class="w-full h-full rounded-lg shadow-2xl"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [
        { url: 'https://www.youtube.com/embed/yWEEgKjE6no?si=HatPTZTzv6oeSEX2', title: 'Confirm a Order', thumbnail: 'https://img.youtube.com/vi/yWEEgKjE6no/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/64j8oA_reCQ?si=spzW4bJIBQtQUTtC', title: 'Create Collection', thumbnail: 'https://img.youtube.com/vi/64j8oA_reCQ/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/zx-054RK_wA?si=F_OuoGrpBTWPTmjj', title: 'Add Products', thumbnail: 'https://img.youtube.com/vi/zx-054RK_wA/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/bmIFfbFHs9k?si=DeVlTJI6K0rtLH6h', title: 'Active Products', thumbnail: 'https://img.youtube.com/vi/bmIFfbFHs9k/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/dVaTI17eEtg?si=5JcJ0nQjKFlQeHjE', title: 'Confirm Order Shipment', thumbnail: 'https://img.youtube.com/vi/dVaTI17eEtg/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/z9q6fBhZujY?si=cB7lUlCB6ewV_Zzg', title: 'Manage Inventory', thumbnail: 'https://img.youtube.com/vi/z9q6fBhZujY/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/YedIr2hKbfw?si=1yScDtvC4fSqXreB', title: 'Product Options And Varients', thumbnail: 'https://img.youtube.com/vi/YedIr2hKbfw/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/xLNDNmG7TIc?si=uuORA_g5uyh6x_Fm', title: 'Confirm Consultancy Booking', thumbnail: 'https://img.youtube.com/vi/xLNDNmG7TIc/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/8DXzDL88uNI?si=aooNDp-UX0O2f1-1', title: 'Create Consultancy Service', thumbnail: 'https://img.youtube.com/vi/8DXzDL88uNI/hqdefault.jpg' },
        { url: 'https://www.youtube.com/embed/zC4DXXGoFdI?si=IThv7NmUmnLKxqGx', title: 'Multiple Orders', thumbnail: 'https://img.youtube.com/vi/zC4DXXGoFdI/hqdefault.jpg' },


      ],
      isModalOpen: false,
      currentVideoUrl: ''
    };
  },
  methods: {
    openModal(url) {
      this.currentVideoUrl = `${url}?autoplay=1`;  // Add autoplay parameter to URL
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentVideoUrl = '';  // Stop the video when modal is closed
    }
  }
}
</script>

<style scoped>
/* Aspect ratio for video thumbnails (16:9) */
.pb-9\/16 {
  padding-bottom: 56.25%;
}

/* Card hover effect */
.group:hover {
  transform: scale(1.05); /* Slight zoom effect */
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.1); /* Enhanced shadow */
  transition: all 0.3s ease;
}

/* Title styling */
h3 {
  text-transform: capitalize;
  font-weight: 500;
  
}


/* Modal styling */
iframe {
  border-radius: 1rem;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.6);
}

/* Modal background */
.bg-black {
  background-color: rgba(0, 0, 0, 0.85);
}
</style>
