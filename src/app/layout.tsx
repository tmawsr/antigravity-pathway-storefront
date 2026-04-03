import type { Metadata } from "next";
import "./globals.css";
import { LeadFormProvider } from '@/components/LeadFormContext';
import LeadFormModal from '@/components/LeadFormModal';

export const metadata: Metadata = {
  title: "Pathway - Modern Real Estate",
  description: "Experience the future of real estate with our highly exclusive and uncompromising rental platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans bg-dark-teal text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <LeadFormProvider>
          {children}
          <LeadFormModal />
        </LeadFormProvider>
      </body>
    </html>
  );
}
