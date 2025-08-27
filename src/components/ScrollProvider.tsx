"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import { LenisProvider } from './LenisProvider'

interface ScrollProviderProps {
  children: React.ReactNode
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  // 헤더 스타일 관리를 위한 CSS 클래스 토글
  const updateHeaderStyles = useCallback((isMain: boolean) => {
    const header = document.querySelector('header')
    if (!header) return

    if (isMain) {
      // 메인 페이지: fixed 헤더 + backdrop blur
      header.classList.add('header-fixed', 'header-backdrop')
      header.classList.remove('header-relative')
      
      // body overflow hidden
      document.body.classList.add('body-overflow-hidden')
      document.body.classList.remove('body-overflow-auto')
    } else {
      // 서브 페이지: relative 헤더
      header.classList.add('header-relative')
      header.classList.remove('header-fixed', 'header-backdrop')
      
      // body overflow auto
      document.body.classList.add('body-overflow-auto')
      document.body.classList.remove('body-overflow-hidden')
    }
  }, [])

  useEffect(() => {
    updateHeaderStyles(isMainPage)

    return () => {
      // cleanup: 기본 상태로 복원
      updateHeaderStyles(false)
    }
  }, [isMainPage, updateHeaderStyles])

  // 메인 페이지는 풀페이지 스크롤, 다른 페이지는 Lenis 스크롤
  if (isMainPage) {
    return <>{children}</>
  }

  return <LenisProvider>{children}</LenisProvider>
}