import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Optional friendly name mapping
const domainNames = {
  "linkedin.com": "LinkedIn",
  "youtube.com": "YouTube",
  "web.whatsapp.com": "WhatsApp",
  "github.com": "GitHub",
  "leetcode.com": "LeetCode",
  "stackoverflow.com": "StackOverflow",
  "chatgpt.com": "ChatGPT"
};

export default function UsageBarChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No usage data available</p>;
  }

  return (
    <Bar
      data={{
        labels: data.map(d => domainNames[d.domain] || d.domain),
        datasets: [
          {
            label: "Time Spent (mins)",
            data: data.map(d => Math.round(d.totalTime)),
            backgroundColor: data.map(d => d.color || "#36A2EB")
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }}
    />
  );
}
