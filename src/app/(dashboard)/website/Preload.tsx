'use client'

import React, { useEffect, useState } from 'react'
import LandingPage from './LandingPage'

const imageUrls: string[] = [
  "/assets/BG.png",
  "/assets/Top TAB.png",
  "/assets/CalCheese World Logo.png",
  "/assets/Title HOLDER.png",
  "/assets/Big TAB.png",
  "/assets/Description BUTTON.png",
  "/assets/What's New BUTTON.png",
  "/assets/Min Game BUTTON.png",
  "/assets/Rewards BUTTON.png",
  "/assets/Follow Us on BUTTON.png",
  "/assets/Floating Triangle BOT/Triangle A.png",
  "/assets/Floating Triangle BOT/Triangle B.png",
  "/assets/Floating Triangle BOT/Triangle C.png",
  "/assets/Floating Triangle BOT/Triangle D.png",
  "/assets/Floating Triangle BOT/Triangle E.png",
  "/assets/Calvin.png",
  "/assets/Wafer.png",
  "/assets/Floating Triangle TOP/Triangle A.png",
  "/assets/Floating Triangle TOP/Triangle B.png",
  "/assets/Floating Triangle TOP/Triangle C.png",
  "/assets/Floating Triangle TOP/Triangle D.png",
  "/assets/Floating Triangle TOP/Triangle E.png",
  "/assets/Floating Triangle TOP/Triangle F.png",
]

export default function PreloadMain() {
  const [loadedCount, setLoadedCount] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)
  const [enter, setEnter] = useState(false)
  const [logo, setLogo] = useState(false)

  const totalImages = imageUrls.length
  const progress = Math.min((loadedCount / totalImages) * 100, 100)

   if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('imagesPreloaded', 'false')
    })
  }

  useEffect(() => {
   
    const preloadFlag = sessionStorage.getItem('imagesPreloaded')

    if (preloadFlag === 'true') {
      // Images were already preloaded this session
      setLoadedCount(totalImages)
      setAllLoaded(true)
      return
    }

    let isMounted = true

    imageUrls.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = img.onerror = () => {
        if (!isMounted) return
        setLoadedCount((prev) => {
          const next = prev + 1
          if (next === totalImages) {
            setAllLoaded(true)
            sessionStorage.setItem('imagesPreloaded', 'true')
          }
          return next
        })
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="w-full max-w-[1920px] h-auto bg-white overflow-hidden text-amber-900">
      {!allLoaded || !enter ? (
        <div
          className="w-full h-screen bg-white flex flex-col items-center justify-center gap-12 cursor-pointer"
          onClick={() => progress === 100 && setEnter(true)}
        >
          <img
            src="/assets/CalCheese World Logo.png"
            alt="logo"
            width={300}
            onLoad={() => setLogo(true)}
            className="w-[150px] lg:w-[300px]"
          />

          <div className="flex flex-col items-center justify-center gap-4">
            {(progress < 100 && logo) && (
              <div className="w-[300px] h-3 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <p
              className={`text-sm font-spenbeb ${
                progress < 100 ? 'text-gray-400' : 'text-blue-400 animate-pulse'
              }`}
            >
              {progress < 100
                ? `Loading... ${Math.round(progress)}%`
                : 'Click anywhere to enter'}
            </p>
          </div>
        </div>
      ) : (
        <LandingPage />
      )}
    </main>
  )
}
