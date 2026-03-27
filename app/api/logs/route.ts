import { NextResponse } from "next/server";

interface LogEntry {
  level: string;
  source: string;
  message: string;
  stack?: string;
  timestamp: string;
}

const MAX_LOGS = 200;
const logs: LogEntry[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const entry: LogEntry = {
      level: body.level || "error",
      source: body.source || "unknown",
      message: typeof body.message === "string" ? body.message.slice(0, 500) : "No message",
      stack: typeof body.stack === "string" ? body.stack.slice(0, 2000) : undefined,
      timestamp: body.timestamp || new Date().toISOString(),
    };

    logs.push(entry);

    // Ring buffer
    if (logs.length > MAX_LOGS) {
      logs.splice(0, logs.length - MAX_LOGS);
    }

    // Console output for dev
    if (process.env.NODE_ENV === "development") {
      console.log(`[CLIENT ${entry.level.toUpperCase()}] [${entry.source}] ${entry.message}`);
    }

    return NextResponse.json({ ok: true, count: logs.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    count: logs.length,
    logs: logs.slice(-50),
  });
}
