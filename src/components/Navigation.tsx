"use client";

import Link from 'next/link';
import { useLeadForm } from './LeadFormContext';

export default function Navigation() {
  const { openForm } = useLeadForm();

  return (
    <nav className="absolute top-0 inset-x-0 z-50 w-full bg-dark-teal/90 backdrop-blur-md border-b border-medium-teal/30">
      <div className="flex items-center justify-between px-6 md:px-10 py-5 w-full">
        
        {/* Left: Branding & Logo */}
        <Link href="/" className="text-white text-3xl font-serif font-bold tracking-tight shrink-0 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pathway-blue flex items-center justify-center shadow-[0_0_10px_rgba(0,158,217,0.4)]">
             <div className="w-3 h-3 bg-white rounded-sm" />
          </div>
          Pathway
        </Link>
        
        {/* Center/Right: Scraped Dropdowns (Grouped Right) */}
        <div className="hidden lg:flex items-center gap-8 ml-auto mr-10">
          
          <div className="group relative cursor-pointer py-2">
            <span className="text-white/90 hover:text-white text-sm font-medium tracking-wide flex items-center gap-1.5 transition-colors">
              Browse Homes
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>

          <div className="group relative cursor-pointer py-2">
            <span className="text-white/90 hover:text-white text-sm font-medium tracking-wide flex items-center gap-1.5 transition-colors">
              How It Works
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>

          <div className="group relative cursor-pointer py-2">
            <span className="text-white/90 hover:text-white text-sm font-medium tracking-wide flex items-center gap-1.5 transition-colors">
              Resources
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>

          <Link href="#" className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors py-2">
            About Us
          </Link>
          <Link href="#" className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors py-2">
            Agents
          </Link>

        </div>

        {/* Far Right: Contact & Primary CTA */}
        <div className="flex items-center gap-6 shrink-0">
          <a href="tel:8779581888" className="hidden md:flex items-center gap-2 text-white/90 font-medium hover:text-white transition-colors">
            <svg className="w-4 h-4 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            (877) 958-1888
          </a>
          
          <button
            onClick={() => openForm("homepage", "nav_apply")}
            className="bg-pathway-blue text-white px-7 py-2.5 rounded-[25px] text-sm font-bold tracking-wide hover:bg-pathway-blue/80 shadow-[0_0_15px_rgba(0,158,217,0.3)] hover:shadow-[0_0_20px_rgba(0,158,217,0.5)] transition-all"
          >
            Apply
          </button>
          
          {/* Mobile Hamburger */}
          <button className="lg:hidden text-white/80 hover:text-white p-2 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

      </div>
    </nav>
  );
}
