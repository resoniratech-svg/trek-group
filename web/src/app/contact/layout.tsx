import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Trek Group Qatar | Business Setup Consultants Doha",
  description:
    "Get in touch with Trek Group Qatar for company formation, PRO services, visa support, and local sponsor structures in Doha. Request a free consultation.",
  keywords: [
    "Contact Trek Group Qatar",
    "Business Setup Qatar",
    "Business Setup Consultants Qatar",
    "Company Formation Qatar",
    "Company Registration Qatar",
    "Business Consultants Doha",
    "Corporate Services Qatar",
    "Commercial Registration Qatar",
    "Foreign Company Registration Qatar",
    "100% Foreign Ownership Qatar",
    "PRO Services Qatar",
    "Visa Services Qatar",
    "QID Services Qatar",
    "Legal Translation Qatar",
    "Certified Translation Qatar",
    "Certificate Attestation Qatar",
    "MOFA Attestation Qatar",
    "Corporate Bank Account Qatar",
    "Business Consultancy Qatar",
    "Business Support Services Qatar",
    "Doha Business Consultants",
    "Trek Group Qatar",
  ],
  openGraph: {
    title: "Contact Trek Group Qatar",
    description:
      "Contact Trek Group Qatar for Business Setup, Company Formation, PRO Services and Visa Services in Qatar.",
    url: "https://trekgroups.com/contact",
    siteName: "Trek Group Qatar",
    type: "website",
  },
  metadataBase: new URL("https://trekgroups.com"),

  alternates: {
    canonical: "/contact",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Trek Group Qatar",
  description:
    "Business Setup in Qatar, Company Formation, PRO Services, Visa Services, Legal Translation, Certificate Attestation and Business Consultancy.",

  priceRange: "$$",

  email: "info@trekgroups.com",
  image: "https://trek-group.com/treklogo.png",
  "@id": "https://trek-group.com/#localbusiness",
  url: "https://trekgroups.com",
  telephone: "+974 3005 6030",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Office no -8, 2nd floor, Building no -210, Street - 330, Zone -43, Entrance - Near Baladna Hypermarket",
    addressLocality: "Doha",
    addressCountry: "QA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2638,
    longitude: 51.5225,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/trek-group-bs/",
    "https://www.instagram.com/trekgroupsbs",
    "https://www.facebook.com/share/1QvfRvx5vm/",
    "https://www.tiktok.com/@trek.group.busine",
    "https://snapchat.com/t/3NFNQBYL",
    "https://youtube.com/@trekgroupbusinessservices",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      {children}
    </>
  );
}
