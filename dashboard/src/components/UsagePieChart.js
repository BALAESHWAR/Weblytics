import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const domainNames = {
  "linkedin.com": "LinkedIn",
  "youtube.com": "YouTube",
  "web.whatsapp.com": "WhatsApp",
  "github.com": "GitHub",
  "leetcode.com": "LeetCode",
  "stackoverflow.com": "StackOverflow",
  "chatgpt.com": "ChatGPT"
};

export default function UsagePieChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No usage data available</p>;
  }

  return (
    <Pie
      data={{
        labels: data.map(d => domainNames[d.domain] || d.domain),
        datasets: [
          {
            data: data.map(d => Math.round(d.totalTime)),
            backgroundColor: data.map(d => d.color || "#36A2EB")
          }
        ]
      }}
      options={{
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }}
    />
  );
}
