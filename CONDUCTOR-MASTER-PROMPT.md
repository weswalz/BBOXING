# CLAUDE CODE CONDUCTOR - MASTER EXECUTION PROMPT
## BiYu Boxing Secondary Pages Development

### 🎯 MISSION STATEMENT
You are Claude Code Conductor tasked with implementing 7 secondary pages for the BiYu Boxing website (BIYUBOXING project) with pixel-perfect fidelity to provided screenshots. This is a complex, multi-phase project requiring systematic asset processing, component development, and page implementation.

### 📁 PROJECT CONTEXT
- **Location**: `/Users/wesleywalz/DEV/BBOXING/BIYUBOXING/`
- **Framework**: Astro 5.13.5 + Tailwind CSS 4.1.12 + DaisyUI 5.0.54
- **Current Status**: Homepage complete, 7 secondary pages needed
- **Live Site**: https://biyuboxing.com (reference for content)
- **Screenshots**: `BIYUBOXING/pending/` folder contains page layouts
- **Assets**: `BIYUBOXING/pending/*/images/` folders contain all required images

### 🔍 REQUIRED READING (LOAD FIRST)
Before starting, read these documentation files in order:
1. `../CONDUCTOR-DOCUMENTATION.md` - Complete project overview
2. `../CONDUCTOR-IMPLEMENTATION-PHASES.md` - 5-phase execution plan
3. `../CONDUCTOR-COMMANDS.md` - Ready-to-execute commands
4. `../CONTENT-EXTRACTION-COMPLETE.md` - All live site content
5. `CLAUDE.md` - Project-specific guidelines

### 🎨 PAGES TO IMPLEMENT
**Match screenshots exactly - pixel-perfect fidelity required:**

1. **About Us** (`/about-us/`) - Screenshot: `pending/aboutus.png`
2. **Box for Us** (`/box-for-us/`) - Screenshot: `pending/boxforus.png`
3. **Contact Us** (`/contact-us/`) - Screenshot: `pending/contactus.png`
4. **Fighters** (`/fighters/`) - Screenshot: `pending/fighters.png`
5. **News** (`/news/`) - Screenshot: `pending/news.png`
6. **Upcoming Events** (`/events/`) - Screenshot: `pending/upcomingevents.png`
7. **Previous Events** (`/events/previous/`) - Screenshot: `pending/previousevents.png`

### ⚡ EXECUTION STRATEGY
**Use 5 parallel workspaces for maximum efficiency:**

#### Workspace 1: Asset Processing
```bash
cd BIYUBOXING/pending
# Convert ALL images to WebP 85% and move to public/images/
# Use commands from CONDUCTOR-COMMANDS.md
```

#### Workspace 2: Component Development
```bash
cd BIYUBOXING/src/components
# Create reusable components: HeroSection, FighterCard, EventCard, NewsCard
# Follow patterns from existing Header/Footer components
```

#### Workspace 3: Core Pages (Priority 1)
```bash
# Implement: About Us, Contact Us, Fighters, Box for Us
# Use live site content from CONTENT-EXTRACTION-COMPLETE.md
```

#### Workspace 4: Content Pages (Priority 2)
```bash
# Implement: News, Upcoming Events, Previous Events
# Reference screenshots for layout, use extracted content
```

#### Workspace 5: QA & Optimization
```bash
# Performance testing, SEO validation, accessibility audit
# Cross-browser testing, mobile responsiveness
```

### 📊 SUCCESS CRITERIA (NON-NEGOTIABLE)
- [ ] **Pixel-Perfect Fidelity**: Pages match screenshots exactly
- [ ] **All Images Converted**: 42+ images to WebP 85% in `public/images/`
- [ ] **Complete Content**: All live site text content implemented
- [ ] **Component Reuse**: Maximize reusable components, minimize duplication
- [ ] **SEO Optimized**: Unique meta tags, structured data per page
- [ ] **Mobile Responsive**: Perfect on mobile, tablet, desktop
- [ ] **Performance**: <3s load time, >90 Lighthouse score
- [ ] **Accessibility**: WCAG 2.1 AA compliance

### 🔧 TECHNICAL REQUIREMENTS

#### Asset Processing Pipeline
```bash
# Convert all images to WebP 85%
find BIYUBOXING/pending -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read img; do
    filename=$(basename "$img")
    name="${filename%.*}"
    cwebp -q 85 "$img" -o "public/images/${name}.webp"
done
```

#### Component Architecture
- **HeroSection.astro**: Reusable hero with background image
- **FighterCard.astro**: Fighter profile with record, nationality, image
- **EventCard.astro**: Event display with date, venue, status
- **NewsCard.astro**: News article preview with image
- **ContactForm.astro**: Contact/application forms

#### Page Implementation Standards
- Extend `Layout.astro` with page-specific SEO props
- Use existing CSS classes from `biyu.css` and Tailwind
- Implement lazy loading for all images
- Follow existing code patterns from `src/pages/index.astro`

### 📋 FIGHTER DATA (Complete Records)
```typescript
const fighters = [
  { name: "Marquis Taylor", record: "18-1-2", kos: 3, nationality: "USA", weight: "Middleweight" },
  { name: "Michael Chaise Nelson", record: "21-3-1", kos: 8, nationality: "USA", weight: "Featherweight" },
  { name: "Eridson Garcia", record: "20-1-0", kos: 12, nationality: "DR", weight: "Super Featherweight" },
  { name: "Chavon Stillwell", record: "6-0-0", kos: 5, nationality: "USA", weight: "Cruiserweight" },
  { name: "Eliesel Rodriguez Ledesma", record: "5-0-1", kos: 4, nationality: "DR", weight: "Super Featherweight" },
  { name: "Rafael Abreu", record: "7-0-0", kos: 6, nationality: "DR", weight: "Super Welterweight" },
  { name: "Erick Rosado", record: "15-3-0", kos: 11, nationality: "DR", weight: "Featherweight" }
];
```

### 🎯 EXECUTION ORDER
1. **Start Asset Processing** (Workspace 1) - Run immediately in background
2. **Load Project Context** - Read all documentation files
3. **Analyze Screenshots** - Understand exact layout requirements
4. **Create Components** (Workspace 2) - Build reusable architecture
5. **Implement Core Pages** (Workspace 3) - About, Contact, Fighters, Box for Us
6. **Implement Content Pages** (Workspace 4) - News, Events
7. **QA & Optimization** (Workspace 5) - Performance, SEO, accessibility

### ⚠️ CRITICAL SUCCESS FACTORS
- **Screenshot Fidelity**: Every pixel must match the provided screenshots
- **Content Accuracy**: Use extracted live site content, not assumptions
- **Asset Organization**: All images flattened to `public/images/` with WebP conversion
- **Component Reuse**: Don't duplicate code - create reusable components
- **Performance**: Optimize for speed - lazy loading, proper image sizing
- **SEO**: Each page needs unique, optimized meta tags

### 🚀 START COMMAND
```bash
cd /Users/wesleywalz/DEV/BBOXING/BIYUBOXING
echo "=== BIYU BOXING CONDUCTOR EXECUTION INITIATED ==="
echo "Phase 1: Asset Processing Started"
# Begin with asset conversion while reviewing documentation
```

### 📞 SUCCESS VALIDATION
When complete, verify:
- All 7 pages accessible and pixel-perfect to screenshots
- All fighter profiles display correct records and images
- Contact forms functional with proper validation
- News articles display with correct content from live site
- All images converted to WebP and properly sized
- SEO meta tags unique per page
- Mobile responsiveness perfect across all devices

**EXECUTE WITH PRECISION. EVERY DETAIL MATTERS. SUCCESS IS PIXEL-PERFECT FIDELITY TO SCREENSHOTS WITH OPTIMIZED PERFORMANCE.**