"use client"

import { useLanguage } from '@/components/contexts'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="h-dvh flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          {t('hero.title')}
        </h1>
        <p className="text-sm sm:text-base mb-8 text-muted-foreground">
          {t('hero.subtitle')}
        </p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
          {t('hero.cta')}
        </button>
      </div>
    </section>
  )
}