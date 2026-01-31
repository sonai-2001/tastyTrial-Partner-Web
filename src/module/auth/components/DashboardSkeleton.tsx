// components/auth/DashboardSkeleton.tsx
export default function DashboardSkeleton() {
  return (
    <div className="h-full w-full p-8 grid grid-cols-12 gap-6 animate-pulse">
      {/* Sidebar */}
      <div className="col-span-2 space-y-4">
        <div className="h-10 bg-muted rounded-lg" />
        <div className="h-8 bg-muted rounded-lg" />
        <div className="h-8 bg-muted rounded-lg" />
        <div className="h-8 bg-muted rounded-lg" />
      </div>

      {/* Main content */}
      <div className="col-span-10 space-y-6">
        {/* Top cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="h-28 bg-muted rounded-xl" />
          <div className="h-28 bg-muted rounded-xl" />
          <div className="h-28 bg-muted rounded-xl" />
        </div>

        {/* Chart */}
        <div className="h-64 bg-muted rounded-xl" />

        {/* Table */}
        <div className="space-y-3">
          <div className="h-10 bg-muted rounded-lg" />
          <div className="h-10 bg-muted rounded-lg" />
          <div className="h-10 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  );
}