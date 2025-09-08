"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ScrollHint from './ScrollHint'
import DotNavigation from './DotNavigation'
import { ScrollToTopProvider } from './contexts/ScrollToTopContext'

export function FullPageScroll({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    axis: 'y', 
    loop: true,
    duration: 50, // fullpage.js 초고속
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    inViewThreshold: 0.7,
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const isScrolling = useRef(false)
  const scrollAccumulator = useRef(0)
  const lastWheelTime = useRef(0)
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null)
  const threshold = 70 // 임계값을 낮춰서 더 민감하게 반응
  const scrollCooldown = useRef(0) // 스크롤 쿨다운 관리

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
      
      const now = Date.now()
      
      // 쿨다운 체크 - 거의 즉시
      if (now - scrollCooldown.current < 10) {
        return
      }
      
      if (isScrolling.current || !emblaApi) return
      
      const timeDelta = now - lastWheelTime.current
      
      // 기존 timeout 정리
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current)
      }
      
      // 아이패드 트랙패드 관성 스크롤 감지
      const isIPadTrackpad = Math.abs(e.deltaY) < 10
      const isInertialScroll = isIPadTrackpad && timeDelta > 150
      
      // 관성 스크롤이면 무시
      if (isInertialScroll) {
        return
      }
      
      lastWheelTime.current = now
      scrollAccumulator.current += e.deltaY
      
      if (Math.abs(scrollAccumulator.current) >= threshold) {
        isScrolling.current = true
        scrollCooldown.current = now
        
        if (scrollAccumulator.current > 0) {
          emblaApi.scrollNext()
        } else {
          emblaApi.scrollPrev()
        }
        
        scrollAccumulator.current = 0
        
        // fullpage.js 초고속
        const waitTime = isIPadTrackpad ? 150 : 100
        
        setTimeout(() => {
          isScrolling.current = false
        }, waitTime)
      } else {
        // 임계값에 도달하지 않았을 때, 일정 시간 후 accumulator 리셋
        wheelTimeout.current = setTimeout(() => {
          scrollAccumulator.current = 0
        }, 150)
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleWheel)
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current)
      }
    }
  }, [emblaApi])


  const handleDotClick = useCallback((index: number) => {
    if (emblaApi && !isScrolling.current) {
      isScrolling.current = true
      emblaApi.scrollTo(index)
      setTimeout(() => {
        isScrolling.current = false
      }, 500)
    }
  }, [emblaApi])


  const handleScrollToTop = useCallback(() => {
    if (emblaApi && !isScrolling.current) {
      isScrolling.current = true
      const currentIndex = emblaApi.selectedScrollSnap()
      emblaApi.scrollTo(0)
      
      // 이미 첫 번째 섹션에 있었다면 스크롤 힌트를 숨기지 않음
      if (currentIndex !== 0) {
        setShowScrollHint(false)
      }
      
      setTimeout(() => {
        isScrolling.current = false
      }, 500)
    }
  }, [emblaApi])

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