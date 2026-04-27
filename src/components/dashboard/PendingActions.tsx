'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export const PendingActions = () => {
  return (
    <div className="mt-8">
      <h3 className="font-display text-sm font-bold mb-4">Pending Actions</h3>
      <div className="bg-[#ba1a1a]/5 border border-[#ba1a1a]/10 rounded-lg p-6">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-[#ba1a1a] flex items-center justify-center text-white flex-shrink-0">
            <AlertCircle size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-sans font-bold text-sm text-[#ba1a1a]">Bank Details Missing</h4>
            <p className="text-xs text-secondary mt-2 leading-relaxed">
              To receive payouts once approved, please add your routing and account numbers.
            </p>
            <button className="mt-4 px-4 py-2 bg-surface-lowest border border-border rounded-md text-xs font-bold shadow-sm hover:bg-surface-low transition-colors">
              Add Bank Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
