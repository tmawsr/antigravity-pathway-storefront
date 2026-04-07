"use client";

import { useEffect, useRef } from 'react';
import { useLeadForm } from './LeadFormContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Final Production Overrides (Strictly local assets)
const EXTERIOR_URL = "/images/hero-exterior-v2.jpg"; // Front Rancher
const LIVING_URL = "/images/living-room-v2.jpg"; // Family on couch
const KITCHEN_URL = "/images/kitchen-v2.jpg"; // D.R Horton style
const BATHROOM_URL = "/images/bathroom-v2.jpg"; // Modern new build
const BACKYARD_URL = "/images/backyard-v2.jpg"; // Success state

const ROOMS = [EXTERIOR_URL, LIVING_URL, KITCHEN_URL, BATHROOM_URL, BACKYARD_URL];

export default function Walkthrough() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openForm } = useLeadForm();
  
  // Script Context Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const journeyLineRef = useRef<SVGPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  
  // Strict React Node bindings to prevent Next.js string resolution crashes
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context;
    let frameId: number;

    // Poll via requestAnimationFrame until all layer refs are populated
    let retries = 0;
    const MAX_RETRIES = 60; // ~1s at 60fps

    const tryInit = () => {
      if (!layerRefs.current[0] || !layerRefs.current[4]) {
        if (++retries < MAX_RETRIES) {
          frameId = requestAnimationFrame(tryInit);
          return;
        }
        console.warn('[Walkthrough] Layer refs not ready after max retries');
        return;
      }

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth < 768;

        // Set initial scale for all layers
        layerRefs.current.forEach(layer => {
          if (layer) gsap.set(layer, { scale: isMobile ? 1.0 : 1.15 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: isMobile ? "+=800%" : "+=1200%",
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        });

        // Hummingbird Dot Trail: Grow a clipPath rect to progressively reveal the dotted curve
        if (clipRectRef.current) {
          tl.fromTo(clipRectRef.current, 
            { attr: { height: 0 } }, 
            { attr: { height: 1000 }, ease: 'none', duration: 10 }, 
          0);
        }

        // ROOM 1: HERO (Exterior) — 0 to 2
        tl.fromTo(layerRefs.current[0], { scale: isMobile ? 1.0 : 1.15 }, { scale: isMobile ? 1.1 : 1.25, ease: "none", duration: 2 }, 0);
        tl.to(heroRef.current, { autoAlpha: 0, y: -30, duration: 0.4, ease: 'power2.in' }, 1.2);
        tl.to(layerRefs.current[0], { autoAlpha: 0, duration: 0.4 }, 1.8);

        // ROOM 2: A DIFFERENT PROGRAM (Living Room) — 2 to 4
        tl.fromTo(layerRefs.current[1], { scale: isMobile ? 1.0 : 1.15 }, { scale: isMobile ? 1.1 : 1.25, ease: "none", duration: 2 }, 2);
        tl.fromTo(compareRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 2.2);
        // Staggered compare children
        const compareChildren = compareRef.current?.querySelectorAll('.anim-compare') || [];
        gsap.set(compareChildren, { autoAlpha: 0, y: 15 });
        compareChildren.forEach((el, i) => {
          tl.fromTo(el, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 2.35 + i * 0.06);
        });
        tl.to(compareRef.current, { autoAlpha: 0, y: -30, duration: 0.4, ease: 'power2.in' }, 3.4);
        tl.to(layerRefs.current[1], { autoAlpha: 0, duration: 0.4 }, 3.8);

        // ROOM 3: YOUR JOURNEY (Kitchen) — 4 to 6
        tl.fromTo(layerRefs.current[2], { scale: isMobile ? 1.0 : 1.15 }, { scale: isMobile ? 1.1 : 1.25, ease: "none", duration: 2 }, 4);
        tl.fromTo(journeyRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 4.2);
        // Staggered journey children
        const journeyChildren = journeyRef.current?.querySelectorAll('.anim-journey') || [];
        gsap.set(journeyChildren, { autoAlpha: 0, y: 18 });
        journeyChildren.forEach((el, i) => {
          tl.fromTo(el, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 4.35 + i * 0.06);
        });
        tl.to(journeyRef.current, { autoAlpha: 0, y: -30, duration: 0.4, ease: 'power2.in' }, 5.4);
        tl.to(layerRefs.current[2], { autoAlpha: 0, duration: 0.4 }, 5.8);

        // ROOM 4: FINANCIAL HELP (Bathroom) — 6 to 8
        tl.fromTo(layerRefs.current[3], { scale: isMobile ? 1.0 : 1.15 }, { scale: isMobile ? 1.1 : 1.25, ease: "none", duration: 2 }, 6);
        tl.fromTo(financeRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 6.2);
        // Staggered finance children
        const financeChildren = financeRef.current?.querySelectorAll('.anim-finance') || [];
        gsap.set(financeChildren, { autoAlpha: 0, y: 15 });
        financeChildren.forEach((el, i) => {
          tl.fromTo(el, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 6.35 + i * 0.06);
        });
        tl.to(financeRef.current, { autoAlpha: 0, y: -30, duration: 0.4, ease: 'power2.in' }, 7.4);
        tl.to(layerRefs.current[3], { autoAlpha: 0, duration: 0.4 }, 7.8);

        // ROOM 5: TRACK PROGRESS (Backyard) — 8 to 10
        tl.fromTo(layerRefs.current[4], { scale: isMobile ? 1.0 : 1.15 }, { scale: isMobile ? 1.1 : 1.25, ease: "none", duration: 2 }, 8);
        tl.fromTo(progressRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 8.2);
        // Staggered progress children
        const progressChildren = progressRef.current?.querySelectorAll('.anim-progress') || [];
        gsap.set(progressChildren, { autoAlpha: 0, y: 15 });
        progressChildren.forEach((el, i) => {
          tl.fromTo(el, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 8.35 + i * 0.06);
        });

      }, containerRef);
      
      ScrollTrigger.refresh();
    };

    frameId = requestAnimationFrame(tryInit);

    // Refresh on resize for responsive recalculation
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      if (ctx) ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] bg-dark-teal overflow-hidden font-sans border-t border-medium-teal">

      {/* Image stack */}
      <div className="absolute inset-x-0 top-0 h-[100dvh] z-0 overflow-hidden bg-black">
        {ROOMS.map((url, index) => (
          <div 
            key={index}
            ref={(el) => { layerRefs.current[index] = el; }}
            className={`portal-layer-${index} absolute left-0 right-0 top-[12%] bottom-[12%] md:top-0 md:bottom-0 opacity-100 bg-dark-teal`}
            style={{ 
              zIndex: 100 - index,
              willChange: 'transform, opacity'
            }}
          >
            <Image 
               src={url}
               alt={`Architectural Environment Layer ${index}`}
               fill
               priority={index === 0}
               className="object-cover object-center md:object-bottom"
               sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dark teal vignette */}
      <div className="absolute inset-0 bg-[#00394a]/60 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,57,74,0.6)_100%)] pointer-events-none z-10" />

      {/* Hummingbird Dot Trail — dots appear along a loopy SVG curve as you scroll */}
      <svg 
        className="absolute top-0 left-0 md:left-[3%] w-[140px] md:w-[220px] h-[100dvh] pointer-events-none z-20"
        viewBox="0 0 200 1000" 
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <clipPath id="hummingbird-reveal">
            <rect ref={clipRectRef} x="0" y="0" width="200" height="0" />
          </clipPath>
        </defs>
        {/* The dotted loopy path, clipped to only show what's been "flown" */}
        <g clipPath="url(#hummingbird-reveal)">
          <path
            ref={journeyLineRef}
            d="M 100 0 C 170 60, 30 120, 100 180 S 170 300, 100 360 S 30 480, 100 540 S 170 660, 100 720 S 30 840, 100 900 S 140 960, 100 1000"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="3 12"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,158,217,0.7))' }}
          />
        </g>
      </svg>

      {/* CONTENT OVERLAYS */}
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full z-30 pointer-events-none">
        
        {/* 1. HERO */}
        <div ref={heroRef} className="absolute inset-x-0 w-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-16 lg:px-32 drop-shadow-2xl">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter text-white mb-4 md:mb-6">
            Rent to Own, <br /> <span className="italic text-pathway-blue">Reimagined.</span>
          </h1>
          <p className="mb-3 md:mb-4 max-w-4xl text-xl sm:text-2xl md:text-3xl font-light text-white/95 leading-tight">
            <span className="block md:inline">Move in today. </span>
            <span className="block md:inline">Buy when ready.</span>
          </p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-white mb-6 md:mb-8 max-w-4xl">
            With up to <span className="text-pathway-blue">$12,000+*</span> in assistance to help you get there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
            <button
              onClick={() => openForm("homepage", "hero_see_qualify")}
              className="w-auto self-start bg-pathway-blue text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg font-bold hover:bg-pathway-blue/80 shadow-[0_0_20px_rgba(0,158,217,0.3)] transition-all"
            >
              See If You Qualify
            </button>
          </div>
          <p className="text-white/30 text-[10px] md:text-[11px] leading-snug mt-4 max-w-xl">*Illustrative example based on a $400k home. Actual assistance amounts will vary based on home price, eligibility, and market conditions.</p>
        </div>

        {/* 2. DIFFERENT PROGRAM */}
        <div ref={compareRef} className="absolute inset-x-0 w-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 md:px-16 lg:px-32 opacity-0 invisible drop-shadow-2xl">
          <div className="w-full bg-[#00394a]/90 backdrop-blur-xl border border-medium-teal/30 rounded-2xl md:rounded-[40px] p-5 md:p-10 lg:p-14 pointer-events-auto shadow-2xl max-h-[85dvh] overflow-y-auto">
            <div className="anim-compare text-pathway-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-4">An Upgraded Program</div>
            <h2 className="anim-compare text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-6 md:mb-10 text-white">Forget what you've heard about <br/><span className="italic text-pathway-blue">rent to own.</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="anim-compare bg-white/5 border border-white/10 rounded-xl md:rounded-[25px] p-4 md:p-8">
                <h3 className="text-base md:text-xl font-serif text-white/50 mb-3 md:mb-6 border-b border-white/10 pb-3 md:pb-4">Traditional Wait-to-Buy</h3>
                <ul className="space-y-2 md:space-y-4">
                  <li className="flex gap-3"><span className="text-red-500 font-bold" aria-hidden="true">✗</span><span className="sr-only">Not included:</span><span className="text-white/70 text-sm md:text-base">Large non-refundable upfront fee</span></li>
                  <li className="flex gap-3"><span className="text-red-500 font-bold" aria-hidden="true">✗</span><span className="sr-only">Not included:</span><span className="text-white/70 text-sm md:text-base">Inflated above-market rent</span></li>
                  <li className="flex gap-3"><span className="text-red-500 font-bold" aria-hidden="true">✗</span><span className="sr-only">Not included:</span><span className="text-white/70 text-sm md:text-base">Locked into inflated future price</span></li>
                </ul>
              </div>
              <div className="anim-compare bg-[#00394a] border border-pathway-blue rounded-xl md:rounded-[25px] p-4 md:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(0,158,217,0.15)]">
                <h3 className="text-base md:text-xl font-serif text-white mb-3 md:mb-6 border-b border-pathway-blue/30 pb-3 md:pb-4">Pathway</h3>
                <ul className="space-y-2 md:space-y-4 relative z-10">
                  <li className="flex gap-3"><span className="text-pathway-blue font-bold" aria-hidden="true">✓</span><span className="sr-only">Included:</span><span className="text-white font-medium text-sm md:text-base">No large upfront payments</span></li>
                  <li className="flex gap-3"><span className="text-pathway-blue font-bold" aria-hidden="true">✓</span><span className="sr-only">Included:</span><span className="text-white font-medium text-sm md:text-base">Market-rate rent, no premiums</span></li>
                  <li className="flex gap-3"><span className="text-pathway-blue font-bold" aria-hidden="true">✓</span><span className="sr-only">Included:</span><span className="text-white font-medium text-sm md:text-base">Buy at future appraised fair market value</span></li>
                </ul>
              </div>
            </div>
            <div className="anim-compare text-center mt-6 md:mt-8">
              <button
                onClick={() => openForm("homepage", "compare_see_how")}
                className="bg-pathway-blue text-white px-8 py-4 rounded-[25px] font-medium hover:bg-pathway-blue/80 shadow-[0_0_20px_rgba(0,158,217,0.3)] transition-all"
              >
                See How It Works for You
              </button>
              <p className="text-white/30 text-[10px] md:text-[11px] leading-snug mt-4 max-w-lg mx-auto">Program features described are subject to eligibility requirements. Rent amounts, purchase terms, and availability vary by market and property.</p>
            </div>
          </div>
        </div>

        {/* 3. YOUR JOURNEY + 4 STEPS */}
        <div ref={journeyRef} className="absolute inset-x-0 w-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 md:px-16 lg:px-24 opacity-0 invisible drop-shadow-2xl">
          <div className="w-full bg-[#00394a]/90 backdrop-blur-xl border border-medium-teal/30 rounded-2xl md:rounded-[40px] p-5 md:p-10 lg:p-14 pointer-events-auto text-center shadow-2xl max-h-[85dvh] overflow-y-auto">
            <div className="anim-journey text-pathway-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-4">Your Journey</div>
            <h2 className="anim-journey text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white mb-6 md:mb-10">From renter to homeowner in <span className="italic text-pathway-blue">4 steps.</span></h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 text-left">
              <div className="anim-journey bg-white/5 border border-medium-teal/30 rounded-xl md:rounded-[25px] p-3 md:p-6">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-pathway-blue/10 border border-pathway-blue/20 flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-[0_0_12px_rgba(0,158,217,0.15)]">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                </div>
                <h3 className="text-sm md:text-xl font-serif mb-2 md:mb-3 text-pathway-blue">1. Find Your Home</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed">Browse inventory and move in. Zero bidding wars.</p>
              </div>
              <div className="anim-journey bg-white/5 border border-medium-teal/30 rounded-xl md:rounded-[25px] p-3 md:p-6">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-pathway-blue/10 border border-pathway-blue/20 flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-[0_0_12px_rgba(0,158,217,0.15)]">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                </div>
                <h3 className="text-sm md:text-xl font-serif mb-2 md:mb-3 text-pathway-blue">2. Get Mortgage Ready</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed">On-time rent builds credit through automatic reporting to all three bureaus while coaching gets you mortgage-qualified.</p>
              </div>
              <div className="anim-journey bg-white/5 border border-medium-teal/30 rounded-xl md:rounded-[25px] p-3 md:p-6">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-pathway-blue/10 border border-pathway-blue/20 flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-[0_0_12px_rgba(0,158,217,0.15)]">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                </div>
                <h3 className="text-sm md:text-xl font-serif mb-2 md:mb-3 text-pathway-blue">3. Get Supported</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed">Personalized coaching keeps milestones on track.</p>
              </div>
              <div className="anim-journey bg-white/5 border border-medium-teal/30 rounded-xl md:rounded-[25px] p-3 md:p-6">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-pathway-blue/10 border border-pathway-blue/20 flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-[0_0_12px_rgba(0,158,217,0.15)]">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
                </div>
                <h3 className="text-sm md:text-xl font-serif mb-2 md:mb-3 text-pathway-blue">4. Buy When Ready</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed">Purchase with up to $12,000+* in assistance.</p>
              </div>
            </div>
            <div className="anim-journey text-center mt-6 md:mt-8">
              <button
                onClick={() => openForm("homepage", "journey_check_qualify")}
                className="bg-pathway-blue text-white px-8 py-4 rounded-[25px] font-medium hover:bg-pathway-blue/80 shadow-[0_0_20px_rgba(0,158,217,0.3)] transition-all"
              >
                Check If You Qualify
              </button>
              <p className="text-white/30 text-[10px] md:text-[11px] leading-snug mt-4 max-w-lg mx-auto">*Illustrative example based on a $400k home. Actual assistance amounts, costs, and terms will vary based on credit profile, home price, and market conditions. Subject to eligibility.</p>
            </div>
          </div>
        </div>

        {/* 4. FINANCIAL HELP */}
        <div ref={financeRef} className="absolute inset-x-0 w-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 md:px-16 lg:px-32 opacity-0 invisible drop-shadow-2xl">
          <div className="bg-[#00394a]/90 backdrop-blur-xl border border-medium-teal/30 rounded-2xl md:rounded-[40px] p-5 md:p-10 lg:p-14 w-full pointer-events-auto shadow-2xl max-h-[85dvh] overflow-y-auto">
            <div className="anim-finance text-center mb-6 md:mb-10">
              <div className="text-pathway-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-4">Financial Help</div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white">Up to <span className="italic text-pathway-blue">$12,000+</span> to help you buy.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="anim-finance bg-white/5 border border-medium-teal/30 rounded-xl md:rounded-[25px] p-4 md:p-8 text-center hover:border-pathway-blue transition-colors">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-pathway-blue/10 border border-pathway-blue/20 flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-[0_0_16px_rgba(0,158,217,0.15)]">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-2 md:mb-3">3% Assistance</h3>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed">On a $400k home, that's $12k toward your down payment—fronted by Pathway.</p>
              </div>
              <div className="anim-finance bg-white/5 border border-medium-teal/30 rounded-xl md:rounded-[25px] p-4 md:p-8 text-center hover:border-pathway-blue transition-colors">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-pathway-blue/10 border border-pathway-blue/20 flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-[0_0_16px_rgba(0,158,217,0.15)]">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-2 md:mb-3">Credit Reporting</h3>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed">Every on-time rent payment is reported to all three bureaus, actively building your credit score.</p>
              </div>
              <div className="anim-finance bg-white/5 border border-medium-teal/30 rounded-xl md:rounded-[25px] p-4 md:p-8 text-center hover:border-pathway-blue transition-colors">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-pathway-blue/10 border border-pathway-blue/20 flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-[0_0_16px_rgba(0,158,217,0.15)]">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-2 md:mb-3">1-on-1 Coaching</h3>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed">A dedicated coach guides you through every milestone—from credit improvement to mortgage qualification.</p>
              </div>
            </div>
            <div className="anim-finance text-center mt-6 md:mt-8">
              <button
                onClick={() => openForm("homepage", "finance_claim_assist")}
                className="bg-pathway-blue text-white px-8 py-4 rounded-[25px] font-medium hover:bg-pathway-blue/80 shadow-[0_0_20px_rgba(0,158,217,0.3)] transition-all"
              >
                Claim Your Assistance
              </button>
              <p className="text-white/30 text-[10px] md:text-[11px] leading-snug mt-4 max-w-lg mx-auto">Illustrative example. Dollar amounts shown are based on a $400k home and 3% down payment assistance. Actual costs, terms, and assistance amounts will vary based on credit profile, home price, and market conditions. Subject to program eligibility and availability.</p>
            </div>
          </div>
        </div>

        {/* 5. TRACK PROGRESS */}
        <div ref={progressRef} className="absolute inset-x-0 w-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 md:px-16 lg:px-32 opacity-0 invisible drop-shadow-2xl">
          <div className="bg-[#00394a]/90 backdrop-blur-xl border border-medium-teal/30 rounded-2xl md:rounded-[40px] p-5 md:p-10 lg:p-14 w-full pointer-events-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center shadow-2xl max-h-[85dvh] overflow-y-auto">
            <div>
              <div className="anim-progress text-pathway-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-4">Track Progress</div>
              <h2 className="anim-progress text-2xl sm:text-3xl md:text-5xl font-serif font-bold tracking-tighter mb-4 md:mb-6 text-white">Your homeownership plan, <br/><span className="italic text-pathway-blue">all in one place.</span></h2>
              <p className="anim-progress text-sm md:text-lg text-white/80 font-light leading-relaxed">
                A personalized dashboard tracks your milestones. Monitor credit score growth, tasks, and financing goals with your coach.
              </p>
              <div className="anim-progress mt-6 md:mt-8">
                <button
                  onClick={() => openForm("homepage", "progress_start_journey")}
                  className="bg-pathway-blue text-white px-8 py-4 rounded-[25px] font-medium hover:bg-pathway-blue/80 shadow-[0_0_20px_rgba(0,158,217,0.3)] transition-all"
                >
                  Start Your Journey
                </button>
              </div>
              <button
                onClick={() => openForm("homepage", "progress_talk_team")}
                className="text-white/60 uppercase tracking-widest text-xs font-bold hover:text-white cursor-pointer transition-colors mt-4"
              >
                Or talk to our team first
              </button>
            </div>
            
            <div className="anim-progress bg-white/5 border border-medium-teal/30 rounded-xl md:rounded-[25px] p-4 md:p-8 shadow-inner">
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tighter mb-4 md:mb-6 text-white">Buy when you're ready.</h2>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h4 className="font-medium text-white text-sm md:text-base mb-1"><span className="text-pathway-blue mr-2" aria-hidden="true">✓</span><span className="sr-only">Included:</span>Fair market value pricing.</h4>
                  <p className="text-white/50 text-xs ml-6">Price is set by an independent appraisal.</p>
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm md:text-base mb-1"><span className="text-pathway-blue mr-2" aria-hidden="true">✓</span><span className="sr-only">Included:</span>No bidding wars.</h4>
                  <p className="text-white/50 text-xs ml-6">You possess exclusive purchasing rights.</p>
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm md:text-base mb-1"><span className="text-pathway-blue mr-2" aria-hidden="true">✓</span><span className="sr-only">Included:</span>Zero penalties.</h4>
                  <p className="text-white/50 text-xs ml-6">Transition out having simply paid fair market rent.</p>
                </div>
              </div>
              <p className="text-white/30 text-[10px] md:text-[11px] leading-snug mt-4">Purchase option, pricing terms, and exit conditions are subject to your lease agreement. Eligibility requirements apply. This is not a guarantee of future home purchase.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
