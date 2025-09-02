# Claude Code Conductor Commands Reference
## BiYu Boxing Project Execution Commands

### Quick Start Commands

#### Initialize Project Context
```bash
# Load project understanding
cd /Users/wesleywalz/DEV/BBOXING/BIYUBOXING
ls -la src/
cat CLAUDE.md
cat ../CONDUCTOR-DOCUMENTATION.md
```

#### Asset Processing Pipeline
```bash
# Phase 1: Convert all images to WebP 85%
cd BIYUBOXING/pending

# Create WebP versions of all images
for folder in aboutus boxforus contact fighters news pastevents upcomingevents; do
    echo "Processing $folder..."
    find $folder -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read img; do
        filename=$(basename "$img")
        name="${filename%.*}"
        output_name="${name}.webp"
        echo "Converting $img to $output_name"
        cwebp -q 85 "$img" -o "../public/images/$output_name"
    done
done

# Process top-level screenshots
find . -maxdepth 1 -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read img; do
    filename=$(basename "$img")
    name="${filename%.*}"
    output_name="${name}.webp"
    echo "Converting $img to $output_name"
    cwebp -q 85 "$img" -o "../public/images/$output_name"
done
```

#### Component Development
```bash
# Create component structure
mkdir -p src/components/ui
mkdir -p src/components/sections

# Generate component templates
touch src/components/ui/HeroSection.astro
touch src/components/ui/FighterCard.astro  
touch src/components/ui/EventCard.astro
touch src/components/ui/NewsCard.astro
touch src/components/ui/ContactForm.astro
```

#### Page Structure Creation
```bash
# Create page directories
mkdir -p src/pages/about-us
mkdir -p src/pages/box-for-us
mkdir -p src/pages/contact-us
mkdir -p src/pages/fighters
mkdir -p src/pages/news
mkdir -p src/pages/events/previous

# Create index files
touch src/pages/about-us/index.astro
touch src/pages/box-for-us/index.astro
touch src/pages/contact-us/index.astro
touch src/pages/fighters/index.astro
touch src/pages/news/index.astro
touch src/pages/events/index.astro
touch src/pages/events/previous/index.astro
```

### Development Commands

#### Start Development Server
```bash
npm run dev
# Server runs on http://localhost:4321
```

#### Build and Test
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Check for build errors
npm run astro check
```

#### Asset Optimization
```bash
# Optimize images further if needed
npx @squoosh/cli --webp '{"quality": 85}' public/images/*.{png,jpg,jpeg}

# Check image sizes
du -sh public/images/*
```

### Page-Specific Implementation Commands

#### About Us Page
```bash
# Implementation priority items:
echo "About Us implementation checklist:"
echo "1. Hero section with aboutushero.webp"
echo "2. Company history section"
echo "3. Leadership section (Bobby Harrison)"
echo "4. Office locations grid"
echo "5. Partnership highlights"
echo "6. Dominican Republic focus"

# Content reference:
echo "Live content extracted: 15+ years experience, Houston/Tampa/Santo Domingo offices, Bobby Harrison founder"
```

#### Contact Us Page  
```bash
# Implementation items:
echo "Contact Us checklist:"
echo "1. Hero with contactushero.webp"
echo "2. Contact form (Name, Email, Message)"
echo "3. Phone: +1 346-268-1590"
echo "4. Location: Houston, Texas"
echo "5. VIP signup form"
echo "6. Background: sendusamessagebackground.webp"
```

#### Fighters Page
```bash
# Fighter data from screenshots:
echo "Fighters to implement:"
echo "- Chavon Stillwell (USA) - ChavonStillwell.webp"
echo "- Eliesel Rodriguez Ledesma (DR) - ElieselRodriguezLedesma.webp"
echo "- Erick Rosado (DR) - ErickRosado.webp"
echo "- Eridson Garcia (DR) - EridsonGarcia.webp"  
echo "- Marquis Taylor (USA) - MarquisTaylor.webp"
echo "- Michael Chaise Nelson (USA) - MichaelChaiseNelson.webp"
echo "- Rafael Abreu (DR) - RafaelAbreu.webp"
echo "Flags: USAflag.webp, DRflag.webp"
```

#### News Page
```bash
# News articles from live site:
echo "News articles to implement:"
echo "1. 'Silent Assassin' Chavon Stillwell signs for BiYu Promotions"
echo "2. BiYu trio to box on Gloves & Glory card"
echo "3. Treble success for BiYu fighters in Colombia"
echo "4. Garcia ready to put down a marker ahead of TKO switch"

# Images: ChavonStillwell.webp, biyutrio.webp, garciaready.webp, treblesuccess.webp
```

### Quality Assurance Commands

#### Performance Testing
```bash
# Lighthouse CLI (install if needed)
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# Bundle analyzer
npm run build
npx astro preview --open
```

#### SEO Validation  
```bash
# Check meta tags
curl -s https://localhost:4321/about-us/ | grep -i '<meta\|<title'

# Validate structured data
curl -s https://localhost:4321/about-us/ | grep 'application/ld+json'
```

#### Accessibility Testing
```bash
# Install axe-cli for accessibility testing
npm install -g @axe-core/cli

# Run accessibility audit
axe http://localhost:4321/about-us/
axe http://localhost:4321/contact-us/
axe http://localhost:4321/fighters/
```

### Image Verification Commands

#### Check Image Conversion Success
```bash
# Verify all images converted
ls -la public/images/*.webp | wc -l
echo "Expected count: 42+ images"

# Check image sizes (should be smaller than originals)
find public/images -name "*.webp" -exec ls -lh {} \; | head -10

# Verify image quality
file public/images/aboutushero.webp
```

#### Mobile Responsiveness Check
```bash
# Test different viewport sizes
echo "Test viewports:"
echo "Mobile: 375x667"  
echo "Tablet: 768x1024"
echo "Desktop: 1920x1080"

# Use browser dev tools or automated testing
npx playwright test --headed
```

### Troubleshooting Commands

#### Common Issues
```bash
# If images not loading:
ls -la public/images/
echo "Check image paths in components match actual filenames"

# If build fails:
npm run astro check
echo "Check for TypeScript errors"

# If styles not applying:
cat src/styles/biyu.css
echo "Verify Tailwind classes are available"

# Clear cache if needed:
rm -rf .astro/
npm run dev
```

#### Component Testing
```bash
# Test individual components:
echo "Test HeroSection component across all pages"
echo "Verify FighterCard renders all fighter data"
echo "Check EventCard displays dates correctly"
echo "Validate NewsCard links work"
```

### Deployment Preparation

#### Pre-deployment Checklist
```bash
echo "Deployment checklist:"
echo "[ ] All images converted to WebP 85%"
echo "[ ] All pages match screenshots exactly"  
echo "[ ] SEO meta tags implemented"
echo "[ ] Performance targets met"
echo "[ ] Accessibility standards passed"
echo "[ ] Mobile responsiveness verified"
echo "[ ] Cross-browser testing completed"

# Final build
npm run build
echo "Build complete - ready for deployment"
```

### Conductor-Specific Workflow

#### Parallel Workspace Setup
```bash
# Workspace 1: Asset Processing
cd BIYUBOXING/pending && [run conversion commands]

# Workspace 2: Component Development  
cd BIYUBOXING/src/components && [create components]

# Workspace 3: Page Implementation
cd BIYUBOXING/src/pages && [build pages]

# Workspace 4: Testing & QA
cd BIYUBOXING && npm run build && [run tests]
```

#### Progress Tracking
```bash
# Check completion status:
find src/pages -name "index.astro" -exec echo "Page: {}" \;
find public/images -name "*.webp" | wc -l
echo "Components created:" && ls src/components/ui/
```

This command reference enables efficient execution with Claude Code Conductor, providing both automated scripts and manual verification steps for the complete BiYu Boxing secondary pages implementation.