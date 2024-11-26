<template>
  <Sidenav />
  <div class="container">
    <h1 class="title">Consultancy Details</h1>
    <NavigationButton class="nav-button" />
    <div class="card" v-if="loading">
      <p class="loading-text">Loading...</p>
    </div>
    <div class="card" v-else-if="error.length > 0">
      <p class="error">Error: {{ error.join(", ") }}</p>
    </div>
    <div class="card" v-else-if="consultancy">
      <div class="consultancy-info">
        <div class="header">
          <h2 class="card-title">{{ consultancy.title }}</h2>
          <span class="category" :class="consultancy.consultancy_Status">{{
            consultancy.consultancy_Status
          }}</span>
        </div>
        <p><strong>Name:</strong> {{ consultancy.name }}</p>
        <p>
          <strong>Email:</strong>
          <a :href="'mailto:' + consultancy.email">{{ consultancy.email }}</a>
        </p>
        <p><strong>Description:</strong> {{ consultancy.Description }}</p>
        <p><strong>Booking Time:</strong> {{ consultancy.bookingTime }}</p>
        <p><strong>Payment Fee:</strong> {{ consultancy.paymentFee }}</p>
        <p><strong>Gender:</strong> {{ consultancy.gender }}</p>
      </div>
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
    await this.fetchConsultancy();
  },
  methods: {
    async fetchConsultancy() {
      const userId = this.$route.params.consultancyId;
      try {
        const result = await getconsultancy(userId);
        if (result.documents && result.documents.length > 0) {
          this.consultancy = result.documents[0];
        } else {
          this.error.push(
            "No consultancy found or failed to fetch consultancy"
          );
        }
      } catch (error) {
        console.error("Error fetching consultancy:", error);
        this.error.push("Error fetching consultancy data");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #007bff;
$secondary-color: #28a745;
$error-color: #dc3545;
$text-color: #343a40;
$background-color: #f8f9fa;
$card-background: #ffffff;
$border-radius: 12px;
$box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
$tag-color: #f0f0f0;

.container {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background-color: $background-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

.title {
  text-align: center;
  font-size: 2.5em;
  color: $primary-color;
  margin-bottom: 30px;
  font-weight: bold;
}

.nav-button {
  margin-bottom: 20px;
}

.card {
  background: $card-background;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: 25px;
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
}

.card-title {
  font-size: 1.8em;
  color: $primary-color;
  margin-bottom: 15px;
}

.category {
  display: inline-block;
  padding: 5px 10px;
  margin-left: 10px;
  font-size: 0.9em;
  border-radius: 12px;
  color: #fff;
  font-weight: bold;

  &.Pending {
    background-color: #ffca3a; /* Yellow */
  }

  &.Confirmed {
    background-color: $secondary-color; /* Green */
  }

  &.Cancelled {
    background-color: $error-color; /* Red */
  }
}

.error {
  color: $error-color;
  font-weight: bold;
  text-align: center;
}

.loading-text {
  text-align: center;
  font-size: 1.2em;
  color: $text-color;
}

.consultancy-info {
  p {
    color: $text-color;
    margin: 10px 0;

    a {
      color: $primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .card {
    padding: 20px;
  }
}
</style>
