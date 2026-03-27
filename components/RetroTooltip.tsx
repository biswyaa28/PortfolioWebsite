"use client";

import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
  shift,
  arrow,
  FloatingPortal,
  type Placement,
} from "@floating-ui/react";
import { useState, useRef, type ReactNode } from "react";

interface RetroTooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: Placement;
}

export default function RetroTooltip({
  children,
  content,
  placement = "top",
}: RetroTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(12), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]];

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
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="retro-tooltip"
          >
            {content}
            <div
              ref={arrowRef}
              className="retro-tooltip-arrow"
              style={{
                [staticSide as string]: "-6px",
              }}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
