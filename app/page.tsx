import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WizardSection } from "@/components/wizard-section"
import { FeaturesSection } from "@/components/features-section"
import { RbsyncSection } from "@/components/rbsync-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WizardSection />
        <FeaturesSection />
        <RbsyncSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
