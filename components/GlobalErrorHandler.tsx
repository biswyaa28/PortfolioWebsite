"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

export default function GlobalErrorHandler() {
  useEffect(() => {
    // Intercept fetch failures
    const originalFetch = window.fetch;
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok && response.status >= 500) {
          handleNetworkError(`Server error: ${response.status}`);
        }
        return response;
      } catch (err) {
        handleNetworkError(
          err instanceof Error ? err.message : "Network request failed"
        );
        throw err;
      }
    };

    // Global unhandledrejection
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (
        reason instanceof TypeError &&
        (reason.message.includes("fetch") || reason.message.includes("network"))
      ) {
        handleNetworkError(reason.message);
      }
    };

    // Global error
    const handleError = (event: ErrorEvent) => {
      console.error("[GlobalError]", event.message, event.filename, event.lineno);
      sendToLogs("error", "window.onerror", event.message);
    };

    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.fetch = originalFetch;
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  return null;
}

function handleNetworkError(message: string) {
  // Avoid duplicate alerts
  if (document.querySelector(".swal2-container")) return;

  sendToLogs("error", "network", message);

  Swal.fire({
    background: "#121212",
    color: "#FF4141",
    title: "UPLINK LOST",
    html: `
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #a0a0a0;">
        <p>Check your connection and retry.</p>
        <pre style="background: #0A0A0A; border: 1px solid #FF4141; padding: 8px; margin-top: 12px; text-align: left; color: #FF4141; font-size: 10px;">ERR: ${escapeHtml(message)}</pre>
      </div>
    `,
    confirmButtonText: "RETRY",
    buttonsStyling: false,
    customClass: {
      popup: "transmit-popup transmit-popup--error",
      title: "transmit-title transmit-title--error",
      confirmButton: "transmit-btn transmit-btn--error",
      actions: "transmit-actions",
    },
    allowOutsideClick: false,
  });
}

function sendToLogs(level: string, source: string, message: string) {
  if (typeof window === "undefined") return;
  fetch("/api/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      level,
      source,
      message,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {});
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
