import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center space-x-2 rounded-xl bg-slate-900/95 dark:bg-slate-800/95 border border-amber-500/50 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-white shadow-xl animate-in slide-in-from-bottom-2 duration-300">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
      <WifiOff className="w-3.5 h-3.5 text-amber-400" />
      <span>Mode Offline — Aplikasi berjalan menggunakan data tersimpan lokal.</span>
    </div>
  );
};
