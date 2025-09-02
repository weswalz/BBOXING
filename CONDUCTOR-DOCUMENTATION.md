# Claude Code Conductor Documentation
## BiYu Boxing Secondary Pages Development Project

### Project Overview
This documentation is designed to maximize Claude Code Conductor's effectiveness in building out the secondary pages for the BiYu Boxing website. The project involves creating 7 secondary pages based on provided screenshots and extracting content from the live website.

### Current Project Status
- **Framework**: Astro 5.13.5 with Tailwind CSS 4.1.12 + DaisyUI 5.0.54
- **Main Site**: Live at https://biyuboxing.com
- **Repository**: Local development in `/Users/wesleywalz/DEV/BBOXING/BIYUBOXING/`
- **Current Implementation**: Homepage complete with SEO-optimized layout
- **Pending**: 7 secondary pages with corresponding assets

### Pages to Implement

#### 1. About Us (`/about-us/`)
- **Screenshot**: `BIYUBOXING/pending/aboutus.png`
- **Assets Folder**: `BIYUBOXING/pending/aboutus/images/`
- **Key Images**:
  - `aboutusfeature.jpg` - Main feature image
  - `aboutushero.jpg` - Hero section background
  - `dominican-republic-boxing.jpg` - DR boxing culture
  - `ourexperience.jpg` - Experience section
  - `ourpartners.jpg` - Partners section

#### 2. Box for Us (`/box-for-us/`)
- **Screenshot**: `BIYUBOXING/pending/boxforus.png`
- **Assets Folder**: `BIYUBOXING/pending/boxforus/images/`
- **Key Images**:
  - `boxforushero.png` - Hero section
  - `careerbackground.png` - Career opportunity background

#### 3. Contact Us (`/contact-us/`)
- **Screenshot**: `BIYUBOXING/pending/contactus.png` 
- **Assets Folder**: `BIYUBOXING/pending/contact/images/`
- **Key Images**:
  - `contactushero.jpg` - Hero section
  - `jointheviplist.jpg` - VIP signup section
  - `sendusamessagebackground.png` - Contact form background
  - `unnamed(021).png` - Additional contact element

#### 4. Fighters (`/fighters/`)
- **Screenshot**: `BIYUBOXING/pending/fighters.png`
- **Assets Folder**: `BIYUBOXING/pending/fighters/images/`
- **Key Images**:
  - `ourfighershero.png` - Hero section
  - `boxforusbg.png` - Background element
  - Fighter profiles: `ChavonStillwell.png`, `ElieselRodriguezLedesma.png`, `ErickRosado.png`, `EridsonGarcia.png`, `MarquisTaylor.png`, `MichaelChaiseNelson.png`, `RafaelAbreu.png`
  - Flag assets: `DRflag.png`, `USAflag.png`

#### 5. News (`/news/`)
- **Screenshot**: `BIYUBOXING/pending/news.png`
- **Assets Folder**: `BIYUBOXING/pending/news/images/`
- **Key Images**:
  - `newshero.png` - Hero section
  - News articles: `ChavonStillwell.jpeg`, `biyutrio.jpg`, `boxforus.png`, `garciaready.jpg`, `treblesuccess.jpeg`

#### 6. Upcoming Events (`/events/`)
- **Screenshot**: `BIYUBOXING/pending/upcomingevents.png`
- **Assets Folder**: `BIYUBOXING/pending/upcomingevents/images/`
- **Key Images**:
  - `upcomingeventshero.png` - Hero section
  - `glovesandglory.jpg` - Featured event
  - `boxforus.png` - Call to action

#### 7. Previous Events (`/events/previous/`)
- **Screenshot**: `BIYUBOXING/pending/previousevents.png`
- **Assets Folder**: `BIYUBOXING/pending/pastevents/images/`
- **Key Images**:
  - `previouseventshero.png` - Hero section
  - `biyubrawlapril26th.jpg` - Past event 1
  - `torresjuly3rd.jpg` - Past event 2
  - `fightforus.png` - Call to action

### Technical Requirements

#### Asset Processing Pipeline
1. **Image Conversion**: All images must be converted to WebP format at 85% quality
2. **Responsive Optimization**: Create multiple sizes for different viewports
3. **File Organization**: Move all assets from `pending/*/images/` to `public/images/` (flattened structure)
4. **Naming Convention**: Maintain descriptive filenames for easy identification

#### Development Standards
- **Component Reuse**: Intelligently reuse existing components (`Header.astro`, `Footer.astro`, etc.)
- **SEO Optimization**: Each page requires unique meta titles, descriptions, and structured data
- **Responsive Design**: Mobile-first approach with Tailwind CSS classes
- **Performance**: Lazy loading for images, WebP format, appropriate sizing
- **Accessibility**: Alt text, ARIA labels, semantic HTML

#### Code Architecture
- **Layout**: Extend existing `Layout.astro` with page-specific props
- **Components**: Create reusable components for repeated UI patterns
- **Styling**: Use existing `biyu.css` classes and Tailwind utilities
- **Assets**: Optimize with Astro's built-in image optimization

### Content Extraction Strategy

#### Live Site Analysis (biyuboxing.com)
Extract text content for:
- Navigation items
- Page headings and subheadings  
- Body text and descriptions
- Contact information
- Company details
- Fighter information
- Event details

#### Screenshot Analysis
Use provided screenshots to:
- Identify layout structure
- Determine image placement
- Extract any text not available on live site
- Understand visual hierarchy
- Plan responsive breakpoints

### Implementation Phases

#### Phase 1: Asset Preparation
1. **Image Processing**
   - Convert all pending images to WebP 85%
   - Generate responsive variants (mobile, tablet, desktop)
   - Move to `public/images/` with flat structure
   - Create image manifest for reference

2. **Content Audit**
   - Extract all text from live website
   - Analyze screenshots for additional content
   - Create content mapping document
   - Identify reusable content blocks

#### Phase 2: Component Development  
1. **Shared Components**
   - Page hero sections
   - Content blocks
   - Fighter profile cards
   - Event cards
   - Contact forms
   - Call-to-action sections

2. **Page-Specific Components**
   - About Us timeline/experience
   - Fighters grid layout
   - News article listings
   - Event calendars

#### Phase 3: Page Implementation
1. **Core Pages** (Priority Order)
   - About Us
   - Contact Us  
   - Fighters
   - Box for Us

2. **Content Pages**
   - News
   - Upcoming Events
   - Previous Events

#### Phase 4: Optimization & QA
1. **Performance Optimization**
   - Image lazy loading
   - Critical CSS inlining
   - Bundle size analysis

2. **SEO & Accessibility**
   - Meta tags optimization
   - Structured data implementation
   - Accessibility audit
   - Performance testing

### Claude Code Conductor Usage Guidelines

#### Context Window Management
- Load project structure understanding first
- Keep asset mapping readily available
- Maintain component registry for reuse
- Track SEO requirements per page

#### Parallel Development Strategy
- Use multiple workspaces for different pages
- Isolate asset processing tasks
- Separate component development from page building
- Run optimization tasks in parallel

#### Quality Assurance Checklist
- [ ] All images converted to WebP 85%
- [ ] Responsive design tested across viewports
- [ ] SEO meta tags implemented
- [ ] Accessibility standards met
- [ ] Component reuse maximized
- [ ] Performance optimized
- [ ] Content accuracy verified against live site
- [ ] Navigation consistency maintained

### File Structure After Implementation

```
BIYUBOXING/
├── public/
│   ├── images/
│   │   ├── aboutusfeature.webp
│   │   ├── aboutushero.webp
│   │   ├── contactushero.webp
│   │   ├── [all other converted images]
│   │   └── ...
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── HeroSection.astro
│   │   │   ├── FighterCard.astro
│   │   │   ├── EventCard.astro
│   │   │   └── ContactForm.astro
│   │   └── sections/
│   │       ├── Header.astro (existing)
│   │       ├── Footer.astro (existing)
│   │       └── CallToAction.astro
│   └── pages/
│       ├── about-us/
│       │   └── index.astro
│       ├── box-for-us/
│       │   └── index.astro
│       ├── contact-us/
│       │   └── index.astro
│       ├── fighters/
│       │   └── index.astro
│       ├── news/
│       │   └── index.astro
│       └── events/
│           ├── index.astro (upcoming)
│           └── previous/
│               └── index.astro
```

### Success Metrics
- All 7 pages implemented exactly matching screenshots
- All assets properly converted and optimized
- SEO scores maintained/improved
- Component reuse maximized (minimize code duplication)
- Mobile responsiveness achieved
- Performance budgets met
- Content accuracy verified

### Notes for Conductor Execution
- Screenshots are the definitive source for layout and design
- Live website is the source for text content
- Maintain existing design system consistency
- Prioritize performance and accessibility
- Use Astro's built-in optimizations
- Leverage existing component architecture