"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

interface LeadFormContextValue {
  isOpen: boolean;
  leadSource: string;
  formCTA: string;
  utmParams: UTMParams;
  referrerUrl: string;
  openForm: (leadSource: string, formCTA: string) => void;
  closeForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error('useLeadForm must be used within LeadFormProvider');
  return ctx;
}

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [leadSource, setLeadSource] = useState('');
  const [formCTA, setFormCTA] = useState('');
  const [referrerUrl, setReferrerUrl] = useState('');
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });

  // Capture UTM params and referrer on initial page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
    });
    setReferrerUrl(document.referrer);
  }, []);

  const openForm = useCallback((source: string, cta: string) => {
    setLeadSource(source);
    setFormCTA(cta);
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LeadFormContext.Provider value={{ isOpen, leadSource, formCTA, utmParams, referrerUrl, openForm, closeForm }}>
      {children}
    </LeadFormContext.Provider>
  );
}
