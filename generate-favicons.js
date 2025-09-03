import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pngToIco from 'png-to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_IMAGE = './public/images/logos/logo_white-300ppi-2-1.png';
const OUTPUT_DIR = './public';

const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 64, name: 'favicon-64x64.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 128, name: 'favicon-128x128.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 180, name: 'apple-touch-icon-180x180.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 144, name: 'apple-touch-icon-144x144.png' },
  { size: 120, name: 'apple-touch-icon-120x120.png' },
  { size: 114, name: 'apple-touch-icon-114x114.png' },
  { size: 76, name: 'apple-touch-icon-76x76.png' },
  { size: 72, name: 'apple-touch-icon-72x72.png' },
  { size: 60, name: 'apple-touch-icon-60x60.png' },
  { size: 57, name: 'apple-touch-icon-57x57.png' },
  { size: 144, name: 'mstile-144x144.png' },
  { size: 150, name: 'mstile-150x150.png' },
  { size: 310, name: 'mstile-310x310.png' },
  { size: 70, name: 'mstile-70x70.png' },
  { size: 310, name: 'mstile-310x150.png', width: 310, height: 150 },
  { size: 558, name: 'tile-wide.png', width: 558, height: 270 },
  { size: 270, name: 'tile-square.png' },
  { size: 1024, name: 'icon-1024x1024.png' },
  { size: 196, name: 'favicon-196x196.png' },
  { size: 160, name: 'favicon-160x160.png' },
  { size: 256, name: 'icon-256x256.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'maskable-icon-512x512.png', maskable: true }
];

async function generateFavicons() {
  try {
    console.log('Starting favicon generation...');
    
    const sourceImage = sharp(SOURCE_IMAGE);
    const metadata = await sourceImage.metadata();
    console.log(`Source image: ${metadata.width}x${metadata.height}`);
    
    for (const favicon of faviconSizes) {
      const outputPath = path.join(OUTPUT_DIR, favicon.name);
      
      const width = favicon.width || favicon.size;
      const height = favicon.height || favicon.size;
      
      let image = sharp(SOURCE_IMAGE);
      
      if (favicon.maskable) {
        const padding = Math.round(favicon.size * 0.1);
        const innerSize = favicon.size - (padding * 2);
        
        image = await sharp({
          create: {
            width: favicon.size,
            height: favicon.size,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          }
        })
        .composite([{
          input: await sharp(SOURCE_IMAGE)
            .resize(innerSize, innerSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .toBuffer(),
          top: padding,
          left: padding
        }]);
      } else {
        image = image.resize(width, height, { 
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        });
      }
      
      await image.png().toFile(outputPath);
      console.log(`✓ Generated: ${favicon.name} (${width}x${height})`);
    }
    
    console.log('\nGenerating ICO file...');
    const icoBuffer = await pngToIco([
      path.join(OUTPUT_DIR, 'favicon-16x16.png'),
      path.join(OUTPUT_DIR, 'favicon-32x32.png'),
      path.join(OUTPUT_DIR, 'favicon-48x48.png'),
      path.join(OUTPUT_DIR, 'favicon-64x64.png')
    ]);
    await fs.writeFile(path.join(OUTPUT_DIR, 'favicon.ico'), icoBuffer);
    console.log('✓ Generated: favicon.ico');
    
    console.log('\nGenerating SVG version...');
    await sharp(SOURCE_IMAGE)
      .toFile(path.join(OUTPUT_DIR, 'favicon.svg'));
    console.log('✓ Generated: favicon.svg (converted from PNG)');
    
    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/mstile-70x70.png"/>
            <square150x150logo src="/mstile-150x150.png"/>
            <square310x310logo src="/mstile-310x310.png"/>
            <wide310x150logo src="/mstile-310x150.png"/>
            <TileColor>#da532c</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;
    
    await fs.writeFile(path.join(OUTPUT_DIR, 'browserconfig.xml'), browserConfig);
    console.log('✓ Generated: browserconfig.xml');
    
    const manifest = {
      name: "BiYu Boxing",
      short_name: "BiYu Boxing",
      description: "Professional boxing training and fitness",
      start_url: "/",
      display: "standalone",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      icons: [
        { src: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { src: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { src: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
        { src: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { src: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
        { src: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        { src: "/maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        { src: "/icon-1024x1024.png", sizes: "1024x1024", type: "image/png" }
      ]
    };
    
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'manifest.json'), 
      JSON.stringify(manifest, null, 2)
    );
    console.log('✓ Generated: manifest.json');
    
    console.log('\n✨ All favicons generated successfully!');
    console.log('\nAdd these tags to your HTML <head>:');
    console.log(`
<!-- Primary Meta Tags -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">

<!-- Android Chrome Icons -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#ffffff">

<!-- Microsoft Tiles -->
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="msapplication-config" content="/browserconfig.xml">

<!-- Safari Pinned Tab -->
<link rel="mask-icon" href="/favicon.svg" color="#5bbad5">
    `);
    
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();