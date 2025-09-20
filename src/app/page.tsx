import NavigationBar from "@/components/landing/navigation-bar";
import HeroSection from "@/components/landing/hero-section";
import StatsSection from "@/components/landing/stats-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import FeaturesSection from "@/components/landing/features-section";
import CategoriesSection from "@/components/landing/categories-section";
import CTASection from "@/components/landing/cta-section";
import FooterSection from "@/components/landing/footer-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <NavigationBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Features */}
      <FeaturesSection />

      {/* Categories */}
      <CategoriesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
