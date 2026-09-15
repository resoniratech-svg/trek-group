import { getBlogById, getBlogs, getServices } from "@/lib/db";
import { extractInternalLinkIds } from "@/lib/internalLinks";
import BlogDetailClient from "./BlogDetailClient";
import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

function stripHtml(html: string) {
  if (!html) return '';
  let text = html.replace(/<[^>]+>/g, '').replace(/[#*`_\[\]]/g, '').trim();
  return text.substring(0, 155) + (text.length > 155 ? '...' : '');
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params;
  const allBlogs = await getBlogs();
  
  let blog = allBlogs.find((b: any) => b.slug === resolvedParams.slug);
  if (!blog) {
    blog = allBlogs.find((b: any) => b.id === resolvedParams.slug);
  }
  
  if (!blog) {
    return { title: "Article Not Found | Trek Group" };
  }

  const activeSlug = blog.slug || blog.id;
  const canonicalUrl = blog.canonical_url || `https://trekgroups.com/blog/${activeSlug}`;
  
  const baseTitle = blog.seo_title || blog.title;
  // Intelligently append company name if short enough and not already present
  const finalTitle = baseTitle.length < 50 && !baseTitle.toLowerCase().includes('trek group') 
    ? `${baseTitle} | Trek Group` 
    : baseTitle;
    
  const finalDesc = blog.meta_description || stripHtml(blog.excerpt || blog.content);
  const ogImage = blog.og_image || blog.coverImage || 'https://trekgroups.com/images/default-og.jpg';

  const publishedTime = blog.published_date || blog.date || blog.created_at;

  return {
    title: { absolute: finalTitle },
    description: finalDesc,
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
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          alt: blog.image_alt || finalTitle,
        }
      ],
      siteName: "Trek Group Qatar",
      publishedTime: publishedTime,
      modifiedTime: blog.updated_date || publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDesc,
      images: [ogImage],
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  
  const allBlogs = await getBlogs();
  
  // First, try to find strictly by canonical slug
  let blog = allBlogs.find((b: any) => b.slug === resolvedParams.slug);
  
  if (!blog) {
    // If not found by slug, it might be a legacy ID
    blog = allBlogs.find((b: any) => b.id === resolvedParams.slug);

    if (!blog) {
      notFound();
    }

    // We found it by ID. If it has a distinct slug configured, we must 301/308 redirect to it.
    if (blog.slug && blog.slug !== blog.id) {
      permanentRedirect(`/blog/${blog.slug}`);
    }
  }

  // Common rendering path
  const { blogs: blogIds, services: serviceIds } = extractInternalLinkIds(blog.content);
  const resolvedMap: Record<string, string> = {};
  
  if (blogIds.length > 0) {
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

  const activeSlug = blog.slug || blog.id;
  const canonicalUrl = blog.canonical_url || `https://trekgroups.com/blog/${activeSlug}`;
  const publishedTime = blog.published_date || blog.date || blog.created_at;
  const modifiedTime = blog.updated_date || publishedTime;
  const baseTitle = blog.seo_title || blog.title;
  const finalTitle = baseTitle.length < 50 && !baseTitle.toLowerCase().includes('trek group') 
    ? `${baseTitle} | Trek Group` 
    : baseTitle;
  const finalDesc = blog.meta_description || stripHtml(blog.excerpt || blog.content);
  const ogImage = blog.og_image || blog.coverImage || 'https://trekgroups.com/images/default-og.jpg';

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
        "name": "Blog",
        "item": "https://trekgroups.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": canonicalUrl
      }
    ]
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": finalTitle,
    "description": finalDesc,
    "image": ogImage,
    "datePublished": publishedTime,
    "dateModified": modifiedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "author": {
      "@type": "Organization",
      "name": "TREK Group"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TREK Group",
      "logo": {
        "@type": "ImageObject",
        "url": "https://trekgroups.com/treklogo.png"
      }
    }
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={blogPostingSchema} />
      <BlogDetailClient blog={blog} resolvedMap={resolvedMap} />
    </>
  );
}
