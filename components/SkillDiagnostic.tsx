"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  type ChartEvent,
  type ActiveElement,
} from "chart.js";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
} from "@floating-ui/react";
import anime from "animejs";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SubSkillData {
  subSkills: string[];
  years: number;
  level: string;
}

const SKILL_META: Record<string, SubSkillData> = {
  "C++": { subSkills: ["STL", "Boost", "CMake", "Embedded"], years: 3, level: "Advanced" },
  Python: { subSkills: ["Django", "FastAPI", "NumPy", "Scapy", "PyCryptodome"], years: 4, level: "Advanced" },
  Networking: { subSkills: ["TCP/IP", "DNS", "DHCP", "VLANs", "Firewall Rules"], years: 3, level: "Expert" },
  Linux: { subSkills: ["Bash", "systemd", "iptables", "SELinux", "SSH"], years: 4, level: "Advanced" },
  React: { subSkills: ["Hooks", "Context", "Next.js", "Framer Motion"], years: 2, level: "Intermediate" },
  Cryptography: { subSkills: ["AES", "RSA", "SHA-256", "TLS/SSL", "OpenSSL"], years: 2, level: "Intermediate" },
  PenTesting: { subSkills: ["Metasploit", "Burp Suite", "Nmap", "Gobuster", "SQLMap"], years: 2, level: "Advanced" },
  JavaScript: { subSkills: ["ES6+", "Node.js", "TypeScript", "Fetch API"], years: 3, level: "Intermediate" },
};

const LABELS = Object.keys(SKILL_META);

const DATA = {
  labels: LABELS,
  datasets: [
    {
      label: "Proficiency",
      data: [85, 70, 90, 80, 65, 75, 88, 60],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderWidth: 2,
      pointBackgroundColor: "#3B82F6",
      pointBorderColor: "#3B82F6",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointStyle: "rect" as const,
    },
    {
      label: "Interest",
      data: [70, 90, 85, 75, 80, 95, 90, 55],
      borderColor: "#FFFFFF",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderWidth: 2,
      pointBackgroundColor: "#FFFFFF",
      pointBorderColor: "#FFFFFF",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 7,
      pointStyle: "rect" as const,
    },
    {
      label: "Years Active",
      data: [75, 80, 70, 85, 50, 50, 50, 65],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.08)",
      borderWidth: 1,
      borderDash: [4, 4],
      pointBackgroundColor: "#404040",
      pointBorderColor: "#3B82F6",
      pointBorderWidth: 1,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointStyle: "rect" as const,
    },
  ],
};

const CHART_OPTIONS: ChartOptions<"radar"> = {
  responsive: true,
  maintainAspectRatio: true,
  animation: false,
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      grid: { color: "#292524", lineWidth: 1 },
      angleLines: { color: "#292524", lineWidth: 1 },
      pointLabels: {
        color: "#3B82F6",
        font: { family: "'JetBrains Mono', monospace", size: 11 },
      },
      ticks: { display: false, stepSize: 20 },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  elements: {
    line: { borderWidth: 2 },
    point: { radius: 4, hoverRadius: 7, pointStyle: "rect" },
  },
  onHover: () => {},
};

interface HoveredPoint {
  label: string;
  datasetLabel: string;
  value: number;
  x: number;
  y: number;
}

export default function SkillDiagnostic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartJS<"radar">>(null);
  const [hoveredPoint, setHoveredPoint] = useState<HoveredPoint | null>(null);
  const [isScanned, setIsScanned] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: "right",
    middleware: [offset(12), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  // Glitch scan-in entrance
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isScanned) return;

    const tl = anime.timeline({ autoplay: true });

    // Phase 1: horizontal scan lines wipe in
    tl.add({
      targets: container,
      opacity: [0, 1],
      scaleY: [0.01, 1],
      duration: 400,
      easing: "steps(8)",
    });

    // Phase 2: horizontal jitter
    tl.add({
      targets: container,
      translateX: [-6, 4, -3, 2, 0],
      skewX: [2, -1, 0.5, 0],
      duration: 300,
      easing: "steps(6)",
    });

    // Phase 3: color flash
    tl.add({
      targets: container,
      filter: ["brightness(3) saturate(0)", "brightness(1) saturate(1)"],
      duration: 250,
      easing: "steps(4)",
      complete: () => setIsScanned(true),
    });
  }, [isScanned]);

  const handleHover = useCallback(
    (event: ChartEvent, elements: ActiveElement[]) => {
      if (!elements.length || !chartRef.current) {
        setHoveredPoint(null);
        return;
      }

      const el = elements[0];
      const datasetIndex = el.datasetIndex;
      const index = el.index;
      const chart = chartRef.current;
      const meta = chart.getDatasetMeta(datasetIndex);
      const point = meta.data[index];

      const datasetLabel = chart.data.datasets[datasetIndex]?.label ?? "";
      const label = chart.data.labels?.[index] as string ?? "";
      const value = (chart.data.datasets[datasetIndex]?.data?.[index] as number) ?? 0;

      setHoveredPoint({
        label,
        datasetLabel,
        value,
        x: point.x,
        y: point.y,
      });

      // Update Floating UI reference to the chart-relative position
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        refs.setReference({
          getBoundingClientRect: () => ({
            x: rect.left + point.x,
            y: rect.top + point.y,
            width: 12,
            height: 12,
            top: rect.top + point.y,
            right: rect.left + point.x + 12,
            bottom: rect.top + point.y + 12,
            left: rect.left + point.x,
          }),
          getClientRects: () => [
            {
              x: rect.left + point.x,
              y: rect.top + point.y,
              width: 12,
              height: 12,
              top: rect.top + point.y,
              right: rect.left + point.x + 12,
              bottom: rect.top + point.y + 12,
              left: rect.left + point.x,
            },
          ],
        });
      }
    },
    [refs]
  );

  const handleLeave = useCallback(() => {
    setHoveredPoint(null);
  }, []);

  // Merge onHover into options
  const chartOpts: ChartOptions<"radar"> = {
    ...CHART_OPTIONS,
    onHover: handleHover,
  };

  const meta = hoveredPoint ? SKILL_META[hoveredPoint.label] : null;

  return (
    <div className="skill-diagnostic-container" ref={containerRef}>
      {/* Header */}
      <div className="skill-diagnostic-header">
        <span className="skill-diagnostic-title">&gt; Skill Diagnostic v2.0</span>
        <div className="skill-diagnostic-legend">
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: "#3B82F6" }} />
            Proficiency
          </span>
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: "#FFFFFF" }} />
            Interest
          </span>
          <span className="legend-item">
            <span className="legend-swatch" style={{ background: "#404040", border: "1px dashed #3B82F6" }} />
            Yrs Active
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="skill-diagnostic-chart">
        <Radar
          ref={chartRef}
          data={DATA}
          options={chartOpts}
          onMouseLeave={handleLeave}
        />
      </div>

      {/* Scan overlay for glitch entrance */}
      <div className={`skill-diagnostic-scanline ${isScanned ? "skill-diagnostic-scanline--done" : ""}`} />

      {/* Floating UI tooltip for hovered point — neobrutalist window */}
      {hoveredPoint && meta && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="diagnostic-status-box"
          >
            <div className="diagnostic-status-header">
              <span className="diagnostic-status-skill">{hoveredPoint.label}</span>
              <span className="diagnostic-status-level">{meta.level}</span>
            </div>
            <div className="diagnostic-status-body">
              <div className="diagnostic-status-row">
                <span className="diagnostic-status-label">{hoveredPoint.datasetLabel}:</span>
                <span className="diagnostic-status-value">{hoveredPoint.value}/100</span>
              </div>
              <div className="diagnostic-status-row">
                <span className="diagnostic-status-label">Years:</span>
                <span className="diagnostic-status-value">{meta.years}Y</span>
              </div>
              <div className="diagnostic-status-divider" />
              <div className="diagnostic-status-subskills">
                <span className="diagnostic-status-subskills-label">&gt; Sub-skills:</span>
                {meta.subSkills.map((s) => (
                  <span key={s} className="diagnostic-subskill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="diagnostic-status-footer">
              <span>skill://diag/{hoveredPoint.label.toLowerCase()}</span>
            </div>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
