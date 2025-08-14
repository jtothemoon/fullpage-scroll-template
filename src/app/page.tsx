"use client"

import { FullPageScroll } from '@/components/FullPageScroll'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <>
      <Header />
      <FullPageScroll>
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </FullPageScroll>
    </>
  )
}
