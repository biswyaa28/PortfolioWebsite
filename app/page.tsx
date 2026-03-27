"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ErrorBoundary from '@/components/ErrorBoundary';
import GlobalErrorHandler from '@/components/GlobalErrorHandler';
import DebugOverlay from '@/components/DebugOverlay';
import SkeletonLoader from '@/components/SkeletonLoader';
import { ConsoleLoggerProvider, useConsoleLogger } from '@/lib/ConsoleLogger';
import { installConsoleShim } from '@/lib/consoleShim';

const Projects = dynamic(() => import('@/components/Projects'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center py-20 px-4"><SkeletonLoader variant="card" count={3} className="max-w-6xl mx-auto w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6" /></div>,
});

const Skills = dynamic(() => import('@/components/Skills'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center py-20 px-4"><SkeletonLoader variant="chart" className="max-w-6xl mx-auto w-full" /></div>,
});

const GitHubActivity = dynamic(() => import('@/components/GitHubActivity'), {
  ssr: false,
  loading: () => <div className="py-24 px-6"><div className="max-w-6xl mx-auto"><SkeletonLoader variant="card" count={3} /></div></div>,
});

const Blog = dynamic(() => import('@/components/Blog'), {
  ssr: false,
  loading: () => <div className="min-h-screen pt-32 pb-20 px-4"><div className="max-w-3xl mx-auto"><SkeletonLoader variant="card" count={1} /></div></div>,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  ssr: false,
  loading: () => <div className="min-h-screen pt-32 pb-20 px-4"><div className="max-w-4xl mx-auto"><SkeletonLoader variant="card" count={2} /></div></div>,
});

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const SystemConsole = dynamic(() => import('@/components/SystemConsole'), { ssr: false });

function PageContent() {
  const { log } = useConsoleLogger();

  useEffect(() => {
    installConsoleShim();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              log("PAGE", `Section "${id}" module loaded`);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => { observer.observe(section); });
    return () => observer.disconnect();
  }, [log]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest("button, a[href], [role='button']");
      if (btn) {
        const label =
          btn.getAttribute("aria-label") ||
          btn.getAttribute("href") ||
          btn.textContent?.trim().slice(0, 40) ||
          "unnamed";
        log("CLICK", `Element "${label}" interacted`);
      }
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [log]);

  return (
    <main className="relative page-with-console">
      <GlobalErrorHandler />
      <Navigation />
      <ErrorBoundary moduleName="Hero">
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary moduleName="About">
        <About />
      </ErrorBoundary>
      <ErrorBoundary moduleName="Projects">
        <Projects />
      </ErrorBoundary>
      <ErrorBoundary moduleName="Skills">
        <Skills />
      </ErrorBoundary>
      <ErrorBoundary moduleName="GitHub Activity">
        <GitHubActivity />
      </ErrorBoundary>
      <ErrorBoundary moduleName="Blog">
        <Blog />
      </ErrorBoundary>
      <ErrorBoundary moduleName="Contact">
        <Contact />
      </ErrorBoundary>
      <Footer />
      <SystemConsole />
      <DebugOverlay />
    </main>
  );
}

export default function Home() {
  return (
    <ConsoleLoggerProvider>
      <PageContent />
    </ConsoleLoggerProvider>
  );
}
