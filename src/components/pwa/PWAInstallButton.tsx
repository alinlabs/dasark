import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (compact) {
      return (
        <button
          onClick={install}
          title="Install Aplikasi DASAR ke Perangkat Anda"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install App</span>
        </button>
      );
    }

    return (
      <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
        <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-semibold">
          <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Install Aplikasi (PWA)</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
          Pasang DASAR di desktop atau HP untuk akses cepat tanpa browser & bekerja offline.
        </p>
        <button
          onClick={install}
          className="w-full flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install Sekarang</span>
        </button>
      </div>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        {compact ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install di iOS</span>
          </button>
        ) : (
          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-semibold">
              <Smartphone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>Install di iPhone / iPad</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
              Tambahkan ke layar utama perangkat Apple Anda untuk pengalaman layar penuh.
            </p>
            <button
              onClick={() => setShowIOSGuide(true)}
              className="w-full flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              <span>Petunjuk Install iOS</span>
            </button>
          </div>
        )}

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Install di iPhone / iPad</h3>
                    <p className="text-[11px] text-slate-500">Apple Safari Browser</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start space-x-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-[10px] shrink-0">1</span>
                  <p>Tekan tombol <strong>Share / Bagikan</strong> di bilah navigasi Safari (ikon kotak dengan panah ke atas).</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-[10px] shrink-0">2</span>
                  <p>Gulir ke bawah pada menu dan pilih opsi <strong>Add to Home Screen (Tambahkan ke Layar Utama)</strong>.</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-[10px] shrink-0">3</span>
                  <p>Klik <strong>Add (Tambah)</strong> di sudut kanan atas. Aplikasi akan muncul di layar utama Anda.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2 rounded-xl bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold transition cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop ambient info or manual prompt trigger
  return null;
};
