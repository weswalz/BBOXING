const { chromium } = require('playwright');
const path = require('path');

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  try {
    // Screenshot of production site
    console.log('Taking screenshot of https://biyuboxing.com...');
    const page1 = await context.newPage();
    await page1.goto('https://biyuboxing.com', { waitUntil: 'networkidle' });
    await page1.screenshot({ 
      path: 'biyuboxing-production.png', 
      fullPage: true 
    });
    console.log('Production screenshot saved as biyuboxing-production.png');
    
    // Screenshot of local dev site
    console.log('Taking screenshot of http://localhost:4322/...');
    const page2 = await context.newPage();
    try {
      await page2.goto('http://localhost:4322/', { waitUntil: 'networkidle', timeout: 10000 });
      await page2.screenshot({ 
        path: 'biyuboxing-local.png', 
        fullPage: true 
      });
      console.log('Local screenshot saved as biyuboxing-local.png');
    } catch (error) {
      console.error('Error taking local screenshot:', error.message);
      console.log('Make sure your local dev server is running on port 4322');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshots();