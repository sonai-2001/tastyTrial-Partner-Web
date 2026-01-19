// app/(landing)/page.tsx
import FaqSection from '@/components/landing/FaqSection';
import HeroSection from '@/components/landing/HeroSection';
import OnboardingSection from '@/components/landing/OnboardingSection';
import SuccessStoriesSection from '@/components/landing/SuccessStoriesSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <OnboardingSection />
      <WhyChooseUsSection />
      <SuccessStoriesSection />
      <FaqSection />
    </>
  );
}
