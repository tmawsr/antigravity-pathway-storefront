"use client";

import { useState, useEffect, useCallback, useRef, type FormEvent } from 'react';
import { useLeadForm } from './LeadFormContext';

// ─── Dropdown option constants (single-source-of-truth, easy to update) ───

const MARKETS = [
  "Dallas-Fort Worth, TX",
  "Denver, CO",
  "Charlotte, NC",
  "Nashville, TN",
  "Atlanta, GA",
  "Other",
] as const;

const CREDIT_SCORE_RANGES = [
  "Below 550 (Rebuilding)",
  "550–599 (Needs work)",
  "600–639 (Fair)",
  "640–699 (Good)",
  "700–749 (Very Good)",
  "750–850 (Excellent)",
] as const;



const SAVINGS_RANGES = [
  "Getting started (under $5,000)",
  "$5,000 – $15,000",
  "$15,000+",
] as const;

const REFERRAL_SOURCES = [
  "Google Search",
  "Social Media",
  "Real Estate Agent",
  "Friend / Family Referral",
  "Builder Sales Rep",
  "Employer",
  "News / Article",
  "Other",
] as const;

const PURCHASE_INTENT_OPTIONS = ["Yes", "No"] as const;

const PURCHASE_TIMELINE_OPTIONS = [
  "Within 6 months",
  "6–12 months",
  "1–2 years",
  "2–5 years",
] as const;

const MOVE_TIMEFRAME_OPTIONS = [
  "Next 3 months",
  "3–12 months",
  "Unsure",
] as const;

const TCPA_CONSENT_VERSION = "v1";

const TCPA_TEXT = `By entering a phone number and submitting this form, I authorize Pathway Homes and its service providers to contact me at the number I provide via voice call, text, artificial prerecorded voice, and ringless voicemail using an automatic telephone dialing system for marketing purposes. Not a condition for purchase. Message and data rates may apply. To opt-out at any time reply "STOP" or revoke your consent over phone.`;

// ─── Phone number format mask ───

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// ─── Currency format mask ───

function formatCurrency(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 9);
  if (digits.length === 0) return '';
  return '$' + Number(digits).toLocaleString('en-US');
}

// ─── Form field types ───

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  market: string;
  otherMarket: string;
  hasAgent: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  purchaseIntent: string;
  purchaseTimeline: string;
  moveTimeframe: string;
  creditScore: string;
  savings: string;
  income: string;
  referralSource: string;
  comments: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  market: '',
  otherMarket: '',
  hasAgent: '',
  agentName: '',
  agentPhone: '',
  agentEmail: '',
  purchaseIntent: '',
  purchaseTimeline: '',
  moveTimeframe: '',
  creditScore: '',
  savings: '',
  income: '',
  referralSource: '',
  comments: '',
};

// ─── Validation ───

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email';
  if (!data.phone.trim()) errors.phone = 'Phone number is required';
  else if (data.phone.replace(/\D/g, '').length < 10) errors.phone = 'Enter a complete phone number';
  if (!data.market) errors.market = 'Please select a market';
  if (data.market === 'Other' && !data.otherMarket.trim()) errors.otherMarket = 'Please enter your market';
  if (!data.hasAgent) errors.hasAgent = 'Please select an option';
  if (data.hasAgent === 'Yes' && !data.agentName.trim()) errors.agentName = 'Agent name is required';
  if (!data.purchaseIntent) errors.purchaseIntent = 'Please select an option';
  if (data.purchaseIntent === 'Yes' && !data.purchaseTimeline) errors.purchaseTimeline = 'Please select a timeframe';
  if (!data.moveTimeframe) errors.moveTimeframe = 'Please select a timeframe';
  if (!data.creditScore) errors.creditScore = 'Please select a range';
  if (!data.income.trim()) errors.income = 'Income is required';
  else if (Number(data.income.replace(/\D/g, '')) === 0) errors.income = 'Enter a valid income amount';
  if (!data.referralSource) errors.referralSource = 'Please select an option';
  return errors;
}

// ─── Shared input styles ───

const inputClass = "w-full bg-white/5 border border-medium-teal/50 rounded-[25px] px-5 py-3 text-white text-sm focus:outline-none focus:border-pathway-blue transition-colors placeholder:text-white/30";
const selectClass = "w-full bg-[#00394a] border border-medium-teal/50 rounded-[25px] px-5 py-3 text-white text-sm focus:outline-none focus:border-pathway-blue transition-colors appearance-none cursor-pointer";
const labelClass = "block text-sm font-medium text-white/70 mb-1.5";
const errorClass = "text-red-400 text-xs mt-1 pl-1";

// ─── Select chevron wrapper ───

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

// ─── Component ───

export default function LeadFormModal() {
  const { isOpen, closeForm, leadSource, formCTA, utmParams, referrerUrl } = useLeadForm();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form state when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM);
      setErrors({});
      setTouched(new Set());
      setSubmitting(false);
      setSubmitted(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeForm();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeForm]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Inline validation on blur
  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched(prev => new Set(prev).add(field));
    setErrors(prev => {
      const allErrors = validate(form);
      if (allErrors[field]) return { ...prev, [field]: allErrors[field] };
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, [form]);

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      // Clear conditional fields when parent changes
      if (field === 'market' && value !== 'Other') next.otherMarket = '';
      if (field === 'hasAgent' && value !== 'Yes') {
        next.agentName = '';
        next.agentPhone = '';
        next.agentEmail = '';
      }
      if (field === 'purchaseIntent' && value !== 'Yes') next.purchaseTimeline = '';
      return next;
    });
    // Re-validate if already touched
    if (touched.has(field)) {
      setErrors(prev => {
        const tempForm = { ...form, [field]: value };
        const allErrors = validate(tempForm);
        if (allErrors[field]) return { ...prev, [field]: allErrors[field] };
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [form, touched]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const allErrors = validate(form);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched(new Set(Object.keys(allErrors) as (keyof FormData)[]));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        // Auto-captured fields
        ...utmParams,
        lead_source: leadSource,
        form_cta: formCTA,
        page_url: window.location.href,
        referrer_url: referrerUrl,
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
        submission_timestamp: new Date().toISOString(),
        tcpa_consent_version: TCPA_CONSENT_VERSION,
      };
      const res = await fetch('/api/form-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setErrors({ firstName: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }, [form, utmParams, leadSource, formCTA, referrerUrl]);

  // Render nothing if closed (with exit animation handled by CSS)
  if (!isOpen) return null;

  // ─── Confirmation State ───
  if (submitted) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={closeForm}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="relative bg-[#00394a]/95 backdrop-blur-xl border border-medium-teal/30 rounded-[30px] p-10 md:p-14 max-w-lg w-full text-center shadow-2xl animate-modal-in" onClick={e => e.stopPropagation()}>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pathway-blue/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-pathway-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Thank you!</h2>
          <p className="text-white/70 text-lg mb-8">A member of the Pathway team will be in touch shortly. We&apos;re excited to help you on your journey to homeownership.</p>
          <button onClick={closeForm} className="bg-pathway-blue text-white px-8 py-3 rounded-[25px] font-medium hover:bg-pathway-blue/80 transition-all shadow-[0_0_20px_rgba(0,158,217,0.3)]">
            Close
          </button>
        </div>
      </div>
    );
  }

  // ─── Form ───
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={closeForm}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="relative bg-[#00394a]/95 backdrop-blur-xl border border-medium-teal/30 rounded-[30px] p-6 md:p-10 max-w-2xl w-full shadow-2xl max-h-[90dvh] overflow-y-auto animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={closeForm} className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors z-10" aria-label="Close form">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Header */}
        <div className="mb-8 pr-8">
          <div className="text-pathway-blue font-bold tracking-widest uppercase text-xs mb-2">Get Started</div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Start your path to <span className="italic text-pathway-blue">homeownership.</span></h2>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* ── Section 1: Contact Information ── */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold tracking-widest uppercase text-pathway-blue mb-1">Contact Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name*</label>
                <input type="text" className={inputClass} value={form.firstName} onChange={e => updateField('firstName', e.target.value)} onBlur={() => handleBlur('firstName')} />
                {touched.has('firstName') && errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
              </div>
              <div>
                <label className={labelClass}>Last Name*</label>
                <input type="text" className={inputClass} value={form.lastName} onChange={e => updateField('lastName', e.target.value)} onBlur={() => handleBlur('lastName')} />
                {touched.has('lastName') && errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email*</label>
                <input type="email" className={inputClass} value={form.email} onChange={e => updateField('email', e.target.value)} onBlur={() => handleBlur('email')} />
                {touched.has('email') && errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone Number*</label>
                <input type="tel" className={inputClass} placeholder="(555) 555-5555" value={form.phone} onChange={e => updateField('phone', formatPhone(e.target.value))} onBlur={() => handleBlur('phone')} />
                {touched.has('phone') && errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>
            </div>
          </fieldset>

          <div className="border-t border-medium-teal/20" />

          {/* ── Section 2: Property & Timeline ── */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold tracking-widest uppercase text-pathway-blue mb-1">Property & Timeline</legend>

            <div>
              <label className={labelClass}>What market are you interested in?*</label>
              <SelectWrapper>
                <select className={selectClass} value={form.market} onChange={e => updateField('market', e.target.value)} onBlur={() => handleBlur('market')}>
                  <option value="" disabled>Select a market</option>
                  {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </SelectWrapper>
              {touched.has('market') && errors.market && <p className={errorClass}>{errors.market}</p>}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${form.market === 'Other' ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                <input type="text" className={inputClass} placeholder="Enter your market (e.g. Austin, TX)" value={form.otherMarket} onChange={e => updateField('otherMarket', e.target.value)} onBlur={() => handleBlur('otherMarket')} />
                {touched.has('otherMarket') && errors.otherMarket && <p className={errorClass}>{errors.otherMarket}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Do you intend to purchase in the next 5 years?*</label>
                <SelectWrapper>
                  <select className={selectClass} value={form.purchaseIntent} onChange={e => updateField('purchaseIntent', e.target.value)} onBlur={() => handleBlur('purchaseIntent')}>
                    <option value="" disabled>Select</option>
                    {PURCHASE_INTENT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </SelectWrapper>
                {touched.has('purchaseIntent') && errors.purchaseIntent && <p className={errorClass}>{errors.purchaseIntent}</p>}
              </div>
              <div className={`transition-all duration-300 ease-in-out ${form.purchaseIntent === 'Yes' ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden md:invisible'}`}>
                <label className={labelClass}>How soon?*</label>
                <SelectWrapper>
                  <select className={selectClass} value={form.purchaseTimeline} onChange={e => updateField('purchaseTimeline', e.target.value)} onBlur={() => handleBlur('purchaseTimeline')}>
                    <option value="" disabled>Select</option>
                    {PURCHASE_TIMELINE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </SelectWrapper>
                {touched.has('purchaseTimeline') && errors.purchaseTimeline && <p className={errorClass}>{errors.purchaseTimeline}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>What is your timeframe to move?*</label>
              <SelectWrapper>
                <select className={selectClass} value={form.moveTimeframe} onChange={e => updateField('moveTimeframe', e.target.value)} onBlur={() => handleBlur('moveTimeframe')}>
                  <option value="" disabled>Select</option>
                  {MOVE_TIMEFRAME_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </SelectWrapper>
              {touched.has('moveTimeframe') && errors.moveTimeframe && <p className={errorClass}>{errors.moveTimeframe}</p>}
            </div>

            <div>
              <label className={labelClass}>Are you working with a real estate agent?*</label>
              <div className="flex gap-6 mt-1">
                {(['Yes', 'No'] as const).map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.hasAgent === opt ? 'border-pathway-blue bg-pathway-blue/20' : 'border-medium-teal/50 group-hover:border-white/40'}`}>
                      {form.hasAgent === opt && <span className="w-2.5 h-2.5 rounded-full bg-pathway-blue" />}
                    </span>
                    <input type="radio" name="hasAgent" value={opt} checked={form.hasAgent === opt} onChange={e => updateField('hasAgent', e.target.value)} className="sr-only" />
                    <span className="text-sm text-white/80">{opt}</span>
                  </label>
                ))}
              </div>
              {touched.has('hasAgent') && errors.hasAgent && <p className={errorClass}>{errors.hasAgent}</p>}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${form.hasAgent === 'Yes' ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className={labelClass}>Agent Name*</label>
                    <input type="text" className={inputClass} value={form.agentName} onChange={e => updateField('agentName', e.target.value)} onBlur={() => handleBlur('agentName')} />
                    {touched.has('agentName') && errors.agentName && <p className={errorClass}>{errors.agentName}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Agent Phone</label>
                    <input type="tel" className={inputClass} value={form.agentPhone} onChange={e => updateField('agentPhone', formatPhone(e.target.value))} />
                  </div>
                  <div>
                    <label className={labelClass}>Agent Email</label>
                    <input type="email" className={inputClass} value={form.agentEmail} onChange={e => updateField('agentEmail', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <div className="border-t border-medium-teal/20" />

          {/* ── Section 3: Financial Profile ── */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold tracking-widest uppercase text-pathway-blue mb-1">Financial Profile</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Estimated Credit Score*</label>
                <SelectWrapper>
                  <select className={selectClass} value={form.creditScore} onChange={e => updateField('creditScore', e.target.value)} onBlur={() => handleBlur('creditScore')}>
                    <option value="" disabled>Select</option>
                    {CREDIT_SCORE_RANGES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </SelectWrapper>
                {touched.has('creditScore') && errors.creditScore && <p className={errorClass}>{errors.creditScore}</p>}
              </div>
              <div>
                <label className={labelClass}>Estimated Household Annual Income*</label>
                <input type="text" inputMode="numeric" className={inputClass} placeholder="$75,000" value={form.income} onChange={e => updateField('income', formatCurrency(e.target.value))} onBlur={() => handleBlur('income')} />
                {touched.has('income') && errors.income && <p className={errorClass}>{errors.income}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Estimated Savings</label>
                <SelectWrapper>
                  <select className={selectClass} value={form.savings} onChange={e => updateField('savings', e.target.value)}>
                    <option value="" disabled>Select (optional)</option>
                    {SAVINGS_RANGES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </SelectWrapper>
              </div>
            </div>
          </fieldset>

          <div className="border-t border-medium-teal/20" />

          {/* ── Section 4: Additional Information ── */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold tracking-widest uppercase text-pathway-blue mb-1">Additional Information</legend>
            <div>
              <label className={labelClass}>How did you hear about Pathway?*</label>
              <SelectWrapper>
                <select className={selectClass} value={form.referralSource} onChange={e => updateField('referralSource', e.target.value)} onBlur={() => handleBlur('referralSource')}>
                  <option value="" disabled>Select</option>
                  {REFERRAL_SOURCES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </SelectWrapper>
              {touched.has('referralSource') && errors.referralSource && <p className={errorClass}>{errors.referralSource}</p>}
            </div>
            <div>
              <label className={labelClass}>Comments</label>
              <textarea className={`${inputClass} min-h-[80px] rounded-[20px] resize-none`} value={form.comments} onChange={e => updateField('comments', e.target.value)} placeholder="Anything else you'd like us to know? (optional)" />
            </div>
          </fieldset>

          {/* TCPA disclaimer */}
          <p className="text-white/35 text-[11px] leading-relaxed">
            {TCPA_TEXT}
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-pathway-blue text-white px-8 py-4 rounded-[25px] font-bold text-lg hover:bg-pathway-blue/80 transition-all shadow-[0_0_20px_rgba(0,158,217,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
