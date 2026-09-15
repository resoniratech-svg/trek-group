import { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { getServices } from "@/lib/db";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: 'Corporate & Business Services in Qatar | Trek Group',
  description: 'Explore our wide range of professional solutions including company formation, PRO services, legal translation, and QFC setups in Qatar.',
  alternates: {
    canonical: 'https://trekgroups.com/services'
  },
  openGraph: {
    title: 'Corporate & Business Services in Qatar | Trek Group',
    description: 'Explore our wide range of professional solutions including company formation, PRO services, legal translation, and QFC setups in Qatar.',
    type: 'website',
    url: 'https://trekgroups.com/services',
    images: ['https://trekgroups.com/images/default-og-service.jpg']
  }
};

export default async function ServicesPage() {
  const services = await getServices();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://trekgroups.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://trekgroups.com/services"
      }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ServicesClient initialServices={services} />
    </>
  );
}
