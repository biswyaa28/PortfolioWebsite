"use client";

import { createContext, useContext, useCallback, useRef, useState, type ReactNode } from "react";
import { DateTime } from "luxon";

export interface LogEntry {
  id: number;
  timestamp: string;
  tag: string;
  message: string;
}

interface ConsoleLoggerContextValue {
  logs: LogEntry[];
  log: (tag: string, message: string) => void;
}

const ConsoleLoggerContext = createContext<ConsoleLoggerContextValue>({
  logs: [],
  log: () => {},
});

const MAX_LOGS = 200;

export function ConsoleLoggerProvider({ children }: { children: ReactNode }) {
  const logIdCounter = useRef(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const log = useCallback((tag: string, message: string) => {
    const ts = DateTime.now().toFormat("HH:mm:ss");
    const entry: LogEntry = {
      id: ++logIdCounter.current,
      timestamp: ts,
      tag: tag.toUpperCase(),
      message,
    };
    setLogs((prev) => {
      const next = [...prev, entry];
      return next.length > MAX_LOGS ? next.slice(-MAX_LOGS) : next;
    });
  }, []);

  return (
    <ConsoleLoggerContext.Provider value={{ logs, log }}>
      {children}
    </ConsoleLoggerContext.Provider>
  );
}

export function useConsoleLogger() {
  return useContext(ConsoleLoggerContext);
}
