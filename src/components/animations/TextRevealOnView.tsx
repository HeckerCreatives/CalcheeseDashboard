"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type TextRevealOnViewProps = {
  text: string
  className?: string
  delay?: number
}

export default function TextRevealOnView({ text, className = "", delay = 0.8 }: TextRevealOnViewProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" })

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  }

  return (
    <motion.p
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-1">
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
