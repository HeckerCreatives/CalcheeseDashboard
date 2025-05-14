"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type FloatImageProps = {
  children: React.ReactNode;
  className?: string;
  floatRange?: number;   // how far it floats vertically
  hoverRange?: number;   // how far it moves with the cursor
  duration?: number;     // duration of one float cycle
};

export default function FloatImage({
  children,
  className = "",
  floatRange = 10,
  hoverRange = 10,
  duration = 6, // default to 6s
}: FloatImageProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Floating animation
  useEffect(() => {
    controls.start({
      y: [0, -floatRange, 0, floatRange, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls, floatRange, duration]);

  // Cursor tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * hoverRange;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * hoverRange;

    setOffset({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        x: hovering ? offset.x : 0,
        y: hovering ? offset.y : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 12,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setOffset({ x: 0, y: 0 });
      }}
    >
      <motion.div animate={controls}>{children}</motion.div>
    </motion.div>
  );
}
