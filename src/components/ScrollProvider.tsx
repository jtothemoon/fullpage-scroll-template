"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import { LenisProvider } from './LenisProvider'
import { HeaderThemeProvider, useHeaderTheme } from './contexts/HeaderThemeContext'

interface ScrollProviderProps {
  children: React.ReactNode
}

function MainPageScrollProvider({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useHeaderTheme()

  // 테마별 헤더 스타일 관리
  const updateHeaderTheme = useCallback((theme: string) => {
    const header = document.querySelector('header')
    if (!header) {
      return
    }

    // 기존 테마 클래스 제거
    header.classList.remove('header-fixed', 'header-backdrop', 'header-relative')
    header.classList.remove('theme-hero', 'theme-about', 'theme-contact')

    if (theme === 'hero') {
      // 히어로 섹션: 투명한 헤더
      header.classList.add('header-fixed', 'theme-hero')
    } else if (theme === 'about') {
      // 어바웃 섹션: muted 색상 테마
      header.classList.add('header-fixed', 'header-backdrop', 'theme-about')
    } else if (theme === 'contact') {
      // 콘택트 섹션: primary 색상 테마
      header.classList.add('header-fixed', 'header-backdrop', 'theme-contact')
    } else {
      // 기본: 일반 backdrop
      header.classList.add('header-fixed', 'header-backdrop')
    }

    // body overflow hidden (메인 페이지)
    document.body.classList.add('body-overflow-hidden')
    document.body.classList.remove('body-overflow-auto')
  }, [])

  useEffect(() => {
    updateHeaderTheme(currentTheme)
  }, [currentTheme, updateHeaderTheme])

  return <>{children}</>
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  // 메인 페이지는 풀페이지 스크롤, 다른 페이지는 Lenis 스크롤
  if (isMainPage) {
    return (
      <HeaderThemeProvider sections={[]}>
        <MainPageScrollProvider>{children}</MainPageScrollProvider>
      </HeaderThemeProvider>
    )
  }

  return <LenisProvider>{children}</LenisProvider>
}