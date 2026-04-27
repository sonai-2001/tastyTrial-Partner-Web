'use client';

import React from 'react';
import { DashboardShell } from '@/components/layouts/DashboardShell';
import { VerificationStatus } from '@/components/dashboard/VerificationStatus';
import { PendingActions } from '@/components/dashboard/PendingActions';
import { OperationsOverview } from '@/components/dashboard/OperationsOverview';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { activeRestaurant } = useAuth();

  return (
    <DashboardShell>
      <div className="space-y-2 mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Welcome back, Chef
        </h1>
        <p className="text-secondary text-lg font-sans">
          Complete your verification to unlock all portal features.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Status & Actions */}
        <div className="lg:col-span-4">
          <VerificationStatus />
          <PendingActions />
        </div>

        {/* Right Column: Operations Overview */}
        <div className="lg:col-span-8 h-full min-h-[600px]">
          <OperationsOverview />
        </div>
      </div>
    </DashboardShell>
  );
}