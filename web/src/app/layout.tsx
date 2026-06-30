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
  metadataBase: new URL("https://trekgroups.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default:
      "Business Setup in Qatar | Company Formation & PRO Services | Trek Group Qatar",

    template: "%s | Trek Group Qatar",
  },
  description:
    "Trek Group Qatar helps entrepreneurs and foreign investors with Business Setup in Qatar, Company Formation, Company Registration, PRO Services, Visa Services, Legal Translation, Certificate Attestation and Corporate Banking Assistance.",
  keywords: [
    "Business Setup in Qatar",
    "Company Formation Qatar",
    "Company Registration Qatar",
    "Start a Business in Qatar",
    "Register a Company in Qatar",
    "Business Setup Consultants Qatar",
    "Qatar Business Consultants",
    "Business Consulting Qatar",
    "Foreign Company Registration Qatar",
    "100% Foreign Ownership Qatar",
    "Mainland Company Formation Qatar",
    "Free Zone Company Setup Qatar",
    "Qatar LLC Registration",
    "Commercial Registration Qatar",
    "Trade License Qatar",
    "Business License Qatar",
    "PRO Services Qatar",
    "Corporate PRO Services",
    "QID Services Qatar",
    "Visa Services Qatar",
    "Work Visa Qatar",
    "Business Visa Qatar",
    "Family Visa Qatar",
    "Hayya Visa Qatar",
    "Legal Translation Qatar",
    "Certified Translation Qatar",
    "Certificate Attestation Qatar",
    "MOFA Attestation Qatar",
    "Document Attestation Qatar",
    "Corporate Bank Account Qatar",
    "Business Bank Account Qatar",
    "Tax Documentation Qatar",
    "Audit Documentation Support Qatar",
    "Share Transfer Qatar",
    "CR Amendments Qatar",
    "Company Amendment Qatar",
    "Business Expansion Qatar",
    "Software Development Qatar",
    "Web Development Qatar",
    "Mobile App Development Qatar",
    "ERP Development Qatar",
    "CRM Solutions Qatar",
    "Digital Marketing Qatar",
    "SEO Services Qatar",
    "Cloud Solutions Qatar",
    "Business Support Services Qatar",
    "Entrepreneur Services Qatar",
    "Startup Consulting Qatar",
    "Trek Group Qatar",
  ],
  authors: [{ name: "Trek Group" }],
  creator: "Trek Group",
  publisher: "Trek Group",
  category: "Business Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Trek Group Qatar | Leading Business Setup Experts",
    description:
      "Launch your business in Qatar with confidence. End-to-end support for company formation, PRO services, and legal compliance.",
    url: "https://trekgroups.com",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import WhatsAppButton from "@/components/WhatsAppButton";

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
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
