<template>
  <div class="container">
    <h1 class="title">Consultancy Details</h1>
    <div class="card" v-if="loading">
      <p>Loading...</p>
    </div>
    <div class="card" v-else-if="error.length > 0">
      <p>Error: {{ error.join(", ") }}</p>
    </div>
    <div class="card" v-else-if="consultancy">
      <h2 class="card-title"><strong>Title:</strong> {{ consultancy.title }}</h2>
      <p><strong>Name:</strong> {{ consultancy.name }}</p>
      <p><strong>Email:</strong> {{ consultancy.email }}</p>
      <p><strong>Description:</strong> {{ consultancy.Description }}</p>
      <p><strong>Booking Time:</strong> {{ consultancy.bookingTime }}</p>
      <p><strong>Status:</strong> {{ consultancy.consultancy_Status }}</p>
      <p><strong>Payment Fee:</strong> {{ consultancy.paymentFee }}</p>
      <p><strong>Gender:</strong> {{ consultancy.gender }}</p>
    </div>
  </div>
</template>

<script>
import { getconsultancy } from "~/appwrite/consultancy";

export default {
  data() {
    return {
      consultancy: null,
      error: [],
      loading: true,
    };
  },
  async mounted() {
    await this.fetchConsultancy(); // Call fetchConsultancy on mount
  },
  methods: {
    async fetchConsultancy() {
      const userId = this.$route.params.consultancyId; // Use userId from route params
      try {
        const result = await getconsultancy(userId);
        if (result.documents && result.documents.length > 0) {
          this.consultancy = result.documents[0]; // Assuming you want the first document
        } else {
          this.error.push("No consultancy found or failed to fetch consultancy");
        }
      } catch (error) {
        console.error("Error fetching consultancy:", error);
        this.error.push("Error fetching consultancy data");
      } finally {
        this.loading = false; // Set loading to false after fetching
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px; /* Set a max width for the card */
  margin: 0 auto; /* Center the card */
  padding: 20px; /* Add some padding */
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.card {
  background: #fff; /* White background for the card */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 20px; /* Padding inside the card */
  margin-bottom: 20px; /* Space between cards */
  transition: transform 0.2s; /* Smooth hover effect */
}

.card:hover {
  transform: translateY(-5px); /* Lift the card on hover */
}

.card-title {
  margin-top: 0; /* Remove top margin */
  margin-bottom: 10px; /* Space below title */
}

/* Responsive Styles */
@media (max-width: 768px) {
  .container {
    padding: 10px; /* Reduce padding on smaller screens */
  }

  .card {
    padding: 15px; /* Reduce padding in the card */
  }
}
</style>
