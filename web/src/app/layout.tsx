import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trek Group Qatar | Premium Business Setup, PRO Services & Company Formation",
  description: "Unlock business success in Qatar with Trek Group. We provide expert company formation, PRO services, legal attestation, and strategic business consultancy for international investors and local entrepreneurs.",
  keywords: [
    "Business Setup Qatar", 
    "Company Formation Doha", 
    "PRO Services Qatar", 
    "Trek Group Qatar", 
    "Qatar LLC Setup", 
    "Free Zone Company Qatar", 
    "Document Attestation Qatar",
    "Business Consultancy Doha",
    "Commercial Registration Qatar"
  ],
  authors: [{ name: "Trek Group" }],
  creator: "Trek Group",
  publisher: "Trek Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Trek Group Qatar | Leading Business Setup Experts",
    description: "Launch your business in Qatar with confidence. End-to-end support for company formation, PRO services, and legal compliance.",
    url: "https://trek-group.com",
    siteName: "Trek Group Qatar",
    images: [
      {
        url: "/treklogo.png",
        width: 800,
        height: 600,
        alt: "Trek Group Qatar Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trek Group Qatar | Business Setup Experts",
    description: "Transform your business vision into reality in Qatar.",
    images: ["/treklogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
