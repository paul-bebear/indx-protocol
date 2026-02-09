import { useRef } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { ConsultingHero } from '../components/ConsultingHero';
import { ProblemSection } from '../components/ProblemSection';
import { BrandScanner } from '../components/BrandScanner';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { TestimonialSection } from '../components/TestimonialSection';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { FinalCTA } from '../components/FinalCTA';

interface HomeProps {
  onOpenModal?: () => void;
}

export function Home({ onOpenModal }: HomeProps) {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper className="flex flex-col items-center relative w-full">
      {/* Hero Section */}
      <section className="w-full">
        <ConsultingHero
          onGetAudit={onOpenModal}
          onSeeHowItWorks={scrollToHowItWorks}
        />
      </section>

      {/* Problem Section */}
      <section className="w-full">
        <ProblemSection />
      </section>

      {/* BrandScanner / AI Visibility Check */}
      <section className="w-full bg-background-muted">
        <div className="container-max py-8">
          <BrandScanner />
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} id="how-it-works" className="w-full">
        <HowItWorksSection />
      </section>

      {/* Testimonials / Social Proof */}
      <section className="w-full">
        <TestimonialSection />
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full">
        <PricingSection onOpenAuditModal={onOpenModal} />
      </section>

      {/* FAQ Section */}
      <section className="w-full">
        <FAQSection />
      </section>

      {/* Final CTA Section */}
      <section className="w-full">
        <FinalCTA onCTAClick={onOpenModal} />
      </section>
    </PageWrapper>
  );
}
