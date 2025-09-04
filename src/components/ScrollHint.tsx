"use client";

import { ChevronDown, Mouse, Pointer } from 'lucide-react';
import { useLanguage } from './contexts';
import '../styles/scroll-hint.css';

interface ScrollHintProps {
  isVisible: boolean;
  className?: string;
}

const ScrollHint = ({ isVisible, className = '' }: ScrollHintProps) => {
  const { t } = useLanguage();
  
  if (!isVisible) return null;

  return (
    <div className={`scroll-hint ${className}`}>
      {/* 데스크톱 버전 */}
      <div className="hidden md:flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 animate-bounce">
        <Mouse className="h-6 w-6 mb-2" />
        <p className="text-sm font-medium">{t('scroll.explore')}</p>
        <ChevronDown className="h-4 w-4 mt-1" />
      </div>

      {/* 모바일 버전 */}
      <div className="md:hidden flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 animate-bounce">
        <div className="flex flex-col items-center">
          <Pointer className="h-6 w-6 mb-2" />
          <p className="text-xs font-medium">{t('scroll.swipe_up')}</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollHint;