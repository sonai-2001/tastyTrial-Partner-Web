// components/layouts/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 text-sm">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold">TastyTrial</p>
            <p className="mt-3 text-muted-foreground max-w-xs">
              Grow your restaurant business with smart delivery, insights, and marketing solutions.
            </p>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="font-medium">Company</p>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              About us
            </Link>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Careers
            </Link>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Blog
            </Link>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <p className="font-medium">Support</p>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Help Center
            </Link>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Partner onboarding
            </Link>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Contact support
            </Link>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <p className="font-medium">Legal</p>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="block text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TastyTrial. All rights reserved.</p>

          <p>Built with ❤️ for restaurant partners</p>
        </div>
      </div>
    </footer>
  );
}
