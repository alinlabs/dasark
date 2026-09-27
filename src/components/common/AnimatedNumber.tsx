import React, { useEffect, useState, useRef } from 'react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

interface AnimatedNumberProps {
  value: number;
  duration?: number; // ms, default 4200ms (4.2s) for relaxed, stately and visible pacing
  decimals?: number; // default 0
  prefix?: string;
  suffix?: string;
  className?: string;
  triggerKey?: any; // optional extra trigger
  retriggerOnView?: boolean;
}

// Ease out cubic: gentle, natural, constant momentum that decelerates smoothly
const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 4200,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  triggerKey,
  retriggerOnView = true,
}) => {
  const { ref, isInView, animationKey } = useInViewAnimation({
    threshold: 0.1,
    retriggerOnScroll: retriggerOnView,
  });

  const [displayValue, setDisplayValue] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) {
      if (retriggerOnView) {
        setDisplayValue(0);
      }
      return;
    }

    const startVal = 0;
    const endVal = value;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentVal = startVal + (endVal - startVal) * easedProgress;

      setDisplayValue(currentVal);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(endVal);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateCounter);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isInView, animationKey, value, duration, triggerKey, retriggerOnView]);

  const formattedNumber = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue).toLocaleString('id-ID');

  return (
    <span ref={ref} className={`tabular-nums inline-block ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
