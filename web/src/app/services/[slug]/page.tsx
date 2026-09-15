import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { notFound } from "next/navigation";
import ServiceTemplate from "@/components/ServiceTemplate";
import { getServiceById, getBlogs, getServices } from "@/lib/db";
import { extractInternalLinkIds } from "@/lib/internalLinks";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

function stripHtml(html: string) {
  if (!html) return '';
  let text = html.replace(/<[^>]+>/g, '').replace(/[#*`_\[\]]/g, '').trim();
  return text.substring(0, 155) + (text.length > 155 ? '...' : '');
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getServiceById(resolvedParams.slug);
  if (!service) return { title: "Service Not Found | Trek Group" };
  
  const canonicalUrl = service.canonical_url || `https://trekgroups.com/services/${service.slug || service.id}`;
  
  const baseTitle = service.seo_title || service.metaTitle || service.title;
  const finalTitle = baseTitle.length < 50 && !baseTitle.toLowerCase().includes('trek group') 
    ? `${baseTitle} | Trek Group` 
    : baseTitle;
    
  const finalDesc = service.meta_description || service.metaDescription || stripHtml(service.description);
  const ogImage = service.og_image || 'https://trekgroups.com/images/default-og-service.jpg';

  return {
    title: { absolute: finalTitle },
    description: finalDesc,
    keywords: service.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          alt: service.image_alt || finalTitle,
        }
      ],
      siteName: "Trek Group Qatar"
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDesc,
      images: [ogImage],
    }
  };
}

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const service = await getServiceById(resolvedParams.slug);
  if (!service) {
    notFound();
  }

  const serviceStr = JSON.stringify(service);
  const { blogs: blogIds, services: serviceIds } = extractInternalLinkIds(serviceStr);
  const resolvedMap: Record<string, string> = {};
  
  if (blogIds.length > 0) {
    const allBlogs = await getBlogs();
    for (const id of blogIds) {
      const b = allBlogs.find((x: any) => x.id === id);
      if (b) resolvedMap[`BLOG:${id}`] = b.slug || b.id;
    }
  }
  
  if (serviceIds.length > 0) {
    const allServices = await getServices();
    for (const id of serviceIds) {
      const s = allServices.find((x: any) => x.id === id);
      if (s) resolvedMap[`SERVICE:${id}`] = s.slug || s.id;
    }
  }

  
  const canonicalUrlActive = service.canonical_url || `https://trekgroups.com/services/${service.slug || service.id}`;

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": canonicalUrlActive
      }
    ]
  };

  return (
    <>
      
      <ServiceTemplate initialData={service} resolvedMap={resolvedMap} />
    </>
  );
}
