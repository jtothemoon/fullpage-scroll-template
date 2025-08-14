"use client"

import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ScrollHint from './ScrollHint'
import DotNavigation from './DotNavigation'

export function FullPageScroll({ children }: { children: React.ReactNode[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    axis: 'y', 
    loop: true,
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const isScrolling = useRef(false)
  const scrollAccumulator = useRef(0)
  const threshold = 70

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
      setShowScrollHint(false)
    }

    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isScrolling.current || !emblaApi) return
      
      scrollAccumulator.current += e.deltaY
      
      if (Math.abs(scrollAccumulator.current) >= threshold) {
        isScrolling.current = true
        
        if (scrollAccumulator.current > 0) {
          emblaApi.scrollNext()
        } else {
          emblaApi.scrollPrev()
        }
        
        scrollAccumulator.current = 0
        
        setTimeout(() => {
          isScrolling.current = false
        }, 800)
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [emblaApi])

  const handleDotClick = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index)
    }
  }

  return (
    <>
      <div className="h-dvh overflow-hidden touch-pan-y" ref={emblaRef}>
        <div className="flex flex-col h-full">
          {children.map((child, index) => (
            <div key={index} className="flex-none h-dvh w-full">
              {child}
            </div>
          ))}
        </div>
      </div>
      
      <ScrollHint isVisible={showScrollHint} />
      <DotNavigation 
        totalSlides={children.length}
        currentSlide={currentSlide}
        onSlideClick={handleDotClick}
      />
    </>
  )
}