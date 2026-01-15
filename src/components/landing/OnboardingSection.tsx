// components/landing/OnboardingSection.tsx
import { CheckCircle } from 'lucide-react';

const requirements = [
  'PAN card',
  'FSSAI license',
  'Bank account details',
  'GST number (if applicable)',
  'Menu and profile food images',
];

export default function OnboardingSection() {
  return (
    <section className="bg-background relative z-10 -mt-32">
      <div className="container">
        <div>
          <div className="rounded-2xl border bg-card p-10 shadow-sm grid gap-10 lg:grid-cols-2 items-center">
            {/* Left */}
            <div className="relative rounded-xl bg-[#fff1e8] aspect-video flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition">
              <video
                className="h-full w-full object-cover"
                src="/assets/videos/onboardingDemo.mov"
                controls
                preload="metadata"
                poster="/assets/onBoardingPoster.avif"
              />
              <span className="text-sm font-medium text-muted-foreground">
                Watch onboarding video
              </span>
            </div>

            {/* Right */}
            <div>
              <h3 className="text-2xl font-semibold">Get started: It only takes 10 minutes</h3>

              <p className="mt-3 text-muted-foreground">
                Please keep these documents and details ready for a smooth sign-up.
              </p>

              <ul className="mt-6 space-y-3">
                {requirements.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
