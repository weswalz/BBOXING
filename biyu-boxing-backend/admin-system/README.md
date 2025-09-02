# 🥊 BiYu Boxing Admin System

A clean, modern admin interface for BiYu Boxing website built with Astro.js, MongoDB, and TinyMCE.

## Features

- 📰 **News Publishing System** - Rich text editor with TinyMCE
- 🖼️ **Media Gallery** - Upload and manage images
- 📄 **Page Content Management** - ACF-style custom fields
- ⚙️ **Site Settings** - Manage site-wide configurations
- 🔐 **Secure Authentication** - Cookie-based sessions with access key support
- 📱 **Mobile Responsive** - Works on all devices

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Git (optional)

### Installation

1. **Install Dependencies**
```bash
cd /Users/wesleywalz/DEV/BBOXING/biyu-boxing-backend/admin-system
npm install
```

2. **Start MongoDB** (if using local MongoDB)
```bash
# On macOS with Homebrew
brew services start mongodb/brew/mongodb-community

# Or manually
mongod
```

3. **Configure Environment**

Edit the `.env` file with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/biyu-boxing
ADMIN_EMAIL=admin@biyuboxing.com
ADMIN_PASSWORD=your-secure-password
ADMIN_KEY=your-access-key
```

4. **Start Development Server**
```bash
npm run dev
```

5. **Access the Admin**

Visit: http://localhost:4321

- Login page: http://localhost:4321/admin/login
- Quick access: http://localhost:4321/admin/dashboard?key=admin123

### Default Credentials

- **Email:** admin@biyuboxing.com
- **Password:** admin123
- **Access Key:** admin123

⚠️ **Important:** Change these in production!

## Project Structure

```
admin-system/
├── src/
│   ├── components/     # Reusable components
│   │   └── admin/       # Admin-specific components
│   ├── pages/           # Astro pages
│   │   ├── admin/       # Admin pages
│   │   └── api/         # API endpoints
│   ├── lib/             # Utilities and helpers
│   └── styles/          # Global styles
├── public/
│   └── uploads/         # Uploaded media files
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## Development Progress

### ✅ Phase 1: Foundation (Complete)
- [x] Environment setup
- [x] Database connection
- [x] Authentication system

### 🔄 Phase 2: Core Admin Structure (In Progress)
- [x] Admin layout system
- [x] Dashboard foundation
- [ ] Complete navigation

### 📋 Upcoming Phases
- [ ] Phase 3: News Publishing System
- [ ] Phase 4: Media Gallery System
- [ ] Phase 5: Page Content Management
- [ ] Phase 6: Site Settings Management
- [ ] Phase 7: Polish & Optimization
- [ ] Phase 8: Deployment & Handoff

## Testing

### Test Database Connection
```bash
# Visit
http://localhost:4321/test-db
```

### Test Authentication
```bash
# Visit login page
http://localhost:4321/admin/login

# Test quick access
http://localhost:4321/admin/dashboard?key=admin123
```

## Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running
2. Check connection string in `.env`
3. Verify database name has no spaces

### Module Import Errors
1. Clear node_modules: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Verify Node.js version: `node --version`

### Authentication Issues
1. Check `.env` file exists
2. Restart dev server after changing `.env`
3. Clear browser cookies

## Security Notes

For production deployment:
1. Use strong passwords
2. Enable HTTPS
3. Change default credentials
4. Set secure MongoDB connection string
5. Implement rate limiting
6. Add CSRF protection

## Support

For issues or questions, refer to the documentation in the `/documentation` folder.

---

Built with ❤️ for BiYu Boxing
