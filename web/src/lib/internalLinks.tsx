import React from 'react';
import Link from 'next/link';

export type InternalLinkTargetMap = Record<string, string>;

/**
 * Extracts unique target IDs from the raw content.
 */
export function extractInternalLinkIds(content: string | undefined | null) {
  const result = {
    blogs: new Set<string>(),
    services: new Set<string>(),
  };

  if (!content) return { blogs: Array.from(result.blogs), services: Array.from(result.services) };

  const regex = /\[\[(BLOG|SERVICE):([^|\]]+)\|([^\]]+)\]\]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const type = match[1];
    const id = match[2];
    
    if (type === 'BLOG') {
      result.blogs.add(id);
    } else if (type === 'SERVICE') {
      result.services.add(id);
    }
  }

  return {
    blogs: Array.from(result.blogs),
    services: Array.from(result.services),
  };
}

/**
 * Safely escapes HTML special characters (used for HTML string contexts).
 */
export function escapeHtml(unsafe: string) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Parses content and replaces custom link syntax with HTML anchor strings.
 * ONLY FOR USE INSIDE dangerouslySetInnerHTML (e.g. Markdown renderer).
 */
export function parseInternalLinks(content: string, resolvedMap: InternalLinkTargetMap): string {
  if (!content) return "";

  const regex = /\[\[(BLOG|SERVICE):([^|\]]+)\|([^\]]+)\]\]/g;

  return content.replace(regex, (match, type, id, anchorText) => {
    const safeAnchorText = escapeHtml(anchorText);
    const key = `${type}:${id}`;
    const targetSlug = resolvedMap[key];

    if (!targetSlug) {
      return safeAnchorText; // gracefully degrade
    }

    const basePath = type === 'BLOG' ? '/blog' : '/services';
    const href = `${basePath}/${targetSlug}`;

    return `<a href="${href}" class="text-secondary hover:underline hover:text-white transition-colors font-bold">${safeAnchorText}</a>`;
  });
}

/**
 * Parses text and returns an array of React Nodes.
 * SAFE FOR USE IN STANDARD REACT COMPONENTS (e.g. Service pages).
 */
export function renderInternalLinks(text: string, resolvedMap: InternalLinkTargetMap): React.ReactNode[] {
  if (!text) return [];

  const regex = /\[\[(BLOG|SERVICE):([^|\]]+)\|([^\]]+)\]\]/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Push preceding text
    if (match.index > lastIndex) {
      nodes.push(text.substring(lastIndex, match.index));
    }

    const type = match[1];
    const id = match[2];
    const anchorText = match[3];
    const key = `${type}:${id}`;
    const targetSlug = resolvedMap[key];

    if (!targetSlug) {
      // Degrade to plain text
      nodes.push(anchorText);
    } else {
      const basePath = type === 'BLOG' ? '/blog' : '/services';
      const href = `${basePath}/${targetSlug}`;
      nodes.push(
        <Link key={match.index} href={href} className="text-secondary hover:underline hover:text-white transition-colors font-bold">
          {anchorText}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    nodes.push(text.substring(lastIndex));
  }

  return nodes;
}
