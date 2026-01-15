// components/layouts/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <p className="font-semibold">TastyTrial</p>
          <p className="mt-2 text-muted-foreground">
            Grow your restaurant business with smart delivery solutions.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Company</p>
          <Link href="#" className="block text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="#" className="block text-muted-foreground hover:text-foreground">
            Careers
          </Link>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Legal</p>
          <Link href="#" className="block text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="block text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
        </div>
      </div>

      <div className="border-t">
        <p className="container py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} TastyTrial. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
