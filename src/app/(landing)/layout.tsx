// app/(landing)/layout.tsx
import Footer from '@/components/layouts/Footer';
import PublicHeader from '@/components/layouts/headers/PublicHeader';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
