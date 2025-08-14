"use client";

import { useCallback, useEffect, useState } from 'react';
import '../styles/dot-navigation.css';

interface DotNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onSlideClick?: (index: number) => void;
  className?: string;
}

const DotNavigation = ({ 
  totalSlides, 
  currentSlide, 
  onSlideClick,
  className = '' 
}: DotNavigationProps) => {
  const [dots, setDots] = useState<number[]>([]);

  useEffect(() => {
    setDots(Array.from({ length: totalSlides }, (_, i) => i));
  }, [totalSlides]);

  const handleDotClick = useCallback((index: number) => {
    onSlideClick?.(index);
  }, [onSlideClick]);

  if (totalSlides <= 1) return null;

  return (
    <div className={`dot-navigation ${className}`}>
      {dots.map((index) => (
        <button
          key={index}
          className={`custom-bullet ${
            index === currentSlide ? 'custom-bullet-active' : ''
          }`}
          onClick={() => handleDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default DotNavigation;