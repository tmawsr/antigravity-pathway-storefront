"use client";

import Navigation from '@/components/Navigation';
import Walkthrough from '@/components/Walkthrough';
import ContentSections from '@/components/ContentSections';
import FAQAndForm from '@/components/FAQAndForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-teal text-white font-sans selection:bg-pathway-blue selection:text-white">
      <Navigation />
      
      {/* Sections 2-4: The Hero, The Contrast Table, and the 4 Step Walkthrough */}
      <Walkthrough />
      
      {/* Sections 5-9: Financial Help, Partner Ecosystem, Progress, Purchase Flexibility, Social Proof */}
      <ContentSections />
      
      {/* Sections 10-13: FAQ Accordions, Market Form, Final CTAs, and Footer */}
      <FAQAndForm />
    </div>
  );
}
