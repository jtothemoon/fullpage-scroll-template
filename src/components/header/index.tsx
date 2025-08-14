"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Menu } from 'lucide-react'
import ThemeToggler from '@/components/header/ThemeToggler'
import LanguageToggler from '@/components/header/LanguageToggler'
import { useLanguage } from '@/components/contexts'
import { useScrollToTop } from '@/components/contexts/ScrollToTopContext'
import { useRouter, usePathname } from 'next/navigation'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  
  let scrollToTop: (() => void) | null = null
  try {
    const context = useScrollToTop()
    scrollToTop = context.scrollToTop
  } catch {
    // ScrollToTopProvider가 없는 페이지에서는 null
  }

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.portfolio'), href: '/portfolio' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <header className="relative z-50 w-full bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:grid md:grid-cols-3">
          {/* Logo */}
          <div className="flex justify-start">
            <button 
              onClick={() => {
                if (pathname === '/' && scrollToTop) {
                  scrollToTop()
                } else {
                  router.push('/')
                }
              }}
              className="text-lg sm:text-xl font-bold hover:opacity-70 transition-opacity"
            >
              {t('common.logo')}
            </button>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center justify-center space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild>
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </nav>

          {/* Right Controls - Desktop */}
          <div className="hidden md:flex items-center justify-end space-x-2">
            <LanguageToggler />
            <ThemeToggler />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Button variant="outline" size="sm">
              {t('nav.contact')}
            </Button>
          </div>

          {/* Mobile Menu Button - Right */}
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to different sections of the portfolio
                </SheetDescription>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-center"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </Button>
                  ))}
                  
                  {/* Mobile Controls */}
                  <div className="border-t pt-4 mt-4 space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <LanguageToggler />
                      <span className="text-sm font-medium">Language</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <ThemeToggler />
                      <span className="text-sm font-medium">Theme</span>
                    </div>
                    <div className="px-4">
                      <Button variant="outline" className="w-full">
                        {t('nav.contact')}
                      </Button>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}