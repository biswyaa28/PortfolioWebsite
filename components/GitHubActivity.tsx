"use client";

import { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { useConsoleLogger } from "@/lib/ConsoleLogger";

interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  repo: string;
  url: string;
}

interface GitHubActivityResult {
  commits: GitHubCommit[];
  diagnostics: {
    eventsChecked: number;
    pushEventsChecked: number;
    directCommitsUsed: number;
    headFallbacksUsed: number;
  };
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
    head?: string;
  };
  created_at: string;
}

interface GitHubCommitResponse {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
}

const GITHUB_USERNAME = "biswyaa28";

async function fetchCommitByHead(repoName: string, sha: string): Promise<GitHubCommit> {
  const res = await fetch(`https://api.github.com/repos/${repoName}/commits/${sha}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`GitHub commit API ${res.status}`);

  const data: GitHubCommitResponse = await res.json();

  return {
    sha: data.sha.slice(0, 7),
    message: data.commit.message.split("\n")[0].slice(0, 60),
    date: data.commit.author.date,
    repo: repoName.split("/")[1],
    url: data.html_url,
  };
}

async function fetchRecentCommits(): Promise<GitHubActivityResult> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`GitHub API ${res.status}`);

  const events: GitHubEvent[] = await res.json();
  const commits: GitHubCommit[] = [];
  const diagnostics = {
    eventsChecked: 0,
    pushEventsChecked: 0,
    directCommitsUsed: 0,
    headFallbacksUsed: 0,
  };

  for (const event of events) {
    diagnostics.eventsChecked += 1;

    if (event.type !== "PushEvent") {
      continue;
    }

    diagnostics.pushEventsChecked += 1;

    if (event.payload.commits?.length) {
      for (const commit of event.payload.commits) {
        if (commits.length >= 3) break;
        commits.push({
          sha: commit.sha.slice(0, 7),
          message: commit.message.split("\n")[0].slice(0, 60),
          date: event.created_at,
          repo: event.repo.name.split("/")[1],
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
        });
        diagnostics.directCommitsUsed += 1;
      }
    } else if (event.payload.head && commits.length < 3) {
      commits.push(await fetchCommitByHead(event.repo.name, event.payload.head));
      diagnostics.headFallbacksUsed += 1;
    }

    if (commits.length >= 3) break;
  }

  return { commits, diagnostics };
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function GitHubActivity() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { log } = useConsoleLogger();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchRecentCommits();
        if (!cancelled) {
          setCommits(result.commits);
          log(
            "GITHUB",
            `Feed loaded: ${result.commits.length} commits, ${result.diagnostics.directCommitsUsed} direct, ${result.diagnostics.headFallbacksUsed} head fallback`
          );

          if (result.commits.length === 0) {
            log(
              "GITHUB",
              `No commits parsed from ${result.diagnostics.pushEventsChecked} push events across ${result.diagnostics.eventsChecked} events`
            );
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to fetch GitHub data");
          log("ERROR", err instanceof Error ? `GitHub API fetch failed: ${err.message}` : "GitHub API fetch failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [log]);

  // Glitch entrance for cards
  useEffect(() => {
    if (loading || !cardsRef.current || commits.length === 0) return;

    const cards = cardsRef.current.querySelectorAll(".codex-card");
    if (!cards.length) return;

    anime({
      targets: cards,
      opacity: [0, 1, 0.5, 1],
      translateY: [12, -4, 2, 0],
      translateX: [-6, 3, -1, 0],
      duration: 400,
      delay: anime.stagger(120),
      easing: "steps(5)",
    });
  }, [loading, commits]);

  return (
    <section
      ref={sectionRef}
      id="github-activity"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="section-heading text-3xl md:text-4xl text-foreground">
            Activity
          </h2>
          <span className="inventory-count">GITHUB</span>
        </div>

        {/* Status Bar */}
        <div className="github-status-bar">
          <div className="github-status-left">
            <span className="github-live-dot" />
            <span className="github-status-text">Status:</span>
            <span className="github-status-value">Coding in Navi Mumbai</span>
          </div>
          <div className="github-status-right">
            <span className="github-status-handle">@{GITHUB_USERNAME}</span>
          </div>
        </div>

        {/* Codex Cards — horizontal scroll on mobile */}
        <div className="codex-scroll-container" ref={cardsRef}>
          {loading && (
            <>
              {[0, 1, 2].map((i) => (
                <div key={i} className="codex-card animate-pulse bg-stone-800 border border-stone-700">
                  <div className="codex-card-header mb-4 flex justify-between">
                    <div className="h-4 w-24 bg-stone-700 rounded" />
                    <div className="h-4 w-32 bg-stone-700 rounded" />
                  </div>
                  <div className="codex-card-body space-y-2">
                    <div className="h-3 w-full bg-stone-700 rounded" />
                    <div className="h-3 w-2/3 bg-stone-700 rounded" />
                  </div>
                  <div className="mt-4 text-xs text-muted-stone font-mono">
                    &gt; Retrieving system logs from GitHub...
                  </div>
                </div>
              ))}
            </>
          )}

          {!loading && error && (
            <div className="codex-card codex-card--error" style={{ padding: "2rem" }}>
              <div className="codex-card-header">
                <span className="codex-hash" style={{ color: "#FF4141" }}>ERR</span>
              </div>
              <div className="codex-card-body" style={{ padding: "1.5rem 1.25rem" }}>
                <p className="codex-message" style={{ color: "#FF4141" }}>{error}</p>
                <p className="codex-message" style={{ color: "#404040", marginTop: "0.75rem", fontSize: "10px" }}>
                  &gt; Retrying on next refresh cycle...
                </p>
              </div>
            </div>
          )}

          {!loading && !error && commits.length === 0 && (
            <div className="codex-card" style={{ padding: "2rem" }}>
              <div className="codex-card-header">
                <span className="codex-hash">INFO</span>
              </div>
              <div className="codex-card-body" style={{ padding: "1.5rem 1.25rem" }}>
                <p className="codex-message">No public GitHub activity is available right now.</p>
                <p className="codex-message" style={{ color: "#404040", marginTop: "0.75rem", fontSize: "10px" }}>
                  &gt; Waiting for the next public push event...
                </p>
              </div>
            </div>
          )}

          {!loading && !error && commits.map((commit, index) => (
            <a
              key={`${commit.sha}-${commit.repo}`}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="codex-card"
              style={{ border: "2px solid #1A1A1A", boxShadow: "none" }}
            >
              <div className="codex-card-header">
                <span className="codex-hash">{commit.sha}</span>
                <span className="codex-repo">{commit.repo}</span>
              </div>
              <div className="codex-card-body">
                <p className="codex-message">{commit.message}</p>
              </div>
              <div className="codex-card-footer">
                <span className="codex-time">{timeAgo(commit.date)}</span>
                <span className="codex-arrow">&gt;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
