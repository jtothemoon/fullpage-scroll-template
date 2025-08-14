"use client"

import { createContext, useContext, ReactNode } from 'react'

interface ScrollToTopContextType {
  scrollToTop: () => void
}

const ScrollToTopContext = createContext<ScrollToTopContextType | undefined>(undefined)

export function ScrollToTopProvider({ 
  children, 
  onScrollToTop 
}: { 
  children: ReactNode
  onScrollToTop: () => void 
}) {
  return (
    <ScrollToTopContext.Provider value={{ scrollToTop: onScrollToTop }}>
      {children}
    </ScrollToTopContext.Provider>
  )
}

export function useScrollToTop() {
  const context = useContext(ScrollToTopContext)
  if (context === undefined) {
    throw new Error('useScrollToTop must be used within a ScrollToTopProvider')
  }
  return context
}