<template>
  <div class="dashboard">
    <h1>Analytics Dashboard</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">Error: {{ error.message }}</div>
    {{chartData}}
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import BarChart from "@/components/BarChart.vue"; // Import your chart component

export default {
  components: {
    BarChart,
  },
  setup() {
    const chartData = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch("/api/analytics"); // Adjust the path as necessary
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();

        console.log("Fetched Data:", data); // Log the fetched data

        if (data && Array.isArray(data)) {
          chartData.value = processChartData(data); // Process data only if it is an array
          console.log("Processed Chart Data:", chartData.value); // Log processed chart data
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (err) {
        error.value = err;
        console.error("Error fetching analytics data:", err);
      } finally {
        loading.value = false;
      }
    };

    const processChartData = (data) => {
      // Assuming data is an array of objects with 'date' and 'sales' properties
      const labels = data.map((item) => item.date); // Example: ["2024-01-01", "2024-01-02"]
      const salesData = data.map((item) => item.sales); // Example: [100, 200]

      return {
        labels,
        datasets: [
          {
            label: "Sales",
            data: salesData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
    };

    onMounted(fetchAnalyticsData);

    return {
      chartData,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.error {
  color: red;
}
</style>
