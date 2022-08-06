import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
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
const API_POST_SOLVED_IN_MONTH = "http://localhost:5000/api/quiz/get/solved-in-month";

const LineChart = ({monthIn, yearIn}) => {
  console.log(monthIn.number + " : " + yearIn)
  // Carga de los días del mes 
  const days = new Array(new Date(parseInt(yearIn), parseInt(monthIn.number), 0).getDate());
  for (let i = 0; i < days.length; i++) {
    days[i] = i+1;
  }
  const labels = days
  // Carga de los datos diarios desde el backend
  const scores2 = new Array(days.length);
  scores2.fill(0,0);
  axios.post(API_POST_SOLVED_IN_MONTH, { year: yearIn, month: monthIn.number}).then((response) => {
      const checkedDays = response.data;
      console.log(response.data)
      for (const key in checkedDays) {
        scores2[checkedDays[key].day] = checkedDays[key].realized
      }
  });
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Chequeos realizados",
          data: scores2,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
      ],
      labels,
    };
  }, []);
  return <Line data={data} options={options} />;
};

export default LineChart;