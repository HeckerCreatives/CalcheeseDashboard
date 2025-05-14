"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

type TextRevealProps = {
  text: string
  className?: string
}

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  // This state tracks the current text to animate
  const [currentText, setCurrentText] = useState(text)

  // Update the current text when the text prop changes
  useEffect(() => {
    setCurrentText(text)
  }, [text])

  const characters = Array.from(currentText)

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.04 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  }

  return (
    <div className={` ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          className="flex"
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {characters.map((character, index) => (
            <motion.span
              key={`${currentText}-${index}`}
              variants={child}
              className=""
              style={{
                width: character === " " ? "0.3em" : "auto",
                marginRight: character === " " ? 0 : "0.01em",
              }}
            >
              {character === " " ? "\u00A0" : character}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
