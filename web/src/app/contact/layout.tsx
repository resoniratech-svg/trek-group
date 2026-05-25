import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Trek Group Qatar | Business Setup Consultants Doha",
  description: "Get in touch with Trek Group Qatar for company formation, PRO services, visa support, and local sponsor structures in Doha. Request a free consultation.",
  keywords: ["Contact business setup Qatar", "Trek Group Qatar phone number", "PRO services Doha contact", "Company registration Doha office"],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Trek Group Qatar",
  "image": "https://trek-group.com/treklogo.png",
  "@id": "https://trek-group.com/#localbusiness",
  "url": "https://trek-group.com",
  "telephone": "+974 3005 6030",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office no -8, 2nd floor, Building no -210, Street - 330, Zone -43, Entrance - near Baladna Hypermarket",
    "addressLocality": "Doha",
    "addressCountry": "QA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2638,
    "longitude": 51.5225
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "08:00",
      "closes": "22:00"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/trek-group-bs/",
    "https://www.instagram.com/trekgroupsbs",
    "https://www.facebook.com/share/1QvfRvx5vm/",
    "https://www.tiktok.com/@trek.group.busine",
    "https://snapchat.com/t/3NFNQBYL",
    "https://youtube.com/@trekgroupbusinessservices"
  ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {children}
    </>
  );
}
