import React, { useEffect, useRef } from 'react'

interface TrackedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadTracked: () => void
}

export default function TrackedImage({ onLoadTracked, ...props }: TrackedImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete) {
      onLoadTracked()
    }
  }, [])

  return <img ref={imgRef} onLoad={onLoadTracked} {...props} />
}
