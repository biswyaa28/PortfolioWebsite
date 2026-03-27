"use client";

import React, { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  moduleName: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorCode: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorCode: "0000" };
  }

  static getDerivedStateFromError(error: Error): State {
    const code = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
    return { hasError: true, error, errorCode: code };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ErrorBoundary] ${this.props.moduleName} crashed:`, error, errorInfo);
    // Send to logs API if available
    if (typeof window !== "undefined") {
      fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: "error",
          source: `ErrorBoundary:${this.props.moduleName}`,
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-card">
          <div className="error-boundary-header">
            <span className="error-boundary-dot" />
            <span className="error-boundary-label">SYSTEM FAILURE</span>
          </div>
          <div className="error-boundary-body">
            <pre className="error-boundary-code">
{`╔══════════════════════════════════════╗
║  MODULE_NOT_FOUND                    ║
╠══════════════════════════════════════╣
║  ${this.props.moduleName.padEnd(35)}║
║  Status: CRITICAL                    ║
║  Code: 0x${this.state.errorCode}                         ║
╠══════════════════════════════════════╣
║  ${(this.state.error?.message ?? "Unknown error").slice(0, 35).padEnd(35)}║
╠══════════════════════════════════════╣
║  ACTION: Refresh page or report bug  ║
╚══════════════════════════════════════╝`}
            </pre>
            <button
              className="error-boundary-retry"
              onClick={() => this.setState({ hasError: false, error: null, errorCode: "0000" })}
              type="button"
            >
              RETRY MODULE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
