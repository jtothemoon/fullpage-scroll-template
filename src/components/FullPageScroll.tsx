"use client"

import { useEffect, useRef, useState } from 'react'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ScrollHint from './ScrollHint'
import DotNavigation from './DotNavigation'
import { ScrollToTopProvider } from './contexts/ScrollToTopContext'

export function FullPageScroll({ children }: { children: React.ReactNode }) {
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
    const timer = setTimeout(() => {
      if (currentSlide === 0) {
        setShowScrollHint(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [currentSlide])

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

  const handleScrollToTop = () => {
    if (emblaApi) {
      const currentIndex = emblaApi.selectedScrollSnap()
      emblaApi.scrollTo(0)
      
      // 이미 첫 번째 섹션에 있었다면 스크롤 힌트를 숨기지 않음
      if (currentIndex !== 0) {
        setShowScrollHint(false)
      }
    }
  }

  const childrenArray = React.Children.toArray(children)
  const [headerComponent, ...scrollSections] = childrenArray

  return (
    <ScrollToTopProvider onScrollToTop={handleScrollToTop}>
      {headerComponent}
      <div className="h-dvh overflow-hidden touch-pan-y" ref={emblaRef}>
        <div className="flex flex-col h-full">
          {scrollSections.map((child, index) => (
            <div key={index} className="flex-none h-dvh w-full">
              {child}
            </div>
          ))}
        </div>
      </div>
      
      <ScrollHint isVisible={showScrollHint} />
      <DotNavigation 
        totalSlides={scrollSections.length}
        currentSlide={currentSlide}
        onSlideClick={handleDotClick}
      />
    </ScrollToTopProvider>
  )
}