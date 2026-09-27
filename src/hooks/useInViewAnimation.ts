import { useEffect, useRef, useState } from 'react';

interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  retriggerOnScroll?: boolean;
}

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewAnimationOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
    retriggerOnScroll = true,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Detect if there's a custom scroll container like <main>
    const scrollContainer = document.querySelector('main');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setAnimationKey((prev) => prev + 1);
          } else {
            if (retriggerOnScroll) {
              setIsInView(false);
            }
          }
        });
      },
      {
        root: scrollContainer || null,
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    // Also fallback check on window intersection
    let windowObserver: IntersectionObserver | null = null;
    if (scrollContainer) {
      windowObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
            } else if (retriggerOnScroll) {
              setIsInView(false);
            }
          });
        },
        { threshold: 0.1 }
      );
      windowObserver.observe(el);
    }

    return () => {
      observer.disconnect();
      if (windowObserver) {
        windowObserver.disconnect();
      }
    };
  }, [threshold, rootMargin, retriggerOnScroll]);

  return { ref: elementRef, isInView, animationKey };
}
