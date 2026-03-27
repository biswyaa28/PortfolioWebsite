"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const BTech_START = DateTime.fromISO("2025-10-01");

function getUptime(now: DateTime) {
  const diff = now.diff(BTech_START, ["years", "months", "days"]).toObject();
  const y = Math.floor(diff.years ?? 0);
  const m = Math.floor(diff.months ?? 0);
  const d = Math.floor(diff.days ?? 0);
  return `${y}Y ${m}M ${d}D`;
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [now, setNow] = useState<DateTime | null>(null);

  useEffect(() => {
    setNow(DateTime.now());
    const timer = setInterval(() => setNow(DateTime.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-white/5">
      {/* System Header Bar */}
      <nav className="system-header-bar">
        <div className="system-header-inner">
          {/* Left — SYS_STATUS */}
          <div className="system-header-left">
            <span className="system-header-dot" />
            <span className="system-header-status">SYS_STATUS:</span>
            <span className="system-header-status system-header-status--online">ONLINE</span>
          </div>

          {/* Center — Navigation pills */}
          <div className="system-header-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`system-header-tab ${
                  activeSection === item.id
                    ? "system-header-tab--active"
                    : ""
                }`}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right — Clock + Uptime */}
          <div className="system-header-right">
            {now ? (
              <>
                <span className="system-header-clock">{now.toFormat("HH:mm:ss")}</span>
                <span className="system-header-sep">|</span>
                <span className="system-header-uptime">{getUptime(now)}</span>
              </>
            ) : (
              <span className="system-header-clock">--:--:--</span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
