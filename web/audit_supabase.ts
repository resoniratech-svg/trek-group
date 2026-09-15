import { getBlogs, getServices } from './src/lib/db';
import fs from 'fs';
import crypto from 'crypto';

async function run() {
  const blogs = await getBlogs();
  const services = await getServices();
  
  const baseline = JSON.parse(fs.readFileSync('baseline_hashes.json', 'utf8'));
  
  const validBlogIds = new Set(blogs.map((b: any) => b.id));
  const validServiceIds = new Set(services.map((s: any) => s.id));
  
  let totalLinks = 0;
  let totalServiceLinks = 0;
  let totalBlogLinks = 0;
  
  const perBlogReport: any[] = [];
  const allInsertedLinks: any[] = [];
  
  let passedAllChecks = true;

  for (const blog of blogs) {
    const content = blog.content || "";
    
    // Find all inserted links using global regex
    const matches = [...content.matchAll(/\[\[(BLOG|SERVICE):([^|\]]+)\|([^\]]+)\]\]/g)];
    
    const linksAdded = matches.length;
    let blogLinks = 0;
    let serviceLinks = 0;
    
    const targetsInThisBlog = new Set();
    let hasDuplicate = false;
    let hasSelfLink = false;
    let hasInvalidTarget = false;
    
    for (const match of matches) {
      const type = match[1];
      const targetId = match[2];
      const anchor = match[3];
      
      if (type === 'BLOG') {
        blogLinks++;
        if (!validBlogIds.has(targetId)) hasInvalidTarget = true;
      } else if (type === 'SERVICE') {
        serviceLinks++;
        if (!validServiceIds.has(targetId)) hasInvalidTarget = true;
      }
      
      if (targetsInThisBlog.has(targetId)) {
        hasDuplicate = true;
      }
      targetsInThisBlog.add(targetId);
      
      if (targetId === blog.id) {
        hasSelfLink = true;
      }
      
      const targetSlug = type === 'BLOG' 
        ? blogs.find((b:any)=>b.id === targetId)?.slug || targetId
        : services.find((s:any)=>s.id === targetId)?.slug || targetId;
      
      allInsertedLinks.push({
        blogTitle: blog.title,
        anchor,
        targetType: type,
        targetId,
        targetSlug
      });
    }
    
    totalLinks += linksAdded;
    totalBlogLinks += blogLinks;
    totalServiceLinks += serviceLinks;
    
    // Check integrity against baseline hash
    const normalized = content.replace(/\[\[(?:BLOG|SERVICE):[^|\]]+\|([^\]]+)\]\]/g, '$1');
    const hash = crypto.createHash('sha256').update(normalized).digest('hex');
    const isIntegrityMaintained = (hash === baseline[blog.id]);
    
    if (!isIntegrityMaintained || hasDuplicate || hasSelfLink || hasInvalidTarget) {
      passedAllChecks = false;
    }
    
    perBlogReport.push({
      title: blog.title,
      id: blog.id,
      linksAdded,
      blogLinks,
      serviceLinks,
      targetValidation: hasInvalidTarget ? 'FAIL' : 'PASS',
      integrity: isIntegrityMaintained ? 'PASS' : 'FAIL',
      duplicates: hasDuplicate ? 'FAIL' : 'PASS',
      selfLinks: hasSelfLink ? 'FAIL' : 'PASS'
    });
  }
  
  // Math validation
  const sumOfLinksAdded = perBlogReport.reduce((acc, curr) => acc + curr.linksAdded, 0);
  const mathChecksOut = (totalLinks === totalServiceLinks + totalBlogLinks) && 
                        (totalLinks === sumOfLinksAdded) &&
                        (totalLinks === allInsertedLinks.length);
                        
  if (!mathChecksOut) {
    passedAllChecks = false;
  }
  
  const reportData = {
    summary: {
      totalLinks,
      totalServiceLinks,
      totalBlogLinks,
      sumOfLinksAdded,
      completeAuditListCount: allInsertedLinks.length,
      mathChecksOut,
      passedAllChecks
    },
    perBlogReport,
    allInsertedLinks
  };
  
  fs.writeFileSync('audit_report.json', JSON.stringify(reportData, null, 2));
  console.log('Audit completed. Data saved to audit_report.json');
}

run().catch(console.error);
