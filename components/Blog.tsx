"use client";

import { motion } from "framer-motion";

const BLOG_TAGS = [
  "Cybersecurity Tips",
  "C++ Tutorials",
  "Network Security",
  "Project Walkthroughs",
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="breadcrumb-trail">
          <span className="breadcrumb-item">ROOT</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-item breadcrumb-item--active">BLOG</span>
        </div>

        <div className="text-center mb-12">
          <h2 className="section-heading text-3xl md:text-4xl text-foreground">
            Blog & Articles
          </h2>
          <span className="inventory-count">SOON</span>
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="system-window">
            <div className="window-title-bar">
              <div className="flex gap-1.5">
                <div className="window-control-btn" />
                <div className="window-control-btn" />
              </div>
              <span className="window-title-text">~/blog -- coming_soon</span>
            </div>

            <div className="p-12 text-center">
              {/* Skeleton preview cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {[0, 1].map((i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="border border-stone-800 bg-stone-900/50 p-4"
                  >
                    <div className="codex-skeleton-line w-3/4 mb-3" />
                    <div className="codex-skeleton-line w-full" />
                    <div className="codex-skeleton-line codex-skeleton-line--short" />
                    <div className="flex gap-2 mt-4">
                      <div className="h-5 w-16 bg-stone-800" />
                      <div className="h-5 w-12 bg-stone-800" />
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 font-mono text-foreground">
                Coming Soon
              </h3>
              <p className="text-gray-light mb-8 max-w-xl mx-auto leading-relaxed">
                I&apos;m working on sharing my knowledge and experiences in
                cybersecurity, programming, and technology. Stay tuned for
                insightful articles and tutorials!
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {BLOG_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="command-block"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
