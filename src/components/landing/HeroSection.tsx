import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-surface pt-24 pb-48 relative overflow-hidden">
      {/* Editorial Decorative Element - Tonal layering placeholder */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/3 skew-x-12 translate-x-20 pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid gap-20 lg:grid-cols-2 items-center">
          {/* LEFT: Text Cluster - The Ledger Style */}
          <div className="space-y-10">
            <div className="space-y-4">
              <Typography variant="display" className="text-primary italic">
                Volume 01
              </Typography>
              <Typography variant="h1" className="text-5xl lg:text-7xl font-display font-black leading-[1.05] tracking-tighter">
                Grow your <br /> 
                <span className="text-primary">Restaurant</span> <br />
                Business.
              </Typography>
            </div>

            <Typography variant="body1" className="max-w-xl text-secondary/60 font-medium">
              Establish your legacy with TastyTrial. Reach more customers, manage orders with absolute precision, and deliver faster with our artisanal platform.
            </Typography>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-10 text-primary font-display font-bold text-lg shadow-2xl shadow-primary/30 group">
                  Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {/* <Button size="lg" variant="ghost" className="h-14 px-8 font-bold text-secondary/60 hover:text-primary tracking-widest uppercase text-xs">
                View Portfolios <ChevronRight className="ml-1 size-4" />
              </Button> */}
            </div>
          </div>

          {/* RIGHT: Visual Frame - No lines, all depth */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-2xl group-hover:bg-primary/10 transition-all duration-1000" />
            <div className="relative rounded-[2.5rem] bg-surface-lowest p-5 shadow-ambient">
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src="/assets/HeroSectionRightImage.avif"
                  alt="Professional Dashboard preview"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Floating Performance Indicator - Mockup editorial detail */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-ambient hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Typography variant="h4" className="mb-0">98%</Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-secondary/40 font-black uppercase tracking-widest">Growth Rate</Typography>
                    <Typography variant="body2" className="font-bold">Live Portfolio</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
