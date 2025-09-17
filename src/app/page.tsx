import NavigationBar from "@/components/authentication/landing/navigation-bar";
import HeroSection from "@/components/authentication/landing/hero-section";
import StatsSection from "@/components/authentication/landing/stats-section";
import HowItWorksSection from "@/components/authentication/landing/how-it-works-section";
import FeaturesSection from "@/components/authentication/landing/features-section";
import CategoriesSection from "@/components/authentication/landing/categories-section";
import CTASection from "@/components/authentication/landing/cta-section";
import FooterSection from "@/components/authentication/landing/footer-section";

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
