import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Business Setup in Qatar",
  description:
    "Get answers to your questions about company formation, CR registration, 100% foreign ownership, PRO clearances, and corporate services in Doha.",
  keywords: [
    "Business Setup in Qatar FAQ",
    "Company Formation Qatar FAQ",
    "Company Registration Qatar",
    "Business Setup Consultants Qatar",
    "Qatar Business FAQ",
    "Commercial Registration Qatar",
    "Foreign Company Registration Qatar",
    "100% Foreign Ownership Qatar",
    "LLC Registration Qatar",
    "PRO Services Qatar",
    "Visa Services Qatar",
    "QID Services Qatar",
    "Legal Translation Qatar",
    "Certificate Attestation Qatar",
    "Corporate Bank Account Qatar",
    "Business Consultancy Qatar",
    "Business License Qatar",
    "Trade License Qatar",
    "Trek Group Qatar FAQ",
  ],
  openGraph: {
    title: "Business Setup in Qatar FAQ | Trek Group Qatar",
    description:
      "Frequently asked questions about company formation, business registration, PRO services and business setup in Qatar.",
    url: "https://trekgroups.com/faq",
    siteName: "Trek Group Qatar",
    type: "website",
  },
  metadataBase: new URL("https://trekgroups.com"),

  alternates: {
    canonical: "/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: "https://trekgroups.com/faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the documents required to start a business in Qatar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically, you need the Commercial Name reservation, Articles of Association, ID copies of shareholders, and a lease agreement for office space. Specific licenses may require additional ministry approvals.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to complete the company formation procedure in Qatar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The process usually takes between 2 to 4 weeks. However, with Trek Group's fast-track PRO services, we can often expedite approvals and complete registration more quickly.",
      },
    },
    {
      "@type": "Question",
      name: "What are the different types of business entities to set up a business in Qatar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common entities include Limited Liability Companies (LLC), Branch of a Foreign Company, Representative Offices, and Sole Proprietorships. Each has different ownership and capital requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What are the main characteristics of an LLC in Qatar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An LLC must have a minimum of two shareholders and a maximum of 50. It provides limited liability protection, and while many sectors allow 100% foreign ownership, some still require a local partner.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to register my company in Qatar if I am selling products online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, any commercial activity in Qatar, including e-commerce, requires a valid Commercial Registration and a specific license for online trading to comply with local regulations.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
