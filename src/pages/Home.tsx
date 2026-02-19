import { NewHero } from '../components/NewHero';
import { DiscoveryPathsSection } from '../components/DiscoveryPathsSection';
import { InvisibleGapSection } from '../components/InvisibleGapSection';
import { OperationalROISection } from '../components/OperationalROISection';
import { CommandCenterSection } from '../components/CommandCenterSection';
import { RoadmapSection } from '../components/RoadmapSection';
import { AuditCTASection } from '../components/AuditCTASection';

interface HomeProps {
  onOpenModal?: () => void;
}

export function Home({ onOpenModal }: HomeProps) {
  return (
    <div className="flex flex-col items-center relative w-full">
      {/* Hero Section */}
      <section className="w-full">
        <NewHero onGetAudit={onOpenModal} />
      </section>

      {/* 5 Discovery Paths */}
      <section className="w-full">
        <DiscoveryPathsSection />
      </section>

      {/* The Invisible Gap Defined */}
      <section className="w-full">
        <InvisibleGapSection />
      </section>

      {/* Operational ROI Calculator */}
      <section className="w-full">
        <OperationalROISection />
      </section>

      {/* Database Migration Pop */}
      <section className="w-full">
        <CommandCenterSection />
      </section>

      {/* Intelligence Roadmap */}
      <section className="w-full">
        <RoadmapSection />
      </section>

      {/* Final CTA */}
      <section className="w-full">
        <AuditCTASection onSubmit={(url) => {
          console.log('Audit requested for:', url);
          onOpenModal?.();
        }} />
      </section>
    </div>
  );
}

