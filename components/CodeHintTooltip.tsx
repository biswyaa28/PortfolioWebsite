"use client";

import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  type Placement,
} from "@floating-ui/react";
import { useState, useCallback, type ReactNode } from "react";
import anime from "animejs";

interface CodeHintTooltipProps {
  children: ReactNode;
  hint: string;
  language?: string;
  placement?: Placement;
}

export default function CodeHintTooltip({
  children,
  hint,
  language = "bash",
  placement = "top",
}: CodeHintTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(10), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    delay: { open: 200, close: 0 },
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  // Glitch entrance animation via Anime.js — runs in ref callback so element is guaranteed mounted
  const handleFloatingRef = useCallback(
    (node: HTMLDivElement | null) => {
      refs.setFloating(node);
      if (node) {
        anime({
          targets: node,
          opacity: [0, 1, 0.7, 1],
          translateX: [-4, 3, -2, 1, 0],
          translateY: [2, -1, 1, 0],
          scaleX: [1.03, 0.97, 1.01, 1],
          duration: 350,
          easing: "steps(6)",
        });

        anime({
          targets: node.querySelector(".code-hint-scanline"),
          opacity: [0.6, 0],
          duration: 400,
          delay: 100,
          easing: "linear",
        });
      }
    },
    [refs]
  );

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className="inline-block"
      >
        {children}
      </span>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={handleFloatingRef}
            style={floatingStyles}
            {...getFloatingProps()}
            className="code-hint-tooltip"
          >
            <div className="code-hint-header">
              <span className="code-hint-lang">{language}</span>
            </div>
            <pre className="code-hint-code">
              <code>{hint}</code>
            </pre>
            <div className="code-hint-scanline" />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
