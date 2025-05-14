"use client"

import { motion, useInView } from "framer-motion"
import { ReactNode, useRef } from "react"

type RevealOnScrollProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0.2,
  duration = 0.6,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" })

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
