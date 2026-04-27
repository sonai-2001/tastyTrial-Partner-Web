'use client';

import React from 'react';
import { CheckCircle2, Hourglass, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Account Created',
    date: 'NOV 12, 2023',
    status: 'completed',
  },
  {
    title: 'Business Docs Submitted',
    date: 'NOV 14, 2023',
    status: 'completed',
  },
  {
    title: 'Under Review',
    description: 'Our team is reviewing your documentation. This usually takes 1-2 business days.',
    status: 'current',
  },
  {
    title: 'Portal Unlocked',
    status: 'pending',
  },
];

export const VerificationStatus = () => {
  return (
    <div className="bg-surface-lowest rounded-lg p-8 shadow-ambient border border-border/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
          <CheckCircle2 size={20} />
        </div>
        <h3 className="font-display text-lg font-bold">Verification Status</h3>
      </div>

      <div className="space-y-0 relative">
        {steps.map((step, index) => (
          <div key={step.title} className="flex gap-4 min-h-[80px]">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center z-10",
                step.status === 'completed' && "bg-primary text-on-primary",
                step.status === 'current' && "bg-surface-lowest border-2 border-primary text-primary shadow-[0_0_0_4px_rgba(177,37,0,0.1)]",
                step.status === 'pending' && "bg-surface-lowest border-2 border-surface-highest text-surface-highest"
              )}>
                {step.status === 'completed' && <CheckCircle2 size={14} />}
                {step.status === 'current' && <Hourglass size={14} />}
                {step.status === 'pending' && <Circle size={14} />}
              </div>
              {index !== steps.length - 1 && (
                <div className={cn(
                  "w-0.5 flex-1 my-1",
                  step.status === 'completed' ? "bg-primary" : "bg-surface-highest border-dashed border-l-2"
                )} />
              )}
            </div>
            <div className="pb-8">
              <h4 className={cn(
                "font-sans font-bold text-sm",
                step.status === 'pending' ? "text-secondary/50" : "text-foreground"
              )}>
                {step.title}
              </h4>
              {step.date && (
                <p className="text-[10px] font-sans font-bold text-secondary mt-1 tracking-wider">
                  {step.date}
                </p>
              )}
              {step.description && (
                <p className="text-xs text-secondary mt-2 max-w-[200px] leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
