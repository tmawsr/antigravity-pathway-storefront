"use client";

import { useState } from 'react';
import { useLeadForm } from './LeadFormContext';

// PENDING BUSINESS DECISION: Minimum credit score threshold is under internal review.
// Update this single value when the final number is confirmed.
const MIN_CREDIT_SCORE = 600;

const FAQS = [
  {
    q: "What do I need to qualify?",
    a: `Stable income and rental history. We consider credit scores from ${MIN_CREDIT_SCORE} and provide complete coaching to get you mortgage-ready.`
  },
  {
    q: "How is this different from traditional rent to own?",
    a: "No inflated prices, premium rent, or large upfront fees. You pay standard market-rate rent and buy at fair market value."
  },
  {
    q: "How does paying rent build my credit?",
    a: "Through Esusu, every on-time payment is seamlessly reported to Equifax, Experian, and TransUnion to build your FICO score."
  },
  {
    q: "What if I'm not ready to buy in 3 years?",
    a: "Zero penalties. You can comfortably transition to another property. You paid fair market rent, so nothing is lost."
  },
  {
    q: "How is the purchase price determined?",
    a: "Based purely on an independent professional appraisal whenever you decide you are ready to buy. No pre-set inflation."
  },
  {
    q: "Where is the program available?",
    a: "Currently live in Dallas-Fort Worth, Denver, Charlotte, Nashville, and Atlanta. Home qualification varies by property."
  }
];

export default function FAQAndForm() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openForm } = useLeadForm();

  return (
    <div className="bg-dark-teal w-full text-white py-20 font-sans border-t border-medium-teal/30">
      
      {/* SECTION 10: FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 mb-32 scroll-mt-32">
        <div className="mb-14">
          <div className="text-pathway-blue font-bold tracking-widest uppercase text-sm mb-4">Questions & Answers</div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter">Everything you <br/><span className="italic text-pathway-blue">need to know.</span></h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-medium-teal/50 rounded-[25px] overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-8 py-6 flex justify-between items-center bg-white/5 hover:bg-medium-teal/20 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-lg md:text-xl pr-8">{faq.q}</span>
                <span className={`text-pathway-blue text-2xl transform transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-8 pt-0 text-white/70 text-lg leading-relaxed bg-white/5">
                  <div className="w-8 h-[1px] bg-pathway-blue mb-4 opacity-50" />
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
          <button
            onClick={() => openForm("homepage", "faq_browse_homes")}
            className="bg-pathway-blue text-white px-8 py-4 rounded-[25px] font-medium hover:bg-pathway-blue/80 shadow-[0_0_20px_rgba(0,158,217,0.3)] transition-all"
          >
            Ready to go? Browse Homes
          </button>
          <button
            onClick={() => openForm("homepage", "faq_schedule_call")}
            className="text-white/60 uppercase tracking-widest text-xs font-bold hover:text-white cursor-pointer transition-colors"
          >
            Still have questions? Schedule a call.
          </button>
        </div>
      </section>

      {/* SECTION 11: MARKET EXPANSION FORM */}
      <section className="bg-medium-teal/10 border-y border-medium-teal/30 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-pathway-blue font-bold tracking-widest uppercase text-sm mb-4">Help Us Expand</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter mb-6">Not in your market yet?</h2>
            <p className="text-xl text-white/80 font-light leading-relaxed mb-8">
              We are currently live in 5 major markets with more launching soon. Tell us where you want to see Pathway next.
            </p>
            <p className="text-sm text-white/50 border-l px-4 border-pathway-blue">
              You can also browse our traditional rental homes in Phoenix, Orlando, and Tampa.
            </p>
          </div>
          
          <div className="bg-dark-teal border border-medium-teal/50 shadow-2xl rounded-[30px] p-8 md:p-10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">First Name*</label>
                  <input type="text" className="w-full bg-white/5 border border-medium-teal/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pathway-blue transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Last Name*</label>
                  <input type="text" className="w-full bg-white/5 border border-medium-teal/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pathway-blue transition-colors" required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email Address*</label>
                <input type="email" className="w-full bg-white/5 border border-medium-teal/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pathway-blue transition-colors" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Desired Market*</label>
                <input type="text" className="w-full bg-white/5 border border-medium-teal/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pathway-blue transition-colors" placeholder="e.g. Austin, TX" required />
              </div>
              
              <button type="submit" className="w-full bg-pathway-blue text-white px-8 py-4 rounded-[25px] font-medium hover:bg-pathway-blue/80 transition-all shadow-[0_0_20px_rgba(0,158,217,0.3)] mt-4">
                Notify Me When Available
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="text-center py-10">
        <button
          onClick={() => openForm("homepage", "market_browse_homes")}
          className="text-white/60 uppercase tracking-widest text-xs font-bold hover:text-white cursor-pointer transition-colors"
        >
          Already in our area? Browse homes now →
        </button>
      </div>

    </div>
  );
}
