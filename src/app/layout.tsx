import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { LeadFormProvider } from '@/components/LeadFormContext';
import LeadFormModal from '@/components/LeadFormModal';

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
  display: "swap",
});

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
      className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-light-beige text-dark-teal">
        <LeadFormProvider>
          {children}
          <LeadFormModal />
        </LeadFormProvider>
      </body>
    </html>
  );
}
