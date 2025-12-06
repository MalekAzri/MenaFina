'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-dark-primary text-white">
      <Header />

      <main id="main-content" className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
      </main>

      <Footer />
    </div>
  );
}
