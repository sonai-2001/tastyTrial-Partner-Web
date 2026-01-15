// components/layouts/headers/PublicHeader.tsx
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function PublicHeader() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          TastyTrial
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#features" className="text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link href="#contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Login
          </Link>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
