import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Business Consultation in Qatar",
  description: "Contact Trek Group Qatar today for a free consultation on company formation, PRO services, and licensing in Doha. Reach us at info@trekgroups.com or call +974 3005 6030.",
  keywords: ["Contact Trek Group", "Business Consultation Qatar", "Doha PRO Services Contact", "Company Formation Qatar Phone"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
