# 🛠️ Environment Setup Guide

## PHASE 1, STEP 1.1: CREATE ASTRO PROJECT FOUNDATION

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Code editor (VS Code recommended)

### Step-by-Step Setup

#### 1. Create Astro Project
```bash
cd /Users/wesleywalz/DEV/BBOXING/biyu-boxing-backend
npm create astro@latest admin-system
cd admin-system

# Choose options:
# - Template: Empty
# - TypeScript: No (unless you prefer it)
# - Install dependencies: Yes
# - Git: Yes
```

#### 2. Install Required Dependencies
```bash
npm install mongodb
npm install @astrojs/node
npm install multer @types/multer
npm install sharp
```

#### 3. Configure Astro
Update `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});
```

#### 4. Create Environment Configuration
Create `.env` file in project root:
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/biyu-boxing
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/biyu-boxing

# Admin Authentication
ADMIN_KEY=admin123
ADMIN_EMAIL=admin@biyuboxing.com
ADMIN_PASSWORD=secure_password_here

# File Upload
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=5242880

# Environment
NODE_ENV=development
```

#### 5. Create Basic Directory Structure
```bash
mkdir -p src/components/admin
mkdir -p src/pages/admin
mkdir -p src/pages/api
mkdir -p src/lib
mkdir -p src/styles
mkdir -p public/uploads
```

#### 6. Create MongoDB Connection Utility
Create `src/lib/mongodb.js`:
```javascript
import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI || process.env.MONGODB_URI;
const client = new MongoClient(uri);

let isConnected = false;

export async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log('Connected to MongoDB');
  }
  return client.db();
}

export async function getCollection(collectionName) {
  const db = await connectToDatabase();
  return db.collection(collectionName);
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});
```

#### 7. Test Basic Setup
Create `src/pages/index.astro`:
```astro
---
import { getCollection } from '../lib/mongodb.js';

// Test database connection
let connectionStatus = 'Testing...';
let error = null;

try {
  await getCollection('test');
  connectionStatus = 'Connected successfully!';
} catch (err) {
  connectionStatus = 'Connection failed';
  error = err.message;
}
---

<html>
  <head>
    <title>BiYu Boxing Admin - Setup Test</title>
  </head>
  <body>
    <h1>🥊 BiYu Boxing Admin System</h1>
    <h2>Setup Status</h2>
    <p><strong>Database:</strong> {connectionStatus}</p>
    {error && <p style="color: red;"><strong>Error:</strong> {error}</p>}
    
    <h3>Next Steps:</h3>
    <ul>
      <li>✅ Astro project created</li>
      <li>✅ Dependencies installed</li>
      <li>✅ Environment configured</li>
      <li>✅ MongoDB connection tested</li>
      <li>🔄 Ready for Phase 1, Step 1.2</li>
    </ul>
  </body>
</html>
```

#### 8. Test the Setup
```bash
npm run dev
```

Visit `http://localhost:4321` and verify:
- Page loads without errors
- Database connection status shows "Connected successfully!"
- No console errors in browser

### ✅ Testing Checklist

- [ ] Astro project starts without errors
- [ ] MongoDB connection works
- [ ] Environment variables are loaded
- [ ] Basic page renders correctly
- [ ] No console errors or warnings

### 🚨 Common Issues & Solutions

#### Issue: MongoDB Connection Failed
**Solution**: 
1. Verify MongoDB is running: `brew services start mongodb/brew/mongodb-community`
2. Check connection string in `.env`
3. Ensure database name doesn't have spaces

#### Issue: Module Import Errors
**Solution**:
1. Verify all dependencies installed: `npm install`
2. Check Node.js version: `node --version` (should be 18+)
3. Clear node_modules and reinstall if needed

#### Issue: Environment Variables Not Loading
**Solution**:
1. Verify `.env` file is in project root
2. Restart the development server
3. Use `import.meta.env.VARIABLE_NAME` in Astro components

### 📝 Environment Setup Complete!

Once all tests pass, you're ready to move to **Phase 1, Step 1.2: Database Connection**.

### Files Created:
- `astro.config.mjs` - Astro configuration
- `.env` - Environment variables
- `src/lib/mongodb.js` - Database connection utility
- `src/pages/index.astro` - Test page

### Next File to Create:
- `02-DATABASE-SCHEMA.md` - Database collections and structure
