// components/landing/HeroSection.tsx
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
<section className="bg-[#fff7f1] pb-40 relative">
      <div className="container">
        <div className="grid gap-12 py-18 lg:grid-cols-2 items-center">
          {/* LEFT: Text */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Grow your restaurant business with TastyTrial
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Reach more customers, manage orders seamlessly, and deliver faster with our all-in-one
              restaurant platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg">Get started</Button>

              {/* <Button size="lg" variant="outline">
                Learn more
              </Button> */}
            </div>
          </div>

          {/* RIGHT: Visual */}
          <div className="hidden lg:block">
            <div className="relative rounded-xl bg-muted p-4 shadow-lg">
              <img
                src="/assets/HeroSectionRightImage.avif"
                alt="Dashboard preview"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
