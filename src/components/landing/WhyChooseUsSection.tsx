'use client';

import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  {
    id: 'customers',
    label: 'Reach exclusive customers',
    title: 'Reach exclusive customers',
    description:
      'Unlock a new revenue stream and grow with our highly engaged customer base, many of whom order exclusively through our platform.',
    image: '/assets/why-customers.avif',
  },
  {
    id: 'operations',
    label: 'Manage your delivery operations',
    title: 'Manage your delivery operations',
    description:
      'Easily manage orders, menus, payouts, and performance metrics from one powerful dashboard.',
    image: '/assets/why-operations.avif',
  },
  {
    id: 'growth',
    label: 'Accelerate your business growth',
    title: 'Accelerate your business growth',
    description:
      'Access tools, insights, and marketing support designed to help your restaurant grow faster.',
    image: '/assets/why-growth.avif',
  },
];

export default function WhyChooseUsTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="bg-background">
      <div className="container py-20">
        {/* Heading */}
        <h2 className="text-center text-3xl lg:text-4xl font-bold">Why choose TastyTrial?</h2>

        {/* Tabs */}
        <div className="mt-10 border-b flex justify-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm lg:text-base font-medium transition cursor-pointer
                ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 items-center">
          {/* Left */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-semibold">{current.title}</h3>

            <p className="mt-4 text-muted-foreground max-w-lg">{current.description}</p>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-xl bg-muted p-4 shadow-sm">
              <Image
                src={current.image}
                alt={current.title}
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
