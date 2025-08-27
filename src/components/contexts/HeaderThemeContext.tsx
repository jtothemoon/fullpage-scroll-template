"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react'

export type HeaderTheme = 'default' | 'hero' | 'about' | 'contact'

interface HeaderThemeContextType {
  currentTheme: HeaderTheme
  setTheme: (theme: HeaderTheme) => void
}

const HeaderThemeContext = createContext<HeaderThemeContextType | undefined>(undefined)

interface HeaderThemeProviderProps {
  children: ReactNode
  sections: ReactNode[]
}

export function HeaderThemeProvider({ children, sections }: HeaderThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<HeaderTheme>('default')
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // DOM이 완전히 렌더링된 후 실행
    const timer = setTimeout(() => {
      // 섹션 요소들을 찾아서 ref 배열에 저장
      const sectionElements = document.querySelectorAll('section')
      sectionRefs.current = Array.from(sectionElements)

      if (sectionElements.length === 0) {
        return
      }

      // Intersection Observer 설정
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const section = entry.target as HTMLElement
              const sectionIndex = sectionRefs.current.findIndex(ref => ref === section)
              
              // 섹션 인덱스에 따라 테마 결정
              let theme: HeaderTheme = 'default'
              if (sectionIndex === 0) {
                theme = 'hero'
              } else if (sectionIndex === 1) {
                theme = 'about'
              } else if (sectionIndex === 2) {
                theme = 'contact'
              }
              
              setCurrentTheme(theme)
            }
          })
        },
        {
          threshold: 0.3, // 섹션이 30% 이상 보일 때 감지 (더 민감하게)
          rootMargin: '-10% 0px -10% 0px' // 헤더 높이를 고려한 여백 (더 작게)
        }
      )

      // 각 섹션을 관찰
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.observe(section)
        }
      })

      return () => {
        observer.disconnect()
      }
    }, 100) // 100ms 지연으로 DOM 렌더링 완료 대기

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const setTheme = (theme: HeaderTheme) => {
    setCurrentTheme(theme)
  }

  return (
    <HeaderThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export function useHeaderTheme() {
  const context = useContext(HeaderThemeContext)
  if (context === undefined) {
    throw new Error('useHeaderTheme must be used within a HeaderThemeProvider')
  }
  return context
}
