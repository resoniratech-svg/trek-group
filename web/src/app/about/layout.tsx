import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Trek Group Qatar",
  description: "Learn about Trek Group Qatar, the leading business setup consultancy in Doha. With over 10 years of experience and 1,000+ clients, we simplify company formation in Qatar.",
  keywords: ["About Trek Group", "Qatar Business Consultants", "Trek Group History", "Doha Company Formation Experts"],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
