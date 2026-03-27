"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  // Typewriter effect using Anime.js
  useEffect(() => {
    const el = titleRef.current;
    const cursor = cursorRef.current;
    const quote = quoteRef.current;
    if (!el || !cursor) return;

    const fullText = "Biswajeet Rout";
    const quoteText = '> "Securing the Digital Frontier, One Line of Code at a Time."';
    el.textContent = "";
    el.style.visibility = "visible";
    if (quote) {
      quote.textContent = "";
      quote.style.visibility = "visible";
    }

    // Animate the cursor blink
    anime({
      targets: cursor,
      opacity: [1, 0],
      duration: 400,
      easing: "steps(2)",
      loop: true,
      direction: "alternate",
    });

    // Typewriter: reveal one character at a time
    const timeline = anime.timeline({ delay: 300 });

    for (let i = 0; i < fullText.length; i++) {
      timeline.add({
        targets: {},
        duration: 80 + Math.random() * 40,
        easing: "linear",
        complete: () => {
          el.textContent = fullText.slice(0, i + 1);
        },
      });
    }

    // After name finishes, pause then type the quote
    timeline.add({
      targets: {},
      duration: 400,
      easing: "linear",
    });

    if (quote) {
      for (let i = 0; i < quoteText.length; i++) {
        timeline.add({
          targets: {},
          duration: 25 + Math.random() * 20,
          easing: "linear",
          complete: () => {
            if (quote) quote.textContent = quoteText.slice(0, i + 1);
          },
        });
      }
    }

    // After typing finishes, keep cursor blinking for a bit then stop
    timeline.add(
      {
        targets: cursor,
        opacity: 0,
        duration: 2000,
        delay: 1500,
        easing: "linear",
        complete: () => {
          cursor.style.display = "none";
        },
      },
      "+=200"
    );
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* System Window Container */}
      <div className="system-window relative z-10 w-full max-w-4xl mx-4">
        {/* Window Title Bar */}
        <div className="window-title-bar">
          <div className="flex gap-1.5">
            <div className="window-control-btn" />
            <div className="window-control-btn" />
            <div className="window-control-btn window-control-btn--close" />
          </div>
          <span className="window-title-text">~/biswajeet-portfolio -- bash</span>
        </div>

        {/* Window Body */}
        <div className="window-body-scanlines relative p-10 md:p-16 text-center">
          {/* Title with typewriter */}
          <h1
            ref={titleRef}
            className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl text-cyber-blue font-mono min-h-[3.5rem] md:min-h-[5rem]"
            style={{ visibility: "hidden" }}
          >
            Biswajeet Rout
          </h1>
          <span
            ref={cursorRef}
            className="typewriter-cursor"
            style={{ height: "1em", display: "inline-block", verticalAlign: "text-bottom" }}
          />

          {/* Subtitle with glitch/flicker */}
          <h2
            className="glitch-flicker mb-6 text-lg text-cyber-blue md:text-2xl mt-4 font-mono"
            data-text="Cybersecurity Engineer & BTech CSE Student"
          >
            Cybersecurity Engineer & BTech CSE Student
          </h2>

          {/* Quote — typed character-by-character after name finishes */}
          <p
            ref={quoteRef}
            className="mx-auto mb-10 max-w-xl text-sm text-gray-light font-mono md:text-base leading-relaxed min-h-[1.5rem]"
            style={{ visibility: "hidden" }}
          />

          {/* 8-bit CTA Button */}
          <button
            onClick={scrollToProjects}
            className="btn-8bit hero-cta-btn"
            type="button"
          >
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
}
