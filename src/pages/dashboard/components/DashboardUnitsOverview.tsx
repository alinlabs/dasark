import React from 'react';
import { Truck, Factory, Droplets } from 'lucide-react';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

export const DashboardUnitsOverview: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Fasilitas &amp; Unit Operasional Perusahaan
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScrollReveal delay={100} direction="up" duration={1000}>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors duration-200 h-full hover:-translate-y-0.5">
            <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
              <Truck className="w-4 h-4" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Jasa Transporter Nasional</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Armada logistik limbah B3 izin Kemenhub &amp; KLHK dengan pengemudi tersertifikasi SIO.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="up" duration={1000}>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors duration-200 h-full hover:-translate-y-0.5">
            <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
              <Factory className="w-4 h-4" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Plant Karawang Barat</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Fasilitas gudang TPS Limbah B3, manifes Festronik, dan proteksi hidran industri.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} direction="up" duration={1000}>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 transition-colors duration-200 h-full hover:-translate-y-0.5">
            <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
              <Droplets className="w-4 h-4" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Plant Sukabumi</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pemanfaat oli bekas (re-refining) dan instalasi pengering lumpur limbah industri.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
