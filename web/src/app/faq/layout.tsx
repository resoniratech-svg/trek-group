import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Business Setup & Company Formation in Qatar",
  description: "Find answers to frequently asked questions about company formation, foreign ownership, PRO services, and trade licenses in Qatar.",
  keywords: ["Qatar Business FAQ", "Company Formation Questions", "Qatar PRO Services FAQ", "Doha Business Setup Guide"],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
