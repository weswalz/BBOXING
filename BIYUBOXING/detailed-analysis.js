import { chromium } from 'playwright';
import fs from 'fs';

async function comprehensiveAnalysis() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport to match common desktop resolution
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  console.log('🔍 Starting comprehensive analysis of biyuboxing.com...');
  
  // Navigate to original site
  await page.goto('https://biyuboxing.com');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // Extra wait for any animations
  
  // Take full page screenshot
  console.log('📸 Taking full page screenshot...');
  await page.screenshot({ path: 'analysis-full-page.png', fullPage: true });
  
  // Analysis object to store all findings
  const analysis = {
    url: 'https://biyuboxing.com',
    timestamp: new Date().toISOString(),
    viewport: { width: 1920, height: 1080 },
    sections: {}
  };
  
  // Define sections to analyze
  const sections = [
    {
      name: 'header',
      selector: 'header, .header, nav, .nav, .top-bar',
      description: 'Main navigation header'
    },
    {
      name: 'hero',
      selector: '.hero, .banner, .main-banner, section:first-of-type',
      description: 'Hero/banner section with main title'
    },
    {
      name: 'news',
      selector: '[class*="news"], [class*="latest"]',
      description: 'Latest news section'
    },
    {
      name: 'events',
      selector: '[class*="event"], [class*="upcoming"]',
      description: 'Upcoming events section'
    },
    {
      name: 'box-for-us',
      selector: '[class*="box"], [class*="cta"]',
      description: 'Box for us / CTA section'
    },
    {
      name: 'vip',
      selector: '[class*="vip"], [class*="signup"], [class*="newsletter"]',
      description: 'VIP signup section'
    },
    {
      name: 'footer',
      selector: 'footer, .footer',
      description: 'Footer section'
    }
  ];
  
  // Analyze each section
  for (const section of sections) {
    console.log(`🔍 Analyzing ${section.name} section...`);
    
    try {
      // Try to find the section element
      const element = await page.$(section.selector);
      
      if (element) {
        // Take screenshot of this section
        await element.screenshot({ path: `analysis-${section.name}.png` });
        
        // Get element information
        const elementInfo = await element.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          const styles = window.getComputedStyle(el);
          
          return {
            tagName: el.tagName,
            className: el.className,
            id: el.id,
            innerHTML: el.innerHTML.substring(0, 1000), // Limit length
            boundingRect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            },
            computedStyles: {
              display: styles.display,
              position: styles.position,
              fontSize: styles.fontSize,
              fontFamily: styles.fontFamily,
              fontWeight: styles.fontWeight,
              color: styles.color,
              backgroundColor: styles.backgroundColor,
              margin: styles.margin,
              padding: styles.padding,
              textAlign: styles.textAlign,
              lineHeight: styles.lineHeight,
              letterSpacing: styles.letterSpacing,
              textTransform: styles.textTransform,
              borderRadius: styles.borderRadius,
              border: styles.border,
              boxShadow: styles.boxShadow,
              backgroundImage: styles.backgroundImage,
              backgroundSize: styles.backgroundSize,
              backgroundPosition: styles.backgroundPosition
            }
          };
        });
        
        analysis.sections[section.name] = {
          description: section.description,
          selector: section.selector,
          found: true,
          ...elementInfo
        };
        
        console.log(`✅ Found ${section.name} section`);
        
      } else {
        console.log(`❌ Could not find ${section.name} section with selector: ${section.selector}`);
        analysis.sections[section.name] = {
          description: section.description,
          selector: section.selector,
          found: false
        };
      }
      
    } catch (error) {
      console.log(`❌ Error analyzing ${section.name}: ${error.message}`);
      analysis.sections[section.name] = {
        description: section.description,
        selector: section.selector,
        found: false,
        error: error.message
      };
    }
  }
  
  // Get overall page structure
  console.log('🔍 Analyzing overall page structure...');
  
  const pageStructure = await page.evaluate(() => {
    // Get all major structural elements
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
      tag: h.tagName,
      text: h.textContent.trim(),
      className: h.className,
      id: h.id
    }));
    
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      className: img.className
    }));
    
    const buttons = Array.from(document.querySelectorAll('button, .btn, [role="button"], a[class*="btn"]')).map(btn => ({
      text: btn.textContent.trim(),
      className: btn.className,
      tag: btn.tagName,
      href: btn.href || null
    }));
    
    const navigation = Array.from(document.querySelectorAll('nav a, .nav a, .menu a')).map(link => ({
      text: link.textContent.trim(),
      href: link.href,
      className: link.className
    }));
    
    return {
      title: document.title,
      headings,
      images,
      buttons,
      navigation,
      bodyClasses: document.body.className,
      bodyStyles: window.getComputedStyle(document.body).cssText
    };
  });
  
  analysis.pageStructure = pageStructure;
  
  // Save analysis to file
  const analysisJson = JSON.stringify(analysis, null, 2);
  fs.writeFileSync('detailed-analysis.json', analysisJson);
  
  // Create human-readable report
  let report = `# DETAILED WEBSITE ANALYSIS REPORT\n\n`;
  report += `**Website:** ${analysis.url}\n`;
  report += `**Timestamp:** ${analysis.timestamp}\n`;
  report += `**Page Title:** ${pageStructure.title}\n\n`;
  
  report += `## HEADINGS STRUCTURE\n\n`;
  pageStructure.headings.forEach((heading, i) => {
    report += `${i + 1}. **${heading.tag}:** "${heading.text}"\n`;
    if (heading.className) report += `   - Class: ${heading.className}\n`;
  });
  
  report += `\n## NAVIGATION ITEMS\n\n`;
  pageStructure.navigation.forEach((nav, i) => {
    report += `${i + 1}. **"${nav.text}"** → ${nav.href}\n`;
    if (nav.className) report += `   - Class: ${nav.className}\n`;
  });
  
  report += `\n## BUTTONS/CTAs\n\n`;
  pageStructure.buttons.forEach((btn, i) => {
    report += `${i + 1}. **"${btn.text}"** (${btn.tag})\n`;
    if (btn.className) report += `   - Class: ${btn.className}\n`;
    if (btn.href) report += `   - Link: ${btn.href}\n`;
  });
  
  report += `\n## IMAGES\n\n`;
  pageStructure.images.forEach((img, i) => {
    report += `${i + 1}. **${img.alt || 'No alt text'}**\n`;
    report += `   - Source: ${img.src}\n`;
    report += `   - Dimensions: ${img.width}x${img.height}\n`;
    if (img.className) report += `   - Class: ${img.className}\n`;
  });
  
  report += `\n## SECTIONS ANALYSIS\n\n`;
  Object.entries(analysis.sections).forEach(([name, data]) => {
    report += `### ${name.toUpperCase()} SECTION\n`;
    report += `**Description:** ${data.description}\n`;
    report += `**Found:** ${data.found ? '✅ Yes' : '❌ No'}\n`;
    
    if (data.found) {
      report += `**Element:** ${data.tagName}\n`;
      if (data.className) report += `**Classes:** ${data.className}\n`;
      report += `**Position:** x:${Math.round(data.boundingRect.x)}, y:${Math.round(data.boundingRect.y)}\n`;
      report += `**Size:** ${Math.round(data.boundingRect.width)}x${Math.round(data.boundingRect.height)}\n`;
      
      const styles = data.computedStyles;
      report += `**Key Styles:**\n`;
      report += `  - Font: ${styles.fontFamily}, ${styles.fontSize}, ${styles.fontWeight}\n`;
      report += `  - Color: ${styles.color}\n`;
      report += `  - Background: ${styles.backgroundColor}\n`;
      report += `  - Position: ${styles.position}\n`;
      report += `  - Display: ${styles.display}\n`;
      report += `  - Text Align: ${styles.textAlign}\n`;
      if (styles.backgroundImage && styles.backgroundImage !== 'none') {
        report += `  - Background Image: ${styles.backgroundImage.substring(0, 100)}...\n`;
      }
    } else {
      report += `**Selector Used:** ${data.selector}\n`;
      if (data.error) report += `**Error:** ${data.error}\n`;
    }
    report += `\n`;
  });
  
  fs.writeFileSync('detailed-analysis-report.md', report);
  
  console.log('✅ Analysis complete!');
  console.log('📁 Files created:');
  console.log('  - analysis-full-page.png (full page screenshot)');
  console.log('  - analysis-[section].png (individual section screenshots)');
  console.log('  - detailed-analysis.json (raw data)');
  console.log('  - detailed-analysis-report.md (human-readable report)');
  
  await browser.close();
}

comprehensiveAnalysis().catch(console.error);