'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Typography } from '@/components/ui/typography';

const tabs = [
  {
    id: 'customers',
    label: 'Exclusive Channels',
    title: 'Reach Exclusive Customers',
    description:
      'Unlock a new revenue stream and grow with our highly engaged customer base, many of whom order exclusively through our ledger.',
    image: '/assets/why-customers.avif',
  },
  {
    id: 'operations',
    label: 'Precise Operations',
    title: 'Manage Your Delivery Ecosystem',
    description:
      'Easily manage orders, menus, payouts, and performance metrics from one powerful, state-of-the-art dashboard.',
    image: '/assets/why-operations.avif',
  },
  {
    id: 'growth',
    label: 'Accelerated Growth',
    title: 'Accelerate Your Business Trajectory',
    description:
      'Access artisanal tools, professional insights, and marketing support designed to help your restaurant grow with precision.',
    image: '/assets/why-growth.avif',
  },
];

export default function WhyChooseUsTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="bg-surface">
      <div className="container py-32 space-y-20">
        {/* Heading Cluster */}
        <div className="text-center space-y-4">
          <Typography variant="small" className="text-primary font-black uppercase tracking-[0.3em]">
            The Advantage
          </Typography>
          <Typography variant="h2" className="text-4xl lg:text-5xl font-display font-black">
            Why Choose TastyTrial?
          </Typography>
        </div>

        {/* Tab Console - No Borders, All Depth */}
        <div className="space-y-16">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer shadow-sm
                  ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                      : 'bg-surface-lowest text-secondary/40 hover:text-primary'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Projection */}
          <div className="grid gap-20 lg:grid-cols-2 items-center">
            {/* Left: Text Metadata */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Typography variant="h3" className="text-3xl lg:text-4xl font-display font-black leading-tight">
                  {current.title}
                </Typography>
                <Typography variant="body1" className="text-secondary/60 leading-relaxed font-medium">
                  {current.description}
                </Typography>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 w-fit">
                <div className="size-2 bg-primary rounded-full animate-pulse" />
                <Typography variant="small" className="font-bold text-primary tracking-widest uppercase">
                  Live Market Insights
                </Typography>
              </div>
            </div>

            {/* Right: Visual Frame */}
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
              <div className="relative rounded-[2.5rem] bg-surface-lowest p-5 shadow-ambient overflow-hidden">
                <Image
                  src={current.image}
                  alt={current.title}
                  width={600}
                  height={400}
                  className="rounded-[2rem] shadow-sm transform transition-all duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
