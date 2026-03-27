"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Stats {
  fps: number;
  memory: number;
}

export default function DebugOverlay() {
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState<Stats>({ fps: 0, memory: 0 });
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number>(0);

  // Listen for debug toggle event
  useEffect(() => {
    const handler = () => setVisible((v) => !v);
    window.addEventListener("debug-toggle", handler);
    return () => window.removeEventListener("debug-toggle", handler);
  }, []);

  // FPS counter
  const measureFPS = useCallback(() => {
    frameCount.current++;
    const now = performance.now();
    const delta = now - lastTime.current;

    if (delta >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / delta);
      const mem = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
      const memoryMB = mem ? Math.round(mem.usedJSHeapSize / 1048576) : 0;

      setStats({ fps, memory: memoryMB });
      frameCount.current = 0;
      lastTime.current = now;
    }

    rafId.current = requestAnimationFrame(measureFPS);
  }, []);

  useEffect(() => {
    if (!visible) return;
    rafId.current = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(rafId.current);
  }, [visible, measureFPS]);

  if (!visible) return null;

  const fpsColor = stats.fps >= 55 ? "#3B82F6" : stats.fps >= 30 ? "#FFD700" : "#FF4141";

  return (
    <div className="debug-overlay">
      <div className="debug-overlay-header">
        <span className="debug-overlay-title">DEBUG</span>
        <button
          className="debug-overlay-close"
          onClick={() => setVisible(false)}
          type="button"
          aria-label="Close debug"
        >
          ×
        </button>
      </div>
      <div className="debug-overlay-stats">
        <div className="debug-stat">
          <span className="debug-stat-label">FPS</span>
          <span className="debug-stat-value" style={{ color: fpsColor }}>
            {stats.fps}
          </span>
        </div>
        {stats.memory > 0 && (
          <div className="debug-stat">
            <span className="debug-stat-label">MEM</span>
            <span className="debug-stat-value">{stats.memory}MB</span>
          </div>
        )}
        <div className="debug-stat">
          <span className="debug-stat-label">UA</span>
          <span className="debug-stat-value debug-stat-value--small">
            {typeof navigator !== "undefined"
              ? navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] ??
                navigator.userAgent.match(/Firefox\/(\d+)/)?.[1] ??
                "?"
              : "?"}
          </span>
        </div>
      </div>
    </div>
  );
}
