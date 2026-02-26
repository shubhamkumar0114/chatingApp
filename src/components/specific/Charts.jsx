import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  plugins,
  PointElement,
  Tooltip,
} from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);
const lineChartOption = {
  response: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const labels = getLast7Days();

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: value,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,0.9)",
      },
    ],
  };
  return <Line data={data} options={lineChartOption} />;
};

const DoughnutChartOption = {
    response: true,
    plugins: {
        legend: {
            display: true,
        },
        title: {
            display: true,
        }
    },
    cutout: 90
}
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        labels: "Total chats vs Group chats",
        data: value,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        offset: 2,
        hoverOffset: 4,
      },
    ],
  };
  return <Doughnut style={{zIndex: 10}} data={data} options={DoughnutChartOption} />;
};

export { LineChart, DoughnutChart };
