'use client';

import { useEffect, useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function useSwipeGesture(handlers: SwipeHandlers, enabled: boolean = true) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) return;

    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      // Only enable on touch devices (mobile)
      if (window.innerWidth >= 768) return;
      
      touchStartX.current = e.touches[0].clientX;
      isSwiping.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (!isSwiping.current) return;
      
      const distance = touchEndX.current - touchStartX.current;
      const absDistance = Math.abs(distance);

      if (absDistance > minSwipeDistance) {
        if (distance > 0) {
          // Swipe right
          handlers.onSwipeRight?.();
        } else {
          // Swipe left
          handlers.onSwipeLeft?.();
        }
      }

      isSwiping.current = false;
      touchStartX.current = 0;
      touchEndX.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handlers, enabled]);
}
