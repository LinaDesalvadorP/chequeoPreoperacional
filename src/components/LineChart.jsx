import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5, 6, 5, 5, 5, 3, 4, 6, 4, 5, 8, 7];
const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15,16,17,18,19,20];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function LineChart() {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Chequeos realizados",
          data: scores,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        // {
        //   label: "Mis datos (2)",
        //   tension: 0.3,
        //   data: scores2,
        //   borderColor: "green",
        //   backgroundColor: "rgba(0, 255, 0, 0.3)",
        //   pointRadius: 6,
        // },
      ],
      labels,
    };
  }, []);

  return <Line data={data} options={options} />;
}