"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import ScrollToTop from "@/components/ScrollToTop";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const lenis = new Lenis({});

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 서브페이지에서 헤더를 고정으로 설정
    const header = document.querySelector('header');
    headerRef.current = header;
    
    if (header) {
      header.classList.add('header-fixed', 'header-backdrop');
      header.classList.remove('header-relative');
    }

    // body overflow auto (서브페이지)
    document.body.classList.add('body-overflow-auto');
    document.body.classList.remove('body-overflow-hidden');

    // 스크롤 방향에 따른 헤더 숨김/표시
    const handleScroll = () => {
      if (!header) return;
      
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      // 스크롤이 끝에 도달했는지 확인 (10px 여유)
      const isAtBottom = currentScrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
      
      // 스크롤 방향이 확실할 때만 헤더 상태 변경 (5px 이상의 변화)
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      if (scrollDelta > 5) {
        if (scrollDirection === 'down' && currentScrollY > 100 && !isAtBottom) {
          // 아래로 스크롤하고 100px 이상 스크롤했을 때 헤더 숨김 (끝이 아닌 경우)
          header.classList.add('header-hidden');
        } else if (scrollDirection === 'up' || currentScrollY <= 100 || isAtBottom) {
          // 위로 스크롤하거나 상단에 가까울 때 또는 스크롤 끝에 도달했을 때 헤더 표시
          header.classList.remove('header-hidden');
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Lenis의 scroll 이벤트에 연결
    lenis.on('scroll', handleScroll);

    return () => {
      lenis.destroy();
      
      // cleanup: 헤더 상태 복원
      if (header) {
        header.classList.remove('header-fixed', 'header-backdrop', 'header-hidden');
        header.classList.add('header-relative');
      }
      document.body.classList.remove('body-overflow-auto');
      
      // timeout 정리
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
}
