"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorFollowerProps = {
  children: React.ReactNode;
  sensitivity?: number;
  className?: string;
};

export default function CursorFollower({
  children,
  sensitivity = 0.08,
  className = "",
  
}: CursorFollowerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 10 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 10 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const moveHandler = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cursorOffsetX = e.clientX - (rect.left + rect.width / 2);
      const cursorOffsetY = e.clientY - (rect.top + rect.height / 2);

      cursorX.set(cursorOffsetX * sensitivity );
      cursorY.set(cursorOffsetY * sensitivity);
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      window.addEventListener("mousemove", moveHandler);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      window.removeEventListener("mousemove", moveHandler);
      cursorX.set(0);
      cursorY.set(0);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", moveHandler);
    };
  }, [cursorX, cursorY, sensitivity]);

  return (
    <div ref={containerRef} className="">
      <motion.div
        className={` ${className}`}
        style={{
          x: springX,
          y: springY,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
