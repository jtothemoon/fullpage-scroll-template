"use client"

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { LenisProvider } from './LenisProvider'

interface ScrollProviderProps {
  children: React.ReactNode
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  useEffect(() => {
    // 페이지별 body overflow 설정
    if (isMainPage) {
      document.body.style.overflow = 'hidden'
      // 메인 페이지에서는 헤더를 fixed로 변경
      const header = document.querySelector('header')
      if (header) {
        header.style.position = 'fixed'
        header.style.top = '0'
        header.style.left = '0'
        header.style.right = '0'
        header.style.backgroundColor = 'hsl(var(--background) / 0.95)'
        header.style.backdropFilter = 'blur(8px)'
      }
    } else {
      document.body.style.overflow = 'auto'
      // 서브 페이지에서는 헤더를 relative로 변경
      const header = document.querySelector('header')
      if (header) {
        header.style.position = 'relative'
        header.style.backgroundColor = 'hsl(var(--background))'
        header.style.backdropFilter = 'none'
      }
    }

    return () => {
      document.body.style.overflow = 'auto'
      const header = document.querySelector('header')
      if (header) {
        header.style.position = 'relative'
        header.style.backgroundColor = 'hsl(var(--background))'
        header.style.backdropFilter = 'none'
      }
    }
  }, [isMainPage])

  // 메인 페이지는 풀페이지 스크롤, 다른 페이지는 Lenis 스크롤
  if (isMainPage) {
    return <>{children}</>
  }

  return <LenisProvider>{children}</LenisProvider>
}