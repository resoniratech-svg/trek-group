import { getBlogById } from "@/lib/db";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);
  
  if (!blog) {
    return { title: "Article Not Found | Trek Group" };
  }

  return {
    title: `${blog.title} | Trek Group`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      images: blog.coverImage ? [blog.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogById(id);
  
  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
