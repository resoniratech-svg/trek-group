import { extractInternalLinkIds, parseInternalLinks } from './src/lib/internalLinks';

const rawContent = `Welcome to our [[BLOG:abc|Test Article]]. We also offer [[SERVICE:xyz|Company Formation]].
Beware of [[BLOG:broken|<script>alert(1)</script>]] and malformed [[UNKNOWN:abc|Test]].`;

console.log('--- Extracting IDs ---');
const ids = extractInternalLinkIds(rawContent);
console.log(ids);

console.log('\\n--- Parsing with old slug ---');
const oldMap = {
  'BLOG:abc': 'old-slug',
  'SERVICE:xyz': 'company-formation',
  'BLOG:broken': 'broken-slug'
};
console.log(parseInternalLinks(rawContent, oldMap));

console.log('\\n--- Parsing with new slug ---');
const newMap = {
  'BLOG:abc': 'new-slug',
  'SERVICE:xyz': 'company-formation',
  'BLOG:broken': 'broken-slug'
};
console.log(parseInternalLinks(rawContent, newMap));

console.log('\\n--- Parsing with deleted target ---');
const deletedMap = {
  'SERVICE:xyz': 'company-formation'
};
console.log(parseInternalLinks(rawContent, deletedMap));
