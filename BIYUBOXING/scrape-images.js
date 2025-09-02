import { chromium } from 'playwright';

async function findImages() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://biyuboxing.com');
  await page.waitForLoadState('networkidle');
  
  // Get all background images and image sources
  const images = await page.evaluate(() => {
    const results = [];
    
    // Get all elements with background images
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const computed = window.getComputedStyle(el);
      const bgImage = computed.backgroundImage;
      if (bgImage && bgImage !== 'none' && bgImage.includes('url')) {
        const url = bgImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
        if (url) {
          results.push({
            type: 'background',
            url: url,
            element: el.tagName + (el.className ? '.' + Array.from(el.classList).join('.') : '') + (el.id ? '#' + el.id : ''),
            rect: el.getBoundingClientRect()
          });
        }
      }
    });
    
    // Get all img tags
    document.querySelectorAll('img').forEach(img => {
      results.push({
        type: 'img',
        url: img.src,
        alt: img.alt,
        element: 'IMG',
        rect: img.getBoundingClientRect()
      });
    });
    
    return results;
  });
  
  console.log('Found images:');
  images.forEach((img, i) => {
    console.log(`${i + 1}. ${img.type.toUpperCase()}: ${img.url}`);
    console.log(`   Element: ${img.element}`);
    console.log(`   Size: ${Math.round(img.rect.width)}x${Math.round(img.rect.height)}`);
    console.log('');
  });
  
  await browser.close();
}

findImages().catch(console.error);