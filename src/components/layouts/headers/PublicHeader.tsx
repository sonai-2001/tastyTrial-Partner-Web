import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-secondary/5">
      <div className="container h-20 flex items-center justify-between">
        {/* Logo - Editorial Manrope */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            T
          </div>
          <Typography variant="h4" className="font-display font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
            TastyTrial
          </Typography>
        </Link>

        {/* Nav - High-Density Inter */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-xs font-bold text-secondary/40 hover:text-primary uppercase tracking-[0.2em] transition-colors">
            Visions
          </Link>
          <Link href="#pricing" className="text-xs font-bold text-secondary/40 hover:text-primary uppercase tracking-[0.2em] transition-colors">
            Access
          </Link>
          <Link href="#contact" className="text-xs font-bold text-secondary/40 hover:text-primary uppercase tracking-[0.2em] transition-colors">
            Connect
          </Link>
        </nav>

        {/* CTA - The Signature Red Button */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-xs font-bold text-secondary/60 hover:text-primary uppercase tracking-widest transition-colors">
            Inscribe
          </Link>
          <Button size="sm" className="h-10 px-6 font-display text-primary font-bold shadow-lg">
            <Link href={'/register'}>Register Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
