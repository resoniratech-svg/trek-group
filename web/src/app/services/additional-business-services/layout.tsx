import type { Metadata } from "next";
import { servicesData } from "@/lib/servicesData";

const serviceId = "additional-business-services";
const service = servicesData[serviceId];

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  alternates: {
    canonical: `/services/${serviceId}`,
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `https://trekgroups.com/services/${serviceId}`,
    siteName: "Trek Group Qatar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: service.metaTitle,
    description: service.metaDescription,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {service.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(service.schemaMarkup),
          }}
        />
      )}
      {children}
    </>
  );
}
