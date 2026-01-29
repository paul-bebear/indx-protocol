import { ProtocolHero } from '../components/ProtocolHero';
import { PageWrapper } from '../components/PageWrapper';
import { BrandScanner } from '../components/BrandScanner';
import { ManifestSection } from '../components/ManifestSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ShiftSection } from '../components/ShiftSection';

export function Home() {
    return (
        <PageWrapper className="flex flex-col items-center justify-center relative w-full">
            {/* Hero Section */}
            <div className="snap-section min-h-screen flex flex-col items-center justify-center w-full">
                <ProtocolHero />
                <BrandScanner />
            </div>

            {/* How It Works Section */}
            <div className="snap-section">
                <HowItWorksSection />
            </div>

            {/* Education Section */}
            <div className="snap-section">
                <ShiftSection />
            </div>

            {/* Tech Spec Section */}
            <div className="snap-section">
                <ManifestSection />
            </div>
        </PageWrapper>
    );
}
