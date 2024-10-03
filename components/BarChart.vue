<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref(null);
    let chartInstance = null;

    const createChart = () => {
      const ctx = canvas.value.getContext("2d");
      if (chartInstance) {
        chartInstance.destroy(); // Destroy existing chart instance if it exists
      }
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: props.chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    onMounted(() => {
      createChart();
    });

    watch(
      () => props.chartData,
      (newData) => {
        if (newData) {
          createChart();
        }
      }
    );

    return {
      canvas,
    };
  },
};
</script>

<style scoped>
canvas {
  max-width: 600px;
  margin: auto;
}
</style>
