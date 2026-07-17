import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Trek Group Qatar | Leading Business Setup Consultants in Qatar",

  description:
    "Learn about Trek Group Qatar, a trusted business setup consultancy helping entrepreneurs and foreign investors with company formation, company registration, PRO services, visa assistance, legal translation, certificate attestation, and business consulting across Qatar.",

  keywords: [
    "About Trek Group Qatar",
    "Business Setup Consultants Qatar",
    "Business Setup in Qatar",
    "Company Formation Qatar",
    "Company Registration Qatar",
    "Business Consultants Qatar",
    "Corporate Services Qatar",
    "PRO Services Qatar",
    "Foreign Company Registration Qatar",
    "100% Foreign Ownership Qatar",
    "Business Consultancy Qatar",
    "Commercial Registration Qatar",
    "Business Experts Qatar",
    "Entrepreneur Services Qatar",
    "Doha Business Consultants",
    "Qatar Company Formation Experts",
    "Trek Group Qatar",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Trek Group Qatar | Business Setup Experts",
    description:
      "Discover why Trek Group Qatar is a trusted partner for company formation, business setup, PRO services, and corporate consulting in Qatar.",
    url: "https://trekgroups.com/about",
    siteName: "Trek Group Qatar",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
