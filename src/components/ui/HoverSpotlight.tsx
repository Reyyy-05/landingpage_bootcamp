"use client";

import React, { useRef } from "react";

interface HoverSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string; // e.g. "rgba(139, 92, 246, 0.15)"
  glowSize?: number;  // size in px
}

export function HoverSpotlight({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.12)",
  glowSize = 300,
  ...props
}: HoverSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
    if (!rectRef.current || !containerRef.current) return;

    const x = e.clientX - rectRef.current.left;
    const y = e.clientY - rectRef.current.top;

    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group/spotlight ${className}`}
      style={
        {
          "--glow-color": glowColor,
          "--glow-size": `${glowSize}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Spotlight Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 spotlight-glow z-10"
        style={{
          background: `radial-gradient(var(--glow-size) circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--glow-color), transparent 85%)`,
        }}
      />
      {children}
    </div>
  );
}
