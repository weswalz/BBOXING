# BiYu Boxing Admin Backend - Product Requirements Document (PRD)
**Version:** 1.0  
**Date:** January 2025  
**Project:** BiYu Boxing Astro Admin Backend with MongoDB

---

## 1. Executive Summary

### 1.1 Overview
This PRD outlines the development of a comprehensive admin backend system for BiYu Boxing Promotions website (biyuboxing.com). The system will be built using Astro with server-side rendering (SSR), MongoDB for data persistence, and a modern, user-friendly admin panel that enables non-technical users to manage all website content.

### 1.2 Key Objectives
- Develop a robust, scalable admin backend system
- Implement multi-user authentication with role-based access control
- Create an intuitive admin interface for non-technical users
- Build RESTful APIs for all content operations
- Ensure seamless integration with the existing Astro frontend
- Optimize for performance and security

### 1.3 Success Metrics
- Admin panel load time < 2 seconds
- API response time < 200ms for standard operations
- Zero-downtime content updates
- 99.9% uptime for admin services
- Support for 10+ concurrent admin users

---

## 2. Technical Architecture

### 2.1 Technology Stack
```
Frontend:
- Astro 5.x with SSR (Server-Side Rendering)
- TypeScript for type safety
- Tailwind CSS 4.x for styling
- Flowbite/DaisyUI for UI components

Backend:
- Node.js runtime with Astro Node adapter
- MongoDB Atlas for database
- Mongoose ODM for data modeling
- Better Auth for authentication
- Express middleware for API handling

Infrastructure:
- Vercel/Netlify for hosting
- Cloudflare CDN for assets
- MongoDB Atlas for managed database
- AWS S3/Cloudflare R2 for media storage
```

### 2.2 System Architecture Diagram
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Admin Users   │────▶│   Admin Panel   │────▶│   API Gateway   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                          │
                            ┌─────────────────────────────┼─────────────────────────────┐
                            │                             │                             │
                    ┌───────▼────────┐          ┌────────▼────────┐          ┌─────────▼────────┐
                    │ Authentication │          │   REST API      │          │  Media Service   │
                    │    Service     │          │   Endpoints     │          │    (S3/R2)       │
                    └────────────────┘          └─────────────────┘          └──────────────────┘
                            │                             │                             │
                            └─────────────────────────────┼─────────────────────────────┘
                                                          │
                                                ┌─────────▼─────────┐
                                                │   MongoDB Atlas   │
                                                └───────────────────┘
```

---

## 3. Database Schema Design

### 3.1 User Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String (required),
  lastName: String (required),
  role: String (enum: ['super_admin', 'admin', 'editor', 'author', 'viewer']),
  avatar: String (URL),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailVerified: Boolean (default: false),
  emailVerificationToken: String
}
```

### 3.2 Article/News Schema
```javascript
{
  _id: ObjectId,
  title: String (required, max: 200),
  slug: String (unique, required),
  excerpt: String (max: 300),
  content: String (rich text, required),
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  author: ObjectId (ref: 'User'),
  status: String (enum: ['draft', 'published', 'archived']),
  publishedAt: Date,
  categories: [String],
  tags: [String],
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogImage: String
  },
  viewCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 3.3 Event Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (unique, required),
  eventDate: Date (required),
  eventTime: String,
  venue: String (required),
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  description: String (rich text),
  shortDescription: String (max: 300),
  featuredImage: {
    url: String,
    alt: String
  },
  ticketLink: String (URL),
  price: {
    min: Number,
    max: Number,
    currency: String (default: 'USD')
  },
  capacity: Number,
  status: String (enum: ['upcoming', 'ongoing', 'completed', 'cancelled']),
  fighters: [ObjectId] (ref: 'Fighter'),
  organizer: String,
  sponsors: [String],
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### 3.4 Fighter Schema
```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  nickname: String,
  slug: String (unique, required),
  country: String (required),
  countryCode: String (ISO 3166),
  dateOfBirth: Date,
  height: Number (in cm),
  reach: Number (in cm),
  weightClass: String (enum: ['heavyweight', 'cruiserweight', 'light_heavyweight', 'middleweight', 'welterweight', 'lightweight', 'featherweight', 'bantamweight', 'flyweight']),
  stance: String (enum: ['orthodox', 'southpaw', 'switch']),
  record: {
    wins: Number (default: 0),
    losses: Number (default: 0),
    draws: Number (default: 0),
    knockouts: Number (default: 0),
    noContests: Number (default: 0)
  },
  ranking: {
    organization: String,
    rank: Number,
    division: String
  },
  bio: String (rich text),
  profileImage: {
    url: String,
    alt: String
  },
  gallery: [{
    url: String,
    alt: String,
    caption: String,
    order: Number
  }],
  socialMedia: {
    instagram: String,
    twitter: String,
    facebook: String,
    youtube: String
  },
  status: String (enum: ['active', 'inactive', 'retired']),
  manager: String,
  trainer: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 3.5 Page Schema (Dynamic Pages)
```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (unique, required),
  template: String (enum: ['default', 'about', 'contact', 'custom']),
  hero: {
    title: String,
    subtitle: String,
    backgroundImage: String,
    ctaText: String,
    ctaLink: String,
    overlayOpacity: Number (0-1)
  },
  sections: [{
    type: String (enum: ['text', 'image', 'video', 'gallery', 'cta', 'form', 'custom']),
    order: Number,
    content: Mixed, // Dynamic based on section type
    settings: {
      backgroundColor: String,
      padding: String,
      alignment: String
    }
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogImage: String
  },
  status: String (enum: ['draft', 'published']),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### 3.6 Newsletter Subscriber Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  firstName: String,
  lastName: String,
  birthday: Date,
  status: String (enum: ['active', 'unsubscribed', 'bounced']),
  source: String (enum: ['website', 'admin', 'import']),
  tags: [String],
  subscribedAt: Date,
  unsubscribedAt: Date,
  lastEmailSent: Date,
  emailCount: Number (default: 0),
  ipAddress: String,
  userAgent: String
}
```

### 3.7 Site Settings Schema
```javascript
{
  _id: ObjectId,
  siteName: String (default: 'BiYu Boxing Promotions'),
  tagline: String,
  logo: {
    light: String (URL),
    dark: String (URL),
    favicon: String (URL)
  },
  contact: {
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  social: {
    instagram: String,
    twitter: String,
    facebook: String,
    youtube: String,
    tiktok: String
  },
  footer: {
    text: String,
    copyrightText: String,
    links: [{
      title: String,
      url: String,
      order: Number
    }]
  },
  analytics: {
    googleAnalyticsId: String,
    facebookPixelId: String,
    customScripts: String
  },
  email: {
    smtpHost: String,
    smtpPort: Number,
    smtpUser: String,
    smtpPassword: String (encrypted),
    fromEmail: String,
    fromName: String
  },
  maintenance: {
    enabled: Boolean (default: false),
    message: String,
    allowedIPs: [String]
  },
  updatedAt: Date
}
```

---

## 4. API Specifications

### 4.1 Authentication Endpoints

#### POST /api/auth/register
```javascript
Request:
{
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role?: string // Only by super_admin
}

Response:
{
  success: boolean,
  message: string,
  data: {
    user: UserObject,
    token: string,
    refreshToken: string
  }
}
```

#### POST /api/auth/login
```javascript
Request:
{
  email: string,
  password: string
}

Response:
{
  success: boolean,
  data: {
    user: UserObject,
    token: string,
    refreshToken: string,
    expiresIn: number
  }
}
```

#### POST /api/auth/logout
```javascript
Headers: Authorization: Bearer {token}

Response:
{
  success: boolean,
  message: string
}
```

#### GET /api/auth/me
```javascript
Headers: Authorization: Bearer {token}

Response:
{
  success: boolean,
  data: {
    user: UserObject
  }
}
```

#### POST /api/auth/refresh-token
```javascript
Request:
{
  refreshToken: string
}

Response:
{
  success: boolean,
  data: {
    token: string,
    refreshToken: string,
    expiresIn: number
  }
}
```

### 4.2 Content Management Endpoints

#### Articles/News API

**GET /api/articles**
```javascript
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20, max: 100)
- status: string (draft|published|archived)
- author: ObjectId
- category: string
- search: string
- sortBy: string (createdAt|updatedAt|title|publishedAt)
- order: string (asc|desc)

Response:
{
  success: boolean,
  data: {
    articles: [ArticleObject],
    pagination: {
      page: number,
      limit: number,
      total: number,
      pages: number
    }
  }
}
```

**GET /api/articles/:id**
```javascript
Response:
{
  success: boolean,
  data: {
    article: ArticleObject
  }
}
```

**POST /api/articles**
```javascript
Headers: Authorization: Bearer {token}

Request:
{
  title: string,
  slug?: string, // Auto-generated if not provided
  excerpt: string,
  content: string,
  featuredImage?: ImageObject,
  status: string,
  categories?: string[],
  tags?: string[],
  seo?: SEOObject
}

Response:
{
  success: boolean,
  data: {
    article: ArticleObject
  }
}
```

**PUT /api/articles/:id**
```javascript
Headers: Authorization: Bearer {token}

Request: // Partial update supported
{
  title?: string,
  content?: string,
  status?: string,
  // ... other fields
}

Response:
{
  success: boolean,
  data: {
    article: ArticleObject
  }
}
```

**DELETE /api/articles/:id**
```javascript
Headers: Authorization: Bearer {token}

Response:
{
  success: boolean,
  message: string
}
```

#### Events API

**GET /api/events**
```javascript
Query Parameters:
- page: number
- limit: number
- status: string (upcoming|ongoing|completed|cancelled)
- startDate: ISO date string
- endDate: ISO date string
- venue: string
- search: string

Response:
{
  success: boolean,
  data: {
    events: [EventObject],
    pagination: PaginationObject
  }
}
```

**POST /api/events**
```javascript
Headers: Authorization: Bearer {token}

Request:
{
  title: string,
  eventDate: ISO date,
  eventTime: string,
  venue: string,
  location: LocationObject,
  description: string,
  ticketLink?: string,
  fighters?: ObjectId[],
  // ... other fields
}
```

#### Fighters API

**GET /api/fighters**
```javascript
Query Parameters:
- page: number
- limit: number
- weightClass: string
- country: string
- status: string (active|inactive|retired)
- search: string

Response:
{
  success: boolean,
  data: {
    fighters: [FighterObject],
    pagination: PaginationObject
  }
}
```

### 4.3 Public API Endpoints (No Auth Required)

**GET /api/public/articles**
- Returns only published articles
- Limited fields for performance
- Cached responses

**GET /api/public/events**
- Returns upcoming and ongoing events only
- Includes basic fighter info

**GET /api/public/fighters**
- Returns active fighters only
- Public profile information

**GET /api/public/pages/:slug**
- Returns published page content
- Cached for performance

### 4.4 Media Management API

**POST /api/media/upload**
```javascript
Headers: 
- Authorization: Bearer {token}
- Content-Type: multipart/form-data

Request: FormData with files

Response:
{
  success: boolean,
  data: {
    files: [{
      url: string,
      thumbnailUrl: string,
      size: number,
      mimeType: string,
      dimensions: {
        width: number,
        height: number
      }
    }]
  }
}
```

**GET /api/media**
```javascript
Query Parameters:
- page: number
- limit: number
- type: string (image|video|document)
- search: string

Response:
{
  success: boolean,
  data: {
    media: [MediaObject],
    pagination: PaginationObject
  }
}
```

---

## 5. Authentication & Authorization

### 5.1 Authentication Flow
```
1. User Login → Validate Credentials → Generate JWT + Refresh Token
2. Store Refresh Token in HttpOnly Cookie
3. Return Access Token to Client
4. Client includes Bearer Token in API requests
5. Middleware validates token on each request
6. Refresh token rotation on expiry
```

### 5.2 Role-Based Access Control (RBAC)

#### Permission Matrix

| Feature | Super Admin | Admin | Editor | Author | Viewer |
|---------|------------|-------|--------|--------|--------|
| **Users** |
| Create Users | ✓ | ✗ | ✗ | ✗ | ✗ |
| Edit Users | ✓ | ✗ | ✗ | ✗ | ✗ |
| Delete Users | ✓ | ✗ | ✗ | ✗ | ✗ |
| Change Roles | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Articles** |
| Create | ✓ | ✓ | ✓ | ✓ | ✗ |
| Edit All | ✓ | ✓ | ✓ | ✗ | ✗ |
| Edit Own | ✓ | ✓ | ✓ | ✓ | ✗ |
| Delete | ✓ | ✓ | ✗ | ✗ | ✗ |
| Publish | ✓ | ✓ | ✓ | ✗ | ✗ |
| **Events** |
| Create | ✓ | ✓ | ✓ | ✗ | ✗ |
| Edit | ✓ | ✓ | ✓ | ✗ | ✗ |
| Delete | ✓ | ✓ | ✗ | ✗ | ✗ |
| **Fighters** |
| Create | ✓ | ✓ | ✓ | ✗ | ✗ |
| Edit | ✓ | ✓ | ✓ | ✗ | ✗ |
| Delete | ✓ | ✓ | ✗ | ✗ | ✗ |
| **Media** |
| Upload | ✓ | ✓ | ✓ | ✓ | ✗ |
| Delete | ✓ | ✓ | ✗ | ✗ | ✗ |
| **Settings** |
| Edit Site Settings | ✓ | ✗ | ✗ | ✗ | ✗ |
| View Analytics | ✓ | ✓ | ✓ | ✗ | ✓ |

### 5.3 Security Features
- Password hashing with bcrypt (12 rounds)
- JWT tokens with 15-minute expiry
- Refresh tokens with 7-day expiry
- Rate limiting on auth endpoints (5 attempts/minute)
- IP-based blocking after repeated failures
- Two-factor authentication (optional)
- Session management and device tracking
- Audit logs for all admin actions

---

## 6. Admin Panel Features

### 6.1 Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│  BiYu Boxing Admin Dashboard                        [User]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Articles │  │  Events  │  │ Fighters │  │  Users   │  │
│  │    42    │  │    8     │  │    15    │  │    5     │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
│  Recent Activity                    Upcoming Events         │
│  ┌─────────────────────────┐      ┌──────────────────────┐│
│  │ • John edited article    │      │ Oct 10 - BiYu Brawl  ││
│  │ • Sarah added fighter    │      │ Oct 24 - Fight Night ││
│  │ • Mike published event   │      │ Nov 5 - Championship ││
│  └─────────────────────────┘      └──────────────────────┘│
│                                                             │
│  Quick Actions                                              │
│  [+ New Article] [+ New Event] [+ New Fighter]             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Content Editor Features
- **WYSIWYG Editor** (TinyMCE or Quill)
  - Rich text formatting
  - Image insertion with alignment
  - Video embedding
  - Table creation
  - Code blocks
  - Custom styles

- **Content Management**
  - Auto-save every 30 seconds
  - Version history with rollback
  - Preview before publish
  - SEO preview (Google/Social)
  - Scheduled publishing
  - Content templates

### 6.3 Media Library
- Grid/List view toggle
- Drag-and-drop upload
- Bulk upload support
- Automatic image optimization
- Responsive image generation
- Alt text and metadata editing
- Search and filter by:
  - File type
  - Upload date
  - File size
  - Used/Unused

### 6.4 User Interface Components
```javascript
// Component Library
- Navigation (Sidebar, Breadcrumbs)
- Data Tables (Sortable, Filterable)
- Forms (Validation, Error States)
- Modals (Confirmation, Edit)
- Notifications (Success, Error, Info)
- Charts (Dashboard Analytics)
- Date/Time Pickers
- Image Croppers
- Drag-and-Drop Interfaces
```

### 6.5 Accessibility Features
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Font size adjustment
- Focus indicators
- Alt text for all images
- ARIA labels

---

## 7. Performance Requirements

### 7.1 Response Time Targets
- Dashboard load: < 2 seconds
- API responses: < 200ms (p95)
- Image upload: < 5 seconds (10MB file)
- Search results: < 500ms
- Content save: < 1 second

### 7.2 Optimization Strategies
```javascript
// Caching Strategy
- Redis for session storage
- CDN for static assets
- Browser caching headers
- API response caching
- Database query optimization

// Database Optimization
- Indexed fields (slug, status, createdAt)
- Pagination on all list endpoints
- Projection for minimal data transfer
- Connection pooling
- Read replicas for public APIs

// Frontend Optimization
- Code splitting
- Lazy loading
- Image optimization (WebP, AVIF)
- Minification and compression
- Service worker for offline support
```

### 7.3 Scalability Requirements
- Support 100+ concurrent admin users
- Handle 10,000+ content items
- Process 1,000+ API requests/minute
- Store 100GB+ of media files
- 99.9% uptime SLA

---

## 8. Security Considerations

### 8.1 Application Security
```javascript
// Security Headers
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security
- X-XSS-Protection

// Input Validation
- Sanitize all user inputs
- SQL injection prevention
- XSS protection
- CSRF tokens
- File upload validation

// Authentication Security
- Secure password requirements
- Account lockout after failures
- Password reset via email
- Session timeout (30 minutes)
- Secure cookie flags
```

### 8.2 Data Protection
- Encryption at rest (MongoDB)
- Encryption in transit (HTTPS)
- PII data masking in logs
- GDPR compliance
- Regular security audits
- Automated vulnerability scanning

### 8.3 Backup & Recovery
- Daily automated backups
- Point-in-time recovery
- Geographic redundancy
- Backup testing monthly
- Disaster recovery plan
- RTO: 4 hours, RPO: 1 hour

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
**Setup & Configuration**
- [ ] Initialize Astro project with SSR
- [ ] Configure MongoDB Atlas
- [ ] Set up Mongoose schemas
- [ ] Configure environment variables
- [ ] Set up Git repository and CI/CD
- [ ] Install and configure Tailwind CSS
- [ ] Set up project structure

**Deliverables:**
- Working development environment
- Database connection established
- Basic project scaffolding

### Phase 2: Authentication System (Weeks 2-3)
**User Management**
- [ ] Implement Better Auth integration
- [ ] Create user registration flow
- [ ] Build login/logout functionality
- [ ] Implement JWT token management
- [ ] Add password reset functionality
- [ ] Create role-based middleware
- [ ] Build user profile management

**Deliverables:**
- Complete authentication system
- User management CRUD operations
- Role-based access control

### Phase 3: Core API Development (Weeks 3-4)
**REST API Implementation**
- [ ] Create article/news endpoints
- [ ] Build event management APIs
- [ ] Implement fighter APIs
- [ ] Create page management endpoints
- [ ] Add newsletter subscription APIs
- [ ] Implement media upload endpoints
- [ ] Add search and filtering
- [ ] Implement pagination

**Deliverables:**
- Complete REST API
- API documentation
- Postman collection

### Phase 4: Admin UI Development (Weeks 4-6)
**Admin Panel Interface**
- [ ] Create admin layout and navigation
- [ ] Build dashboard with statistics
- [ ] Implement content management pages
- [ ] Add WYSIWYG editor integration
- [ ] Create media library interface
- [ ] Build user management interface
- [ ] Add settings management
- [ ] Implement search and filters

**Deliverables:**
- Functional admin panel
- All CRUD interfaces
- Media management system

### Phase 5: Features & Enhancements (Week 6)
**Advanced Features**
- [ ] Add content versioning
- [ ] Implement auto-save
- [ ] Add bulk operations
- [ ] Create activity logs
- [ ] Add email notifications
- [ ] Implement caching layer
- [ ] Add export functionality

**Deliverables:**
- Enhanced user experience
- Performance optimizations
- Advanced features

### Phase 6: Testing & Optimization (Week 7)
**Quality Assurance**
- [ ] Unit testing for APIs
- [ ] Integration testing
- [ ] UI/UX testing
- [ ] Performance testing
- [ ] Security testing
- [ ] Accessibility testing
- [ ] Bug fixes and refinements

**Deliverables:**
- Test reports
- Bug-free application
- Performance benchmarks

### Phase 7: Deployment & Launch (Week 8)
**Production Deployment**
- [ ] Set up production environment
- [ ] Configure CI/CD pipeline
- [ ] Deploy to Vercel/Netlify
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] SSL certificate setup
- [ ] DNS configuration
- [ ] Launch and handover

**Deliverables:**
- Live production system
- Deployment documentation
- Admin training materials

---

## 10. Technical Implementation Details

### 10.1 Project Structure
```
/biyuboxing-admin/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── Dashboard.astro
│   │   │   ├── Sidebar.astro
│   │   │   ├── DataTable.astro
│   │   │   └── ...
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Modal.astro
│   │       └── ...
│   ├── layouts/
│   │   ├── AdminLayout.astro
│   │   └── AuthLayout.astro
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...all].ts
│   │   │   ├── articles/
│   │   │   │   ├── index.ts
│   │   │   │   └── [id].ts
│   │   │   ├── events/
│   │   │   ├── fighters/
│   │   │   └── ...
│   │   ├── admin/
│   │   │   ├── index.astro
│   │   │   ├── articles/
│   │   │   ├── events/
│   │   │   └── ...
│   │   └── index.astro
│   ├── lib/
│   │   ├── db/
│   │   │   ├── connection.ts
│   │   │   └── models/
│   │   ├── auth/
│   │   │   ├── jwt.ts
│   │   │   └── middleware.ts
│   │   └── utils/
│   ├── middleware/
│   │   └── index.ts
│   └── env.d.ts
├── public/
├── .env
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### 10.2 Environment Variables
```bash
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/biyu-boxing
MONGODB_DB_NAME=biyu-boxing

# Authentication
JWT_SECRET=your-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key
BETTER_AUTH_SECRET=your-better-auth-secret

# API
API_BASE_URL=https://api.biyuboxing.com
PUBLIC_API_URL=https://biyuboxing.com/api

# Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=biyu-boxing-media

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
FROM_EMAIL=noreply@biyuboxing.com

# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
SENTRY_DSN=your-sentry-dsn

# Environment
NODE_ENV=production
```

### 10.3 Key Dependencies
```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/node": "^8.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "better-auth": "^1.0.0",
    "mongoose": "^8.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5",
    "sharp": "^0.33.0",
    "slugify": "^1.6.0",
    "zod": "^3.22.0",
    "flowbite": "^2.0.0",
    "tinymce": "^6.0.0",
    "@aws-sdk/client-s3": "^3.0.0",
    "nodemailer": "^6.9.0",
    "redis": "^4.6.0",
    "dayjs": "^1.11.0",
    "nanoid": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0",
    "eslint": "^8.50.0",
    "prettier": "^3.1.0"
  }
}
```

### 10.4 Sample API Implementation

#### Authentication Middleware
```typescript
// src/lib/auth/middleware.ts
import jwt from 'jsonwebtoken';
import type { APIContext } from 'astro';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export async function requireAuth(
  context: APIContext,
  requiredRoles?: string[]
): Promise<AuthUser | null> {
  const token = context.request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    context.response = new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    );
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    
    if (requiredRoles && !requiredRoles.includes(decoded.role)) {
      context.response = new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403 }
      );
      return null;
    }
    
    return decoded;
  } catch (error) {
    context.response = new Response(
      JSON.stringify({ error: 'Invalid token' }),
      { status: 401 }
    );
    return null;
  }
}
```

#### Article API Endpoint
```typescript
// src/pages/api/articles/index.ts
import type { APIRoute } from 'astro';
import { Article } from '@/lib/db/models/Article';
import { requireAuth } from '@/lib/auth/middleware';
import { z } from 'zod';

const createArticleSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  excerpt: z.string().max(300).optional(),
  status: z.enum(['draft', 'published', 'archived']),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional()
});

export const GET: APIRoute = async ({ request, url }) => {
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  
  const query: any = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
    ];
  }
  
  const total = await Article.countDocuments(query);
  const articles = await Article.find(query)
    .populate('author', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  
  return new Response(JSON.stringify({
    success: true,
    data: {
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async (context) => {
  const user = await requireAuth(context, ['super_admin', 'admin', 'editor', 'author']);
  if (!user) return context.response;
  
  try {
    const body = await context.request.json();
    const validated = createArticleSchema.parse(body);
    
    const article = await Article.create({
      ...validated,
      author: user.id,
      slug: validated.title.toLowerCase().replace(/\s+/g, '-')
    });
    
    return new Response(JSON.stringify({
      success: true,
      data: { article }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof z.ZodError ? error.errors : 'Invalid request'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
```

---

## 11. Testing Strategy

### 11.1 Unit Testing
```javascript
// Test Categories
- Model validation tests
- API endpoint tests
- Authentication tests
- Utility function tests
- Component tests

// Coverage Requirements
- Minimum 80% code coverage
- 100% coverage for auth functions
- 100% coverage for data validation
```

### 11.2 Integration Testing
- API workflow tests
- Database transaction tests
- Authentication flow tests
- File upload tests
- Email notification tests

### 11.3 E2E Testing
```javascript
// Playwright Test Scenarios
- User registration and login
- Content creation workflow
- Media upload and management
- Role-based access verification
- Search and filter functionality
- Mobile responsive testing
```

### 11.4 Performance Testing
- Load testing with K6
- API response time benchmarks
- Database query optimization
- CDN performance validation
- Image optimization verification

---

## 12. Documentation Requirements

### 12.1 Technical Documentation
- API documentation (OpenAPI/Swagger)
- Database schema documentation
- Deployment guide
- Environment setup guide
- Troubleshooting guide

### 12.2 User Documentation
- Admin panel user guide
- Content editor manual
- Media library guide
- SEO best practices
- Video tutorials

### 12.3 Developer Documentation
- Code style guide
- Git workflow
- Testing procedures
- Security guidelines
- Contributing guide

---

## 13. Monitoring & Analytics

### 13.1 Application Monitoring
```javascript
// Sentry Integration
- Error tracking
- Performance monitoring
- Release tracking
- User feedback

// Custom Metrics
- API response times
- Database query performance
- User activity tracking
- Content creation metrics
```

### 13.2 Infrastructure Monitoring
- Server uptime monitoring
- Database performance metrics
- CDN cache hit rates
- SSL certificate monitoring
- Backup verification

### 13.3 Business Analytics
- Content performance metrics
- User engagement tracking
- Event attendance tracking
- Newsletter subscription rates
- Fighter profile views

---

## 14. Maintenance & Support

### 14.1 Regular Maintenance
- Weekly security updates
- Monthly dependency updates
- Quarterly performance reviews
- Annual security audits

### 14.2 Support Structure
- Bug reporting system
- Feature request process
- User training sessions
- Documentation updates
- 24/7 critical issue support

### 14.3 Continuous Improvement
- User feedback collection
- A/B testing framework
- Performance optimization
- Feature roadmap planning
- Technology stack evaluation

---

## 15. Success Criteria

### 15.1 Technical Metrics
- ✅ Page load time < 2 seconds
- ✅ API response time < 200ms (p95)
- ✅ 99.9% uptime achieved
- ✅ Zero critical security vulnerabilities
- ✅ Mobile responsive on all devices

### 15.2 Business Metrics
- ✅ 50% reduction in content publishing time
- ✅ 100% of non-technical staff can use system
- ✅ Zero data loss incidents
- ✅ 90% user satisfaction rate
- ✅ ROI positive within 6 months

### 15.3 User Experience Metrics
- ✅ Intuitive navigation (< 3 clicks to any feature)
- ✅ Consistent UI/UX across all sections
- ✅ Helpful error messages and guidance
- ✅ Accessible to users with disabilities
- ✅ Multi-language support ready

---

## 16. Risk Management

### 16.1 Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Database failure | High | Automated backups, failover replicas |
| Security breach | Critical | Regular audits, penetration testing |
| Performance degradation | Medium | Monitoring, auto-scaling |
| Integration failures | Medium | Comprehensive testing, rollback plans |

### 16.2 Business Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| User adoption issues | High | Training, intuitive UI |
| Content migration problems | Medium | Phased migration, validation |
| Budget overrun | Medium | Agile approach, regular reviews |
| Timeline delays | Low | Buffer time, parallel development |

---

## 17. Budget Estimation

### 17.1 Development Costs
- Development team (8 weeks): $40,000 - $60,000
- UI/UX design: $5,000 - $8,000
- Testing and QA: $5,000 - $8,000
- Project management: $5,000 - $7,000
- **Total Development**: $55,000 - $83,000

### 17.2 Infrastructure Costs (Annual)
- MongoDB Atlas: $600 - $1,200
- Vercel/Netlify hosting: $240 - $600
- CDN services: $200 - $500
- Email service: $120 - $300
- Monitoring tools: $300 - $600
- **Total Infrastructure**: $1,460 - $3,200/year

### 17.3 Maintenance Costs (Annual)
- Updates and patches: $6,000 - $10,000
- Support and training: $3,000 - $5,000
- Feature enhancements: $10,000 - $15,000
- **Total Maintenance**: $19,000 - $30,000/year

---

## 18. Conclusion

This PRD provides a comprehensive blueprint for building a modern, scalable, and user-friendly admin backend system for BiYu Boxing Promotions. The proposed solution leverages cutting-edge technologies and best practices to ensure optimal performance, security, and user experience.

The system is designed to grow with the business, supporting increased traffic, content volume, and feature requirements. With a focus on non-technical user accessibility, the admin panel will empower the BiYu Boxing team to manage their digital presence effectively without constant developer intervention.

### Key Takeaways
1. **Modern Tech Stack**: Astro SSR + MongoDB provides optimal performance
2. **User-Centric Design**: Intuitive interface for non-technical users
3. **Scalable Architecture**: Built to handle growth
4. **Security First**: Comprehensive security measures throughout
5. **Future-Proof**: Extensible design for new features

### Next Steps
1. Review and approve PRD
2. Finalize budget and timeline
3. Assemble development team
4. Begin Phase 1 implementation
5. Set up regular progress reviews

---

## Appendices

### Appendix A: Glossary
- **SSR**: Server-Side Rendering
- **JWT**: JSON Web Token
- **RBAC**: Role-Based Access Control
- **CDN**: Content Delivery Network
- **WYSIWYG**: What You See Is What You Get
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete

### Appendix B: References
- [Astro Documentation](https://docs.astro.build)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/best-practices/)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Better Auth Documentation](https://better-auth.com/docs)
- [Flowbite Components](https://flowbite.com/docs)

### Appendix C: Compliance Requirements
- GDPR compliance for EU users
- CCPA compliance for California users
- WCAG 2.1 AA accessibility standards
- PCI DSS for payment processing (future)
- SOC 2 Type II certification (optional)

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Ready for Review  
**Author:** BiYu Boxing Technical Team

---

*This document is confidential and proprietary to BiYu Boxing Promotions.*