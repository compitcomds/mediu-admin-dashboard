<template>
  <div class="flex items-center gap-3 justify-between mt-10">
    <h2 class="text-3xl font-semibold flex-1 w-full mb-6">
      Your Submitted Tickets
    </h2>
    <HelpAndSupportTickerGenerator />
  </div>
  <div class="w-full mx-auto p-8">
    <div class="ticket-list">
      <div v-if="ticketSubmitted" class="tickets-container">
        <div
          v-for="(ticket, index) in visibleTickets"
          :key="ticket.id"
          class="ticket-item bg-white p-6 rounded-2xl shadow-md mb-6"
        >
          <h3 class="text-xl font-semibold text-gray-800">
            {{ ticket.title }}
          </h3>

          <!-- Show shortened description and toggle for full description -->
          <p
            v-if="!ticket.showFullDescription"
            class="text-gray-600 line-clamp-2"
          >
            {{ ticket.description }}
          </p>

          <div
            v-if="ticket.showFullDescription"
            class="text-gray-600 ticket-description"
          >
            {{ ticket.description }}
          </div>

          <!-- Show Image if uploaded -->
          <div v-if="ticket.imageUrl" class="mt-4">
            <img
              :src="ticket.imageUrl"
              alt="Ticket Image"
              class="w-16 h-16 rounded-xl"
            />
          </div>

          <div class="flex justify-between items-center mt-4">
            <div class="flex space-x-4 items-center">
              <!-- Show 'Show More' or 'Show Less' button based on state -->
              <button
                @click="toggleDescription(ticket)"
                class="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
              >
                {{ ticket.showFullDescription ? "Show Less" : "Show More" }}
              </button>
              <button
                @click="deleteTicket(ticket.id)"
                class="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                <i class="fa fa-trash"></i> Delete
              </button>
            </div>
            <span class="text-sm text-gray-400">{{ ticket.timestamp }}</span>
          </div>
        </div>

        <div
          v-if="tickets.length > visibleTickets.length"
          class="text-center mt-6"
        >
          <button
            @click="loadMore"
            class="py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Ticket {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  timestamp: string;
  showFullDescription: boolean;
}

const ticketSubmitted = ref(false);
const tickets = ref<Ticket[]>([]);
const visibleTicketsCount = ref(10);

const visibleTickets = computed(() => {
  return tickets.value.slice(0, visibleTicketsCount.value);
});

const toggleDescription = (ticket: Ticket) => {
  ticket.showFullDescription = !ticket.showFullDescription;
};

const deleteTicket = (ticketId: number) => {
  tickets.value = tickets.value.filter((ticket) => ticket.id !== ticketId);
  localStorage.setItem("tickets", JSON.stringify(tickets.value));
};

const loadMore = () => {
  visibleTicketsCount.value += 3;
};

onMounted(() => {
  const savedTickets = localStorage.getItem("tickets");
  if (savedTickets) {
    tickets.value = JSON.parse(savedTickets);
  }
});
</script>
