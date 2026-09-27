import React from 'react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  retriggerOnScroll?: boolean;
  distance?: number; // px, default 16
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 1800,
  className = '',
  retriggerOnScroll = true,
  distance = 18,
  direction = 'up',
}) => {
  const { ref, isInView } = useInViewAnimation({
    threshold: 0.1,
    retriggerOnScroll,
  });

  const getTransform = () => {
    if (isInView) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(0.985)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(0.985)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0) scale(0.985)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0) scale(0.985)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0) scale(0.985)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
