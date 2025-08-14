"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.about': '소개',
    'nav.portfolio': '포트폴리오',
    'nav.contact': '연락처',
    'nav.signin': '로그인',
    'nav.signup': '회원가입',
    'nav.contact_us': '문의하기',
    
    // Common
    'common.navigation_menu': '내비게이션 메뉴',
    'common.browse_description': '웹사이트 페이지와 섹션을 둘러보세요.',
    'common.logo': '포트폴리오',
    
    // Scroll Hint
    'scroll.explore': '스크롤하여 탐색하기',
    'scroll.swipe_up': '위로 스와이프',
    
    // Hero Section
    'hero.title': '내 포트폴리오에 오신 것을 환영합니다',
    'hero.subtitle': 'Frontend 개발자 & UI/UX 디자이너',
    'hero.cta': '내 작업 보기',
  },
  en: {
    // Navigation  
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.contact_us': 'Contact Us',
    
    // Common
    'common.navigation_menu': 'Navigation Menu',
    'common.browse_description': 'Browse through our website pages and sections.',
    'common.logo': 'Portfolio',
    
    // Scroll Hint
    'scroll.explore': 'Scroll to explore',
    'scroll.swipe_up': 'Swipe up',
    
    // Hero Section
    'hero.title': 'Welcome to My Portfolio',
    'hero.subtitle': 'Frontend Developer & UI/UX Designer',
    'hero.cta': 'View My Work',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ko] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}