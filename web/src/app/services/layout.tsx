import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Services | Company Formation & PRO Qatar",
  description: "Comprehensive business services in Qatar: Company Formation, PRO Services, Translation, Attestation, Branding, and more. Your one-stop shop for business growth in Doha.",
  keywords: ["Qatar Business Services", "Company Registration Doha", "PRO Services Qatar", "Document Attestation Doha", "Business Consultancy Qatar"],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
