// app/(auth)/layout.tsx

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-muted overflow-hidden">

      {/* ===== Fake Dashboard Background ===== */}
      <div className="absolute inset-0 p-6 opacity-40">
        <div className="grid grid-cols-12 gap-6 h-full">

          {/* Sidebar */}
          <div className="col-span-3 space-y-4">
            <div className="h-10 w-40 bg-muted-foreground/30 rounded animate-pulse" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-full bg-muted-foreground/30 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Main dashboard */}
          <div className="col-span-9 space-y-6">
            <div className="h-12 w-72 bg-muted-foreground/30 rounded animate-pulse" />

            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-muted-foreground/30 rounded-xl animate-pulse"
                />
              ))}
            </div>

            <div className="h-72 bg-muted-foreground/30 rounded-xl animate-pulse" />
          </div>

        </div>
      </div>

      {/* ===== Blur Overlay ===== */}
      <div className="absolute inset-0 backdrop-blur-sm bg-background/60" />

      {/* ===== Center Content ===== */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {children}
      </div>

    </div>
  );
}