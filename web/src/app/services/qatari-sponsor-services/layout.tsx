import type { Metadata } from "next";
import { servicesData } from "@/lib/servicesData";

const serviceId = "qatari-sponsor-services";
const service = servicesData[serviceId];

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {service.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service.schemaMarkup) }}
        />
      )}
      {children}
    </>
  );
}
