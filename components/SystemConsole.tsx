"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import anime from "animejs";
import { useConsoleLogger } from "@/lib/ConsoleLogger";
import { DateTime } from "luxon";

const MAX_LINES = 64;

export default function SystemConsole() {
  const { logs, log } = useConsoleLogger();
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoggedInit, setHasLoggedInit] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const prevLogCount = useRef(0);

  // Log page enter on mount
  useEffect(() => {
    if (!hasLoggedInit) {
      const ts = DateTime.now().toFormat("HH:mm:ss");
      log("SYSTEM", `Session initialized at ${ts}`);
      log("SYSTEM", "Portfolio modules loading...");
      setTimeout(() => log("SYSTEM", "All modules loaded. System ready."), 400);
      setHasLoggedInit(true);
    }
  }, [hasLoggedInit, log]);

  // Anime.js scroll-up on new log entry
  useEffect(() => {
    if (logs.length <= prevLogCount.current) return;
    prevLogCount.current = logs.length;

    const body = bodyRef.current;
    if (!body) return;

    // Animate the body to scroll to bottom with a stepped feel
    anime({
      targets: body,
      scrollTop: body.scrollHeight,
      duration: 200,
      easing: "steps(4)",
    });

    // Flash the latest line
    const lines = body.querySelectorAll(".console-line");
    const lastLine = lines[lines.length - 1];
    if (lastLine) {
      anime({
        targets: lastLine,
        opacity: [0, 1, 0.6, 1],
        translateX: [-2, 1, 0],
        duration: 250,
        easing: "steps(4)",
      });
    }
  }, [logs.length]);

  const toggleConsole = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      log("SYSTEM", next ? "Console expanded" : "Console collapsed");
      return next;
    });
  }, [log]);

  const visibleLogs = logs.slice(-MAX_LINES);

  return (
    <div className={`system-console ${isOpen ? "system-console--open" : ""}`}>
      {/* Toggle bar */}
      <button
        className="system-console-toggle"
        onClick={toggleConsole}
        type="button"
        aria-label={isOpen ? "Collapse console" : "Expand console"}
      >
        <span className="system-console-toggle-indicator">
          {isOpen ? "▼" : "▲"}
        </span>
        <span className="system-console-toggle-label">
          SYS_CONSOLE [{visibleLogs.length}]
        </span>
        <span className="system-console-toggle-status">
          ● ACTIVE
        </span>
      </button>

      {/* Console body */}
      <div className="system-console-body" ref={bodyRef}>
        {visibleLogs.length === 0 && (
          <div className="console-line console-line--empty">
            <span className="console-timestamp">--:--:--</span>
            <span className="console-tag">IDLE</span>
            <span className="console-message">Awaiting system events...</span>
          </div>
        )}
        {visibleLogs.map((entry) => (
          <div key={entry.id} className="console-line">
            <span className="console-timestamp">[{entry.timestamp}]</span>
            <span className={`console-tag console-tag--${entry.tag.toLowerCase()}`}>
              {entry.tag}:
            </span>
            <span className="console-message">{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
