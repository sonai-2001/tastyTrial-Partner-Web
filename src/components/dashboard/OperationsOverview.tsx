'use client';

import React from 'react';
import { Lock, UtensilsCrossed, RefreshCw, BarChart3 } from 'lucide-react';

export const OperationsOverview = () => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="font-display text-lg font-bold mb-6">Operations Overview</h3>
      <div className="flex-1 bg-surface-low rounded-lg p-12 border border-border/10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container/20 opacity-50" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-lowest shadow-ambient flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:scale-110">
            <Lock size={32} className="text-secondary/30" />
          </div>
          
          <h4 className="font-display text-2xl font-bold mb-4">Metrics Coming Soon</h4>
          <p className="text-sm text-secondary max-w-sm leading-relaxed mb-12">
            Your operational dashboard will be unlocked once your business verification is complete. 
            Get ready to manage menus, track orders, and analyze your performance.
          </p>

          <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
            <FeatureItem icon={UtensilsCrossed} label="LIVE MENUS" />
            <FeatureItem icon={RefreshCw} label="ORDER SYNC" />
            <FeatureItem icon={BarChart3} label="INSIGHTS" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="bg-surface-lowest rounded-lg p-4 shadow-sm border border-border/5 flex flex-col items-center gap-3">
    <Icon size={20} className="text-primary/40" />
    <span className="text-[10px] font-bold tracking-widest text-secondary">{label}</span>
  </div>
);
