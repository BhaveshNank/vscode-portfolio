'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SwipeWrapperProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enabled?: boolean;
}

export default function SwipeWrapper({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  enabled = true 
}: SwipeWrapperProps) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      // Only enable on mobile devices
      if (window.innerWidth >= 768) return;
      
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (window.innerWidth >= 768) return;

      const distance = touchEndX.current - touchStartX.current;
      const absDistance = Math.abs(distance);

      if (absDistance > minSwipeDistance) {
        if (distance > 0 && onSwipeRight) {
          // Swipe right
          onSwipeRight();
        } else if (distance < 0 && onSwipeLeft) {
          // Swipe left
          onSwipeLeft();
        }
      }

      touchStartX.current = 0;
      touchEndX.current = 0;
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
      wrapper.addEventListener('touchmove', handleTouchMove, { passive: true });
      wrapper.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        wrapper.removeEventListener('touchstart', handleTouchStart);
        wrapper.removeEventListener('touchmove', handleTouchMove);
        wrapper.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [enabled, onSwipeLeft, onSwipeRight]);

  return <div ref={wrapperRef} className="h-full w-full">{children}</div>;
}
