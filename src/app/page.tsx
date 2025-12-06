'use client';

import { useSession } from 'next-auth/react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col font-inter bg-dark-primary text-white">
      <Header />

      {session ? (
        <Dashboard />
      ) : (
        <main id="main-content" className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
        </main>
      )}

      <Footer />
    </div>
  );
}
