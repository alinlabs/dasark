import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  duration?: number; // ms, default 5000ms (5 seconds)
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  duration = 5000,
  onFinish,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Read the saved theme (light or dark) from localStorage or DOM class
  const [isDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('wasteguard_theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    // Progress bar interpolation over duration
    const startTime = performance.now();
    let frameId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    // Trigger smooth fade-out 700ms before completion
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, Math.max(0, duration - 700));

    // Finish and unmount at exact duration
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, duration);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Splash Screen"
      aria-modal="true"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out cursor-pointer ${
        isDarkMode
          ? 'bg-slate-950 text-white'
          : 'bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900'
      } ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient radial gradients adapted to light/dark themes (Pure Blue / Sky glow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDarkMode ? (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-[130px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sky-500/15 rounded-full blur-[90px]" />
          </>
        ) : (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-500/15 rounded-full blur-[110px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sky-400/15 rounded-full blur-[80px]" />
          </>
        )}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* Shield Mark Icon as in Sidebar */}
        <div className="relative mb-6 group">
          <div
            className={`absolute -inset-3 rounded-3xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity ${
              isDarkMode
                ? 'bg-gradient-to-tr from-blue-600 to-sky-500'
                : 'bg-gradient-to-tr from-blue-500 to-sky-400'
            }`}
          />
          <div
            className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105 ${
              isDarkMode
                ? 'bg-blue-600 text-white shadow-blue-500/30 border border-blue-400/40'
                : 'bg-blue-600 text-white shadow-blue-600/30 border border-blue-500'
            }`}
          >
            <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-sm" strokeWidth={2.2} />
          </div>
        </div>

        {/* Sole Text Typography as Requested: Dame Alam Sejahtera / Audit & Risk */}
        <div className="space-y-1.5 tracking-tight">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-xs font-sans ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Dame Alam Sejahtera
          </h1>
          <p
            className={`text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.28em] drop-shadow-xs font-sans ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            Audit &amp; Risk
          </p>
        </div>

        {/* Smooth 5-Second Progress Indicator */}
        <div
          className={`mt-8 w-48 sm:w-56 h-1.5 rounded-full overflow-hidden ${
            isDarkMode
              ? 'bg-slate-800/90 border border-slate-700/50'
              : 'bg-slate-200/90 border border-slate-300/60 shadow-inner'
          }`}
        >
          <div
            className={`h-full rounded-full transition-all duration-75 ease-linear ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-500 via-sky-400 to-blue-300'
                : 'bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Subtle Skip Hint in Bottom Corner */}
      <div
        className={`absolute bottom-6 right-6 z-20 text-[11px] tracking-wider transition-colors ${
          isDarkMode
            ? 'text-slate-500 hover:text-slate-300'
            : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        Ketuk untuk lewati →
      </div>
    </div>
  );
};
