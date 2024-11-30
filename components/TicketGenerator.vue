<template>
    <div class="w-full mx-auto p-8">
      <!-- Submit New Ticket Button (At the top) -->
      <div class="ticket-creation-card mb-6 bg-white border p-6 rounded-2xl shadow-xl">
        <h2 class="text-black text-3xl font-semibold text-center mb-4">Create a New Ticket</h2>
        <p class="text-black text-center mb-6">Click below to submit your ticket and get assistance by Compitcom.</p>
        <button @click="openTicketForm" class="w-full py-4 bg-[#238878] text-white font-semibold rounded-xl hover:bg-[#328575] transition-colors ease-in-out duration-200">
          Submit New Ticket
        </button>
      </div>
  
      <!-- Ticket List (Visible immediately when the page loads) -->
      <div class="ticket-list mb-6 bg-teal-600 p-8 rounded-2xl shadow-xl">
        <h2 class="text-white text-3xl font-semibold text-center mb-6">Your Submitted Tickets</h2>
  
        <!-- List of Submitted Tickets -->
        <div v-if="ticketSubmitted" class="tickets-container">
          <div v-for="(ticket, index) in visibleTickets" :key="ticket.id" class="ticket-item bg-white p-6 rounded-2xl shadow-md mb-6">
            <h3 class="text-xl font-semibold text-gray-800">{{ ticket.title }}</h3>
  
            <!-- Show shortened description and toggle for full description -->
            <p v-if="!ticket.showFullDescription" class="text-gray-600 line-clamp-2">{{ ticket.description }}</p>
  
            <div v-if="ticket.showFullDescription" class="text-gray-600 ticket-description">
              {{ ticket.description }}
            </div>
  
            <!-- Show Image if uploaded -->
            <div v-if="ticket.imageUrl" class="mt-4">
              <img :src="ticket.imageUrl" alt="Ticket Image" class="w-16 h-16 rounded-xl" />
            </div>
  
            <div class="flex justify-between items-center mt-4">
              <div class="flex space-x-4 items-center">
                <!-- Show 'Show More' or 'Show Less' button based on state -->
                <button @click="toggleDescription(ticket)" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  {{ ticket.showFullDescription ? 'Show Less' : 'Show More' }}
                </button>
                <button @click="deleteTicket(ticket.id)" class="text-red-500 hover:text-red-700 text-sm font-medium">
                  <i class="fa fa-trash"></i> Delete
                </button>
              </div>
              <span class="text-sm text-gray-400">{{ ticket.timestamp }}</span>
            </div>
          </div>
  
          <!-- Load More Button -->
          <div v-if="tickets.length > visibleTickets.length" class="text-center mt-6">
            <button @click="loadMore" class="py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal for Ticket Form -->
      <div v-if="ticketFormVisible" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="modal-content bg-slate-300 p-8 rounded-2xl shadow-xl relative w-1/2">
          <button @click="closeTicketForm" class="absolute top-4 right-4 text-black text-2xl font-bold">
            ×
          </button>
          <h2 class="text-black text-3xl font-semibold text-center mb-6">Ticket Form</h2>
          <form @submit.prevent="submitTicket" class="space-y-6">
            <div class="flex flex-col">
              <label for="title" class="text-black text-lg font-medium">Ticket Title</label>
              <input type="text" id="title" v-model="ticketData.title" class="mt-3 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter a brief title" required />
            </div>
  
            <div class="flex flex-col">
              <label for="description" class="text-black text-lg font-medium">Ticket Description</label>
              <textarea id="description" v-model="ticketData.description" rows="5" class="mt-3 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe your issue in detail" required></textarea>
            </div>
  
            <!-- Optional Image Upload -->
            <div class="flex flex-col">
              <label for="image" class="text-black text-lg font-medium">Upload Image (Optional)</label>
              <input type="file" id="image" @change="handleImageUpload" accept="image/*" class="mt-3 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
  
            <button type="submit" class="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-orange-600 transition-colors ease-in-out duration-200">
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        ticketData: {
          title: '',
          description: '',
          imageUrl: null,  // Image URL for the ticket
        },
        ticketFormVisible: false,
        ticketSubmitted: false,
        tickets: [],
        visibleTicketsCount: 10,  // Initially show 10 tickets
      };
    },
    computed: {
      // Return only the visible tickets, sorted by latest (most recent first)
      visibleTickets() {
        return this.tickets.slice(0, this.visibleTicketsCount);
      },
    },
    methods: {
      openTicketForm() {
        this.ticketFormVisible = true;  // Show the ticket form modal
      },
      closeTicketForm() {
        this.ticketFormVisible = false;  // Close the ticket form modal
      },
      submitTicket() {
        const newTicket = {
          id: Date.now(),  // Unique ID based on timestamp
          title: this.ticketData.title,
          description: this.ticketData.description,
          imageUrl: this.ticketData.imageUrl, // Store image URL
          timestamp: new Date().toLocaleString(),
          showFullDescription: false,
        };
  
        // Prepend to the tickets array to show the latest ticket first
        this.tickets.unshift(newTicket);  // Adds new ticket at the beginning of the array
        this.ticketSubmitted = true;
        this.ticketFormVisible = false;
  
        // Store in localStorage to persist data
        localStorage.setItem('tickets', JSON.stringify(this.tickets));
  
        // Reset ticket data after submission
        this.ticketData.title = '';
        this.ticketData.description = '';
        this.ticketData.imageUrl = null;
      },
      toggleDescription(ticket) {
        ticket.showFullDescription = !ticket.showFullDescription;
      },
      deleteTicket(ticketId) {
        this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
  
        // Update localStorage after deletion
        localStorage.setItem('tickets', JSON.stringify(this.tickets));
      },
      loadMore() {
        this.visibleTicketsCount += 3;  // Load 3 more tickets
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.ticketData.imageUrl = e.target.result;  // Store image URL
          };
          reader.readAsDataURL(file);  // Convert image to base64 string
        }
      },
    },
    created() {
      // On page load, fetch the tickets from localStorage
      const savedTickets = JSON.parse(localStorage.getItem('tickets'));
      if (savedTickets) {
        this.tickets = savedTickets;
      }
    },
  };
  </script>
  
  
  <style scoped>
  .ticket-creation-card {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .ticket-form {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .ticket-list {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .ticket-item {
    transition: opacity 0.3s ease;
  }
  
  /* Tailwind CSS line-clamp utility to limit the description to two lines */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .ticket-description {
    white-space: pre-wrap;
  }
  </style>  