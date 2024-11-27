<template>
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-semibold text-[#238878] text-center mb-10">Video Guide</h1>
      
      <!-- Video Cards Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="(video, index) in videos" :key="index" class="relative group bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl" @click="openModal(video.url)">
          
          <!-- Video Thumbnail -->
          <div class="relative pb-9/16">
            <img :src="video.thumbnail" alt="Video Thumbnail" class="absolute inset-0 w-full h-full object-cover rounded-t-lg group-hover:opacity-80">
          </div>
  
          <!-- Overlay Play Button -->
          <div class="absolute inset-0 flex items-center justify-center  rounded-lg group-hover:bg-opacity-50 transition-all">
            <i class="fas fa-play text-white group-hover:text-gray-400 text-5xl"></i>
          </div>
  
          <!-- Video Title -->
          <div class="p-4 bg-black text-white">
            <h3 class="text-xl font-semibold ">{{ video.title }}</h3>
          </div>
        </div>
      </div>
  
      <!-- Full-Screen Video Modal (Popup) -->
      <div v-if="isModalOpen" class="fixed inset-0  z-50 flex items-center justify-center">
        <div class="relative bg-black w-full h-full flex items-center justify-center">
          <button @click="closeModal" class="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-400">
            &times;
          </button>
          <iframe 
            :src="currentVideoUrl" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            class="w-full h-full"
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
          {
            url: 'https://www.youtube.com/embed/yWEEgKjE6no?si=HatPTZTzv6oeSEX2',
            title: 'Confirm a Order',
            thumbnail: 'https://img.youtube.com/vi/yWEEgKjE6no/hqdefault.jpg', // Thumbnail URL
          },
          {
            url: 'https://www.youtube.com/embed/64j8oA_reCQ?si=spzW4bJIBQtQUTtC',
            title: 'Create Collection',
            thumbnail: 'https://img.youtube.com/vi/64j8oA_reCQ/hqdefault.jpg', // Thumbnail URL
          },
          {
            url: 'https://www.youtube.com/embed/zx-054RK_wA?si=F_OuoGrpBTWPTmjj',
            title: 'Add Products',
            thumbnail: 'https://img.youtube.com/vi/zx-054RK_wA/hqdefault.jpg', // Thumbnail URL
          },
          {
            url: 'https://www.youtube.com/embed/bmIFfbFHs9k?si=DeVlTJI6K0rtLH6h',
            title: 'Active Products',
            thumbnail: 'https://img.youtube.com/vi/bmIFfbFHs9k/hqdefault.jpg', // Thumbnail URL
          },
        ],
        isModalOpen: false,
        currentVideoUrl: '',
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
  
  /* Hover effects */
  .group:hover .group-hover\:opacity-80 {
    opacity: 0.8;
  }
  .group:hover .group-hover\:text-gray-400 {
    color: #D1D5DB;
  }
  
  button {
    cursor: pointer;
  }
  
  /* Styling for the play button */
  i {
    transition: all 0.3s ease-in-out;
  }
  
  i:hover {
    transform: scale(1.2);
  }
  
  iframe {
    /* Ensure iframe takes full width and height of modal */
    width: 100%;
    height: 100%;
  }
  </style>
  