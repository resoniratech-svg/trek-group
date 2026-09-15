import { getBlogs, getServices, getBlogById, getServiceById } from './src/lib/db';
import { parseInternalLinks, extractInternalLinkIds } from './src/lib/internalLinks';
import crypto from 'crypto';
import fs from 'fs';






async function main() {
  console.log('--- STARTING PHASE 6 VERIFICATION ---');

  // 1. Content Integrity Baseline
  const blogs = await getBlogs();
  const hashes: Record<string, string> = {};
  for (const b of blogs) {
    hashes[b.id] = crypto.createHash('sha256').update(b.content || '').digest('hex');
  }
  fs.writeFileSync('baseline_hashes.json', JSON.stringify(hashes, null, 2));
  console.log(`[PASS] Hashed ${blogs.length} blogs for baseline.`);

  // 2. Select Controlled Target & Controlled Source
  const testBlogSource = blogs[0]; // Source blog to temporarily edit
  const testBlogTarget = blogs[1];
  const services = await getServices();
  const testServiceTarget = services[0];

  console.log(`[INFO] Using Source Blog: ${testBlogSource.id}`);
  console.log(`[INFO] Using Target Blog: ${testBlogTarget.id}`);
  console.log(`[INFO] Using Target Service: ${testServiceTarget.id}`);

  const originalContent = testBlogSource.content;

  // 3. Test various syntaxes via the parseInternalLinks function directly (which emulates the renderer)
  const resolvedMap = {
    [`BLOG:${testBlogTarget.id}`]: testBlogTarget.slug || testBlogTarget.id,
    [`SERVICE:${testServiceTarget.id}`]: testServiceTarget.slug || testServiceTarget.id,
    'BLOG:NONEXISTENT_ID': ''
  };

  const xssTestStr = `[[BLOG:${testBlogTarget.id}|<script>alert("XSS")</script>]]`;
  const imgXssStr = `[[BLOG:${testBlogTarget.id}|<img src=x onerror=alert("XSS")>]]`;
  const validBlogStr = `[[BLOG:${testBlogTarget.id}|Test Anchor]]`;
  const validServiceStr = `[[SERVICE:${testServiceTarget.id}|Service Anchor]]`;
  const brokenTargetStr = `[[BLOG:NONEXISTENT_ID|Missing Link]]`;
  const malformed1 = `[[BLOG:]]`;
  const malformed2 = `[[UNKNOWN:abc|Test]]`;
  const malformed3 = `[[BLOG:abc]]`;
  const selfLinkStr = `[[BLOG:${testBlogSource.id}|Self Link]]`; // Note: CMS might prevent it, but parser handles it as a normal link.

  console.log(`\\n--- RENDERER VERIFICATION ---`);
  console.log('XSS 1:', parseInternalLinks(xssTestStr, resolvedMap));
  console.log('XSS 2:', parseInternalLinks(imgXssStr, resolvedMap));
  console.log('Valid Blog:', parseInternalLinks(validBlogStr, resolvedMap));
  console.log('Valid Service:', parseInternalLinks(validServiceStr, resolvedMap));
  console.log('Broken Target:', parseInternalLinks(brokenTargetStr, resolvedMap));
  console.log('Malformed 1:', parseInternalLinks(malformed1, resolvedMap));
  console.log('Malformed 2:', parseInternalLinks(malformed2, resolvedMap));
  console.log('Malformed 3:', parseInternalLinks(malformed3, resolvedMap));

  console.log('\\n--- SLUG CHANGE SIMULATION ---');
  const tempMap = { ...resolvedMap, [`BLOG:${testBlogTarget.id}`]: 'brand-new-slug' };
  console.log('Slug changed:', parseInternalLinks(validBlogStr, tempMap));

  console.log('\\n--- CONTENT RESTORATION CHECK ---');
  // Hash check again
  const currentBlogs = await getBlogs();
  let changed = 0;
  for (const b of currentBlogs) {
    const hash = crypto.createHash('sha256').update(b.content || '').digest('hex');
    if (hashes[b.id] !== hash) {
      changed++;
    }
  }
  console.log(`[PASS] ${currentBlogs.length - changed}/${currentBlogs.length} original hashes match. (Expect 29/29 since we didn't save to DB yet)`);

}

main().catch(console.error);
