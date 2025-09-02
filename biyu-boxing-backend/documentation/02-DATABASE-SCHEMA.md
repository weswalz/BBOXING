# 🗄️ Database Schema Design

## PHASE 1, STEP 1.2: DATABASE COLLECTIONS & STRUCTURE

### Database Overview
**Database Name**: `biyu-boxing`

**Collections**:
1. `news` - News articles and blog posts
2. `media` - Uploaded images and files
3. `pages` - Page content with ACF-style fields
4. `settings` - Site-wide settings
5. `users` - Admin users (future expansion)

---

## 📰 NEWS Collection

### Schema Structure
```javascript
{
  _id: ObjectId,
  title: String,              // Article title
  slug: String,               // URL-friendly version (auto-generated)
  content: String,            // Rich text content (HTML from TinyMCE)
  excerpt: String,            // Brief summary
  published: Boolean,         // Published status
  featured: Boolean,          // Featured article flag
  author: String,             // Author name
  category: String,           // News category
  tags: [String],            // Array of tags
  featuredImage: String,      // URL or path to featured image
  seo: {
    metaTitle: String,        // SEO title override
    metaDescription: String,  // SEO description
    metaKeywords: String      // SEO keywords
  },
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date          // When it was published
}
```

### Sample Document
```json
{
  "_id": "ObjectId('...')",
  "title": "BiYu Boxing Wins Championship",
  "slug": "biyu-boxing-wins-championship",
  "content": "<p>Exciting news from the ring...</p>",
  "excerpt": "BiYu Boxing team brings home the gold in yesterday's championship match.",
  "published": true,
  "featured": true,
  "author": "Coach Mike",
  "category": "Competition Results",
  "tags": ["championship", "victory", "team"],
  "featuredImage": "/uploads/championship-2024.jpg",
  "seo": {
    "metaTitle": "BiYu Boxing Championship Victory 2024",
    "metaDescription": "Read about BiYu Boxing's championship victory",
    "metaKeywords": "boxing, championship, BiYu, victory"
  },
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:22:00.000Z",
  "publishedAt": "2024-01-15T14:22:00.000Z"
}
```

### Indexes
```javascript
// Create indexes for performance
db.news.createIndex({ "published": 1, "createdAt": -1 })
db.news.createIndex({ "slug": 1 }, { unique: true })
db.news.createIndex({ "category": 1 })
db.news.createIndex({ "featured": 1 })
```

---

## 🖼️ MEDIA Collection

### Schema Structure
```javascript
{
  _id: ObjectId,
  filename: String,           // Generated filename
  originalName: String,       // Original upload filename
  mimeType: String,          // File MIME type
  size: Number,              // File size in bytes
  path: String,              // File path on server
  url: String,               // Public URL
  alt: String,               // Alt text for images
  caption: String,           // Image caption
  width: Number,             // Image width (if image)
  height: Number,            // Image height (if image)
  uploadedBy: String,        // Who uploaded it
  tags: [String],           // Organization tags
  usedIn: [String],         // Array of content IDs using this media
  createdAt: Date
}
```

### Sample Document
```json
{
  "_id": "ObjectId('...')",
  "filename": "1642250400000-abc123.jpg",
  "originalName": "boxing-training.jpg",
  "mimeType": "image/jpeg",
  "size": 245760,
  "path": "/uploads/1642250400000-abc123.jpg",
  "url": "/uploads/1642250400000-abc123.jpg",
  "alt": "Boxing training session",
  "caption": "Students practicing techniques",
  "width": 1920,
  "height": 1080,
  "uploadedBy": "admin",
  "tags": ["training", "students", "gym"],
  "usedIn": ["news_id_1", "page_about"],
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

---

## 📄 PAGES Collection (ACF-Style Content)

### Schema Structure
```javascript
{
  _id: ObjectId,
  pageId: String,            // Unique page identifier (e.g., "home", "about")
  pageName: String,          // Human-readable name
  fields: {                  // Dynamic fields (ACF-style)
    [fieldName]: {
      type: String,          // "text", "textarea", "image", "select", etc.
      value: Mixed,          // Field value
      label: String,         // Field label for admin
      options: [String]      // For select fields
    }
  },
  seo: {
    title: String,
    description: String,
    keywords: String
  },
  updatedAt: Date,
  updatedBy: String
}
```

### Sample Documents
```json
// Home Page Content
{
  "_id": "ObjectId('...')",
  "pageId": "home",
  "pageName": "Home Page",
  "fields": {
    "heroTitle": {
      "type": "text",
      "value": "Welcome to BiYu Boxing",
      "label": "Hero Section Title"
    },
    "heroDescription": {
      "type": "textarea",
      "value": "Professional boxing training for all skill levels",
      "label": "Hero Description"
    },
    "heroImage": {
      "type": "image",
      "value": "/uploads/hero-image.jpg",
      "label": "Hero Background Image"
    },
    "featuresTitle": {
      "type": "text",
      "value": "Why Choose BiYu Boxing",
      "label": "Features Section Title"
    },
    "features": {
      "type": "repeater",
      "value": [
        {
          "title": "Professional Trainers",
          "description": "Experienced coaches with championship backgrounds",
          "icon": "👨‍🏫"
        },
        {
          "title": "Modern Equipment",
          "description": "State-of-the-art training facilities",
          "icon": "🥊"
        }
      ],
      "label": "Features List"
    }
  },
  "seo": {
    "title": "BiYu Boxing - Professional Boxing Training",
    "description": "Join BiYu Boxing for professional training",
    "keywords": "boxing, training, professional, BiYu"
  },
  "updatedAt": "2024-01-15T09:00:00.000Z",
  "updatedBy": "admin"
}

// About Page Content
{
  "_id": "ObjectId('...')",
  "pageId": "about",
  "pageName": "About Us",
  "fields": {
    "aboutTitle": {
      "type": "text",
      "value": "Our Story",
      "label": "About Section Title"
    },
    "aboutContent": {
      "type": "wysiwyg",
      "value": "<p>BiYu Boxing was founded in...</p>",
      "label": "About Content"
    },
    "founderImage": {
      "type": "image",
      "value": "/uploads/founder.jpg",
      "label": "Founder Photo"
    },
    "achievements": {
      "type": "textarea",
      "value": "- 15 years of training experience\n- 200+ students trained",
      "label": "Key Achievements"
    }
  },
  "seo": {
    "title": "About BiYu Boxing - Our Story",
    "description": "Learn about BiYu Boxing's history and mission",
    "keywords": "BiYu Boxing, about, story, founder"
  },
  "updatedAt": "2024-01-14T16:30:00.000Z",
  "updatedBy": "admin"
}
```

---

## ⚙️ SETTINGS Collection

### Schema Structure
```javascript
{
  _id: ObjectId,
  category: String,          // "general", "seo", "social", "contact"
  settings: {
    [settingKey]: {
      type: String,          // "text", "textarea", "boolean", "image"
      value: Mixed,
      label: String,
      description: String
    }
  },
  updatedAt: Date,
  updatedBy: String
}
```

### Sample Documents
```json
// General Settings
{
  "_id": "ObjectId('...')",
  "category": "general",
  "settings": {
    "siteName": {
      "type": "text",
      "value": "BiYu Boxing",
      "label": "Site Name",
      "description": "The name of your website"
    },
    "siteTagline": {
      "type": "text",
      "value": "Professional Boxing Training",
      "label": "Site Tagline"
    },
    "siteLogo": {
      "type": "image",
      "value": "/uploads/logo.png",
      "label": "Site Logo"
    },
    "contactEmail": {
      "type": "email",
      "value": "info@biyuboxing.com",
      "label": "Contact Email"
    }
  }
}

// Social Media Settings
{
  "_id": "ObjectId('...')",
  "category": "social",
  "settings": {
    "facebookUrl": {
      "type": "url",
      "value": "https://facebook.com/biyuboxing",
      "label": "Facebook URL"
    },
    "instagramUrl": {
      "type": "url",
      "value": "https://instagram.com/biyuboxing",
      "label": "Instagram URL"
    },
    "youtubeUrl": {
      "type": "url",
      "value": "https://youtube.com/biyuboxing",
      "label": "YouTube URL"
    }
  }
}
```

---

## 👤 USERS Collection (Future)

### Schema Structure
```javascript
{
  _id: ObjectId,
  email: String,
  password: String,          // Hashed password
  name: String,
  role: String,              // "admin", "editor", "viewer"
  permissions: [String],     // Array of permissions
  lastLogin: Date,
  createdAt: Date,
  active: Boolean
}
```

---

## 🛠️ Database Initialization Script

Create `src/lib/init-database.js`:
```javascript
import { getCollection } from './mongodb.js';

export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Initialize news collection with indexes
    const newsCollection = await getCollection('news');
    await newsCollection.createIndex({ "published": 1, "createdAt": -1 });
    await newsCollection.createIndex({ "slug": 1 }, { unique: true });
    await newsCollection.createIndex({ "category": 1 });
    await newsCollection.createIndex({ "featured": 1 });
    
    // Initialize media collection
    const mediaCollection = await getCollection('media');
    await mediaCollection.createIndex({ "createdAt": -1 });
    await mediaCollection.createIndex({ "mimeType": 1 });
    
    // Initialize pages collection
    const pagesCollection = await getCollection('pages');
    await pagesCollection.createIndex({ "pageId": 1 }, { unique: true });
    
    // Initialize settings collection
    const settingsCollection = await getCollection('settings');
    await settingsCollection.createIndex({ "category": 1 }, { unique: true });
    
    // Insert default settings if they don't exist
    const existingSettings = await settingsCollection.findOne({ category: 'general' });
    if (!existingSettings) {
      await settingsCollection.insertOne({
        category: 'general',
        settings: {
          siteName: {
            type: 'text',
            value: 'BiYu Boxing',
            label: 'Site Name'
          },
          siteTagline: {
            type: 'text',
            value: 'Professional Boxing Training',
            label: 'Site Tagline'
          }
        },
        updatedAt: new Date(),
        updatedBy: 'system'
      });
    }
    
    console.log('✅ Database initialized successfully');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return { success: false, error: error.message };
  }
}
```

---

## 🧪 Testing Database Setup

Create test page at `src/pages/test-db.astro`:
```astro
---
import { initializeDatabase } from '../lib/init-database.js';
import { getCollection } from '../lib/mongodb.js';

let result = null;
let collections = [];

if (Astro.request.method === 'POST') {
  result = await initializeDatabase();
}

// Test collections exist
try {
  const db = await connectToDatabase();
  const collectionsList = await db.listCollections().toArray();
  collections = collectionsList.map(c => c.name);
} catch (error) {
  console.error('Error listing collections:', error);
}
---

<html>
  <head>
    <title>Database Test</title>
  </head>
  <body>
    <h1>🗄️ Database Schema Test</h1>
    
    <form method="post">
      <button type="submit">Initialize Database</button>
    </form>
    
    {result && (
      <div style={result.success ? "color: green;" : "color: red;"}>
        {result.success ? "✅ Database initialized!" : `❌ Error: ${result.error}`}
      </div>
    )}
    
    <h2>Collections:</h2>
    <ul>
      {collections.map(name => <li>{name}</li>)}
    </ul>
    
    <p><a href="/">← Back to main page</a></p>
  </body>
</html>
```

---

## ✅ Database Testing Checklist

- [ ] Database connection works
- [ ] All collections can be created
- [ ] Indexes are properly set up
- [ ] Default settings are inserted
- [ ] No errors in console during initialization

---

## 📝 Database Schema Complete!

Once database tests pass, you're ready for **Phase 1, Step 1.3: Authentication Foundation**.

### Files Created:
- `src/lib/init-database.js` - Database initialization
- `src/pages/test-db.astro` - Database testing page

### Collections Ready:
- ✅ news (with indexes)
- ✅ media (with indexes)  
- ✅ pages (with indexes)
- ✅ settings (with default data)
