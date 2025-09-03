import { chromium } from 'playwright';
import fs from 'fs';

async function compareWebsites() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Screenshot original site
  console.log('Taking screenshot of biyuboxing.com...');
  await page.goto('https://biyuboxing.com');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'original-site.png', fullPage: true });
  
  // Screenshot local dev site  
  console.log('Taking screenshot of localhost:4321...');
  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'local-site.png', fullPage: true });
  
  // Get page content for comparison
  await page.goto('https://biyuboxing.com');
  const originalContent = await page.evaluate(() => {
    return {
      title: document.title,
      headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent.trim()),
      images: Array.from(document.images).map(img => ({ src: img.src, alt: img.alt })),
      links: Array.from(document.links).map(a => ({ href: a.href, text: a.textContent.trim() })).slice(0, 10)
    };
  });
  
  await page.goto('http://localhost:4321');
  const localContent = await page.evaluate(() => {
    return {
      title: document.title,
      headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent.trim()),
      images: Array.from(document.images).map(img => ({ src: img.src, alt: img.alt })),
      links: Array.from(document.links).map(a => ({ href: a.href, text: a.textContent.trim() })).slice(0, 10)
    };
  });
  
  console.log('\n=== COMPARISON RESULTS ===');
  console.log('\nORIGINAL SITE:');
  console.log('Title:', originalContent.title);
  console.log('Headings:', originalContent.headings);
  console.log('Images:', originalContent.images.length);
  
  console.log('\nLOCAL SITE:');
  console.log('Title:', localContent.title);
  console.log('Headings:', localContent.headings);
  console.log('Images:', localContent.images.length);
  
  console.log('\n=== ANALYSIS ===');
  console.log('Title match:', originalContent.title === localContent.title);
  console.log('Screenshots saved: original-site.png and local-site.png');
  
  await browser.close();
}

compareWebsites().catch(console.error);