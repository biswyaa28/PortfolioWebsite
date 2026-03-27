"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SKILLS = {
  labels: [
    "C++",
    "Python",
    "Networking",
    "Linux",
    "React",
    "Cryptography",
    "PenTesting",
    "JavaScript",
  ],
  datasets: [
    {
      label: "Skill Level",
      data: [85, 70, 90, 80, 65, 75, 88, 60],
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "#3B82F6",
      borderWidth: 2,
      pointBackgroundColor: "#3B82F6",
      pointBorderColor: "#3B82F6",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointStyle: "rect",
    },
  ],
};

const CHART_OPTIONS: ChartOptions<"radar"> = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      grid: {
        color: "#292524",
        lineWidth: 1,
      },
      angleLines: {
        color: "#292524",
        lineWidth: 1,
      },
      pointLabels: {
        color: "#A8A29E",
        font: {
          family: "'JetBrains Mono', monospace",
          size: 12,
        },
      },
      ticks: {
        display: false,
        stepSize: 20,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1C1917",
      titleColor: "#3B82F6",
      bodyColor: "#E5E7EB",
      borderColor: "#3B82F6",
      borderWidth: 2,
      cornerRadius: 0,
      titleFont: {
        family: "'JetBrains Mono', monospace",
        size: 11,
      },
      bodyFont: {
        family: "'JetBrains Mono', monospace",
        size: 11,
      },
      padding: 12,
      displayColors: false,
      callbacks: {
        label: (ctx) => ` ${ctx.parsed.r}/100`,
      },
    },
  },
  elements: {
    line: {
      borderColor: "#3B82F6",
      borderWidth: 2,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
      pointStyle: "rect",
    },
  },
};

export default function SkillsRadar() {
  return (
    <div className="skills-radar-container">
      <Radar data={SKILLS} options={CHART_OPTIONS} />
    </div>
  );
}
