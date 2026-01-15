// app/(landing)/page.tsx
import HeroSection from '@/components/landing/HeroSection';
import OnboardingSection from '@/components/landing/OnboardingSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <OnboardingSection />
      <WhyChooseUsSection />
    </>
  );
}
