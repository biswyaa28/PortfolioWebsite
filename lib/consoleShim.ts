/**
 * Console Shim — Development-only bridge
 * Captures console.error/warn and forwards to /api/logs
 * Only activates in development mode
 */

let installed = false;

export function installConsoleShim() {
  if (installed) return;
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "development") return;

  installed = true;

  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: unknown[]) => {
    originalError.apply(console, args);
    sendToLogEndpoint("error", args);
  };

  console.warn = (...args: unknown[]) => {
    originalWarn.apply(console, args);
    sendToLogEndpoint("warn", args);
  };

  console.log("[ConsoleShim] Development log bridge installed");
}

function sendToLogEndpoint(level: string, args: unknown[]) {
  const message = args
    .map((a) => {
      if (a instanceof Error) return `${a.name}: ${a.message}`;
      if (typeof a === "object") {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    })
    .join(" ")
    .slice(0, 500);

  const stack = args.find((a) => a instanceof Error)?.stack;

  fetch("/api/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      level,
      source: "console.shim",
      message,
      stack: stack?.slice(0, 2000),
      timestamp: new Date().toISOString(),
    }),
    keepalive: true,
  }).catch(() => {});
}
