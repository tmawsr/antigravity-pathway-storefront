"use client";

import Walkthrough from '@/components/Walkthrough';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-teal text-white font-sans selection:bg-pathway-blue selection:text-white">
      {/* Sections 2-4: The Hero, The Contrast Table, and the 4 Step Walkthrough */}
      <Walkthrough />
    </div>
  );
}
