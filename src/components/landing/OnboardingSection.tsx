import { CheckCircle, PlayCircle } from 'lucide-react';
import { Typography } from '@/components/ui/typography';

const requirements = [
  'PAN Identification',
  'FSSAI Licensing',
  'Bank Instrument Details',
  'GST Certification',
  'Menu & Visual Assets',
];

export default function OnboardingSection() {
  return (
    <section className="bg-surface pb-32 relative z-10">
      <div className="container">
        <div className="rounded-[2.5rem] bg-surface-lowest p-8 md:p-16 shadow-ambient grid gap-16 lg:grid-cols-2 items-center overflow-hidden relative">
          {/* Subtle branding background accent */}
          <div className="absolute -right-20 -bottom-20 size-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Visual Asset Frame */}
          <div className="relative group rounded-3xl overflow-hidden bg-surface shadow-inner aspect-video flex flex-col items-center justify-center">
            <video
              className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-80"
              src="/assets/videos/onboardingDemo.mov"
              controls
              preload="metadata"
              poster="/assets/onBoardingPoster.avif"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
              <PlayCircle className="size-20 text-white/80 drop-shadow-2xl" />
            </div>
          </div>

          {/* Right: Editorial Metadata */}
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <Typography variant="small" className="text-primary font-black uppercase tracking-[0.3em]">
                Fast-Track Entry
              </Typography>
              <Typography variant="h2" className="text-4xl font-display font-black leading-tight">
                Establish Your Presence <br /> in Under 10 Minutes.
              </Typography>
              <Typography variant="body2" className="text-secondary/60 italic leading-relaxed">
                We have streamlined the intake process for professional kitchens. Prepare the following instruments for a seamless inscription.
              </Typography>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4">
              {requirements.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="size-4 text-primary" />
                  </div>
                  <Typography variant="body1" className="text-sm font-bold tracking-tight">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
