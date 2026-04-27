'use client';

import React from 'react';
import { OwnerSidebar } from './sidebars/OwnerSidebar';

interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell = ({ children }: DashboardShellProps) => {
  return (
    <div className="flex min-h-screen bg-surface">
      <OwnerSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1280px] mx-auto p-12">
          {children}
        </div>
      </main>
    </div>
  );
};
