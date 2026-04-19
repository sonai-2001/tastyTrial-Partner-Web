// app/(auth)/layout.tsx

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface">
      {/* ================= DASHBOARD SHIMMER (Culinary Edition) ================= */}
      <div className="absolute inset-0 grid grid-cols-12 gap-6 p-8 opacity-20 pointer-events-none">
        {/* ===== Sidebar ===== */}
        <aside className="col-span-3 flex flex-col justify-between rounded-2xl bg-background/40 p-5">
          <div className="space-y-8">
            {/* Logo */}
            <div className="h-8 w-32 rounded-md bg-foreground/40 animate-pulse" />

            {/* Navigation */}
            <div className="space-y-4">
              <div className="h-4 w-20 rounded bg-foreground/30 animate-pulse" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-md bg-foreground/40 animate-pulse" />
                  <div className="h-4 w-28 rounded bg-foreground/40 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* User profile */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-foreground/40 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-foreground/40 animate-pulse" />
              <div className="h-3 w-14 rounded bg-foreground/30 animate-pulse" />
            </div>
          </div>
        </aside>

        {/* ===== Main Content ===== */}
        <main className="col-span-9 space-y-6">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="h-10 w-72 rounded-lg bg-foreground/40 animate-pulse" />
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-foreground/40 animate-pulse" />
              <div className="h-10 w-10 rounded-lg bg-foreground/40 animate-pulse" />
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-foreground/40 animate-pulse" />
            ))}
          </div>

          {/* Chart */}
          <div className="h-72 rounded-xl bg-foreground/40 animate-pulse" />

          {/* Table */}
          <div className="space-y-3 rounded-xl bg-background/40 p-4">
            <div className="h-4 w-40 rounded bg-foreground/40 animate-pulse" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-foreground/30 animate-pulse" />
            ))}
          </div>
        </main>
      </div>

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />

      {/* ================= AUTH CONTENT ================= */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
