# 🔐 Authentication System

## PHASE 1, STEP 1.3: SIMPLE ADMIN AUTHENTICATION

### Overview
Simple, secure authentication system using:
- Cookie-based sessions
- Environment variable credentials
- URL-based access key fallback
- Session timeout management

---

## 🛡️ Authentication Strategy

### Method 1: Environment-Based Login (Primary)
- Email/password stored in environment variables
- Cookie-based session management
- 24-hour session timeout

### Method 2: Access Key (Secondary)
- Simple key-based access via URL parameter
- Useful for quick access and sharing
- Auto-sets session cookie

---

## 🔧 Implementation Files

### 1. Authentication Utilities
Create `src/lib/auth.js`:
```javascript
// Authentication utilities
export const AUTH_CONFIG = {
  SESSION_COOKIE_NAME: 'biyu_admin_session',
  ACCESS_KEY_PARAM: 'key',
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  ADMIN_EMAIL: import.meta.env.ADMIN_EMAIL || 'admin@biyuboxing.com',
  ADMIN_PASSWORD: import.meta.env.ADMIN_PASSWORD || 'admin123',
  ADMIN_KEY: import.meta.env.ADMIN_KEY || 'admin123'
};

// Validate credentials
export function validateCredentials(email, password) {
  return email === AUTH_CONFIG.ADMIN_EMAIL && password === AUTH_CONFIG.ADMIN_PASSWORD;
}

// Validate access key
export function validateAccessKey(key) {
  return key === AUTH_CONFIG.ADMIN_KEY;
}

// Create session data
export function createSessionData() {
  return {
    email: AUTH_CONFIG.ADMIN_EMAIL,
    loginTime: new Date().toISOString(),
    expiresAt: new Date(Date.now() + AUTH_CONFIG.SESSION_DURATION).toISOString()
  };
}

// Validate session
export function validateSession(sessionData) {
  try {
    const session = typeof sessionData === 'string' ? JSON.parse(sessionData) : sessionData;
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    
    return session.email === AUTH_CONFIG.ADMIN_EMAIL && now < expiresAt;
  } catch (error) {
    return false;
  }
}

// Check if user is authenticated
export function isAuthenticated(request) {
  const url = new URL(request.url);
  const accessKey = url.searchParams.get(AUTH_CONFIG.ACCESS_KEY_PARAM);
  
  // Check access key first
  if (accessKey && validateAccessKey(accessKey)) {
    return { authenticated: true, method: 'key', key: accessKey };
  }
  
  // Check session cookie
  const cookies = parseCookies(request.headers.get('cookie') || '');
  const sessionData = cookies[AUTH_CONFIG.SESSION_COOKIE_NAME];
  
  if (sessionData && validateSession(sessionData)) {
    return { authenticated: true, method: 'session' };
  }
  
  return { authenticated: false };
}

// Parse cookies helper
function parseCookies(cookieString) {
  const cookies = {};
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  return cookies;
}

// Set session cookie
export function setSessionCookie(response, sessionData) {
  const cookieValue = JSON.stringify(sessionData);
  const expires = new Date(Date.now() + AUTH_CONFIG.SESSION_DURATION).toUTCString();
  
  response.headers.set('Set-Cookie', 
    `${AUTH_CONFIG.SESSION_COOKIE_NAME}=${encodeURIComponent(cookieValue)}; ` +
    `Expires=${expires}; Path=/; HttpOnly; SameSite=Lax`
  );
}

// Clear session cookie
export function clearSessionCookie(response) {
  response.headers.set('Set-Cookie', 
    `${AUTH_CONFIG.SESSION_COOKIE_NAME}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
  );
}
```

### 2. Auth Middleware
Create `src/lib/auth-middleware.js`:
```javascript
import { isAuthenticated } from './auth.js';

// Protect admin routes
export function requireAuth(request) {
  const authResult = isAuthenticated(request);
  
  if (!authResult.authenticated) {
    const url = new URL(request.url);
    const redirectUrl = `/admin/login?redirect=${encodeURIComponent(url.pathname)}`;
    return { 
      authenticated: false, 
      redirectTo: redirectUrl 
    };
  }
  
  return { 
    authenticated: true, 
    method: authResult.method,
    key: authResult.key 
  };
}

// Check auth in Astro components
export function checkAuth(Astro) {
  const authResult = requireAuth(Astro.request);
  
  if (!authResult.authenticated) {
    return Astro.redirect(authResult.redirectTo);
  }
  
  return authResult;
}
```

### 3. Login Page
Create `src/pages/admin/login.astro`:
```astro
---
import { validateCredentials, createSessionData, setSessionCookie } from '../../lib/auth.js';

let error = null;
let success = false;

// Handle form submission
if (Astro.request.method === 'POST') {
  try {
    const formData = await Astro.request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const redirect = formData.get('redirect')?.toString() || '/admin/dashboard';
    
    if (validateCredentials(email, password)) {
      const sessionData = createSessionData();
      const response = new Response(null, {
        status: 302,
        headers: {
          'Location': redirect
        }
      });
      
      setSessionCookie(response, sessionData);
      return response;
    } else {
      error = 'Invalid email or password';
    }
  } catch (err) {
    console.error('Login error:', err);
    error = 'An error occurred. Please try again.';
  }
}

// Get redirect URL from query params
const url = new URL(Astro.request.url);
const redirectUrl = url.searchParams.get('redirect') || '/admin/dashboard';
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login - BiYu Boxing</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .login-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .login-header h1 {
      color: #23282d;
      margin-bottom: 0.5rem;
      font-size: 1.8rem;
    }

    .login-header p {
      color: #666;
      font-size: 0.9rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #374151;
    }

    .form-input {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .login-btn {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      margin-top: 0.5rem;
    }

    .login-btn:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }

    .login-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
    }

    .error-message {
      background: #fef2f2;
      color: #dc2626;
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid #fecaca;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .demo-info {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      color: #0369a1;
      padding: 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-top: 1.5rem;
      text-align: center;
    }

    .back-link {
      text-align: center;
      margin-top: 2rem;
    }

    .back-link a {
      color: #3b82f6;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .back-link a:hover {
      text-decoration: underline;
    }

    .quick-access {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      text-align: center;
    }

    .quick-access p {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: #666;
    }

    .quick-access a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="login-header">
      <div class="logo">🥊</div>
      <h1>BiYu Boxing</h1>
      <p>Admin Dashboard Access</p>
    </div>

    {error && (
      <div class="error-message">
        <span>❌</span>
        {error}
      </div>
    )}

    <form method="POST" class="login-form">
      <input type="hidden" name="redirect" value={redirectUrl} />
      
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          class="form-input"
          placeholder="Enter admin email"
          required
          autocomplete="email"
        />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          class="form-input"
          placeholder="Enter password"
          required
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="login-btn" id="loginBtn">
        Sign In
      </button>
    </form>

    <div class="demo-info">
      <strong>Default Login:</strong><br>
      Email: admin@biyuboxing.com<br>
      Password: admin123
    </div>

    <div class="quick-access">
      <p>Or use quick access:</p>
      <a href="/admin/dashboard?key=admin123">
        Access with Key →
      </a>
    </div>

    <div class="back-link">
      <a href="/">← Back to Website</a>
    </div>
  </div>

  <script>
    // Auto-focus email field
    document.getElementById('email').focus();

    // Handle form submission
    document.querySelector('.login-form').addEventListener('submit', function() {
      const btn = document.getElementById('loginBtn');
      btn.textContent = 'Signing in...';
      btn.disabled = true;
    });
  </script>
</body>
</html>
```

### 4. Logout Handler
Create `src/pages/api/auth/logout.js`:
```javascript
import { clearSessionCookie } from '../../../lib/auth.js';

export async function POST({ request }) {
  try {
    const response = new Response(JSON.stringify({ 
      success: true, 
      message: 'Logged out successfully' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    clearSessionCookie(response);
    return response;
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Logout failed' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function GET({ request }) {
  // Handle logout via GET (for logout links)
  const response = new Response(null, {
    status: 302,
    headers: {
      'Location': '/admin/login'
    }
  });
  
  clearSessionCookie(response);
  return response;
}
```

### 5. Auth Test Page
Create `src/pages/admin/auth-test.astro`:
```astro
---
import { checkAuth } from '../../lib/auth-middleware.js';

// Check authentication
const authResult = checkAuth(Astro);
---

<!DOCTYPE html>
<html>
<head>
  <title>Auth Test - BiYu Boxing Admin</title>
  <style>
    body { 
      font-family: system-ui; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 2rem; 
    }
    .success { color: green; }
    .info { background: #e7f3ff; padding: 1rem; border-radius: 4px; }
    .btn { 
      background: #dc3545; 
      color: white; 
      padding: 0.5rem 1rem; 
      text-decoration: none; 
      border-radius: 4px; 
      display: inline-block; 
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <h1>🔐 Authentication Test</h1>
  
  <div class="info">
    <h2>✅ Authentication Successful!</h2>
    <p><strong>Method:</strong> {authResult.method}</p>
    {authResult.key && <p><strong>Access Key:</strong> {authResult.key}</p>}
    <p><strong>Time:</strong> {new Date().toLocaleString()}</p>
  </div>
  
  <h3>Test Actions:</h3>
  <ul>
    <li><a href="/admin/dashboard">Go to Dashboard</a></li>
    <li><a href="/admin/login">Login Page</a></li>
    <li><a href="/api/auth/logout" class="btn">Logout</a></li>
  </ul>
  
  <h3>Quick Access URLs:</h3>
  <ul>
    <li><a href="/admin/dashboard?key=admin123">Dashboard with Key</a></li>
    <li><a href="/admin/news?key=admin123">News with Key</a></li>
  </ul>
  
</body>
</html>
```

---

## 🛡️ Security Considerations

### Environment Variables Security
```bash
# .env (NEVER commit to git)
ADMIN_EMAIL=your-secure-email@domain.com
ADMIN_PASSWORD=your-very-secure-password-here
ADMIN_KEY=your-unique-access-key-123

# For production
NODE_ENV=production
```

### Production Security Enhancements
1. **HTTPS Only**: Force HTTPS in production
2. **Strong Passwords**: Use complex passwords
3. **Session Security**: Implement CSRF protection
4. **Rate Limiting**: Prevent brute force attacks
5. **IP Restrictions**: Limit admin access to specific IPs

### Enhanced Security (Future)
```javascript
// src/lib/enhanced-auth.js (for future implementation)
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Password hashing
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// JWT tokens
export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
```

---

## 🧪 Authentication Testing

### Test Scenarios

#### 1. Login Flow Test
```bash
# Test login page loads
curl http://localhost:4321/admin/login

# Test login with correct credentials
curl -X POST http://localhost:4321/admin/login \
  -d "email=admin@biyuboxing.com&password=admin123"

# Test login with wrong credentials
curl -X POST http://localhost:4321/admin/login \
  -d "email=wrong@example.com&password=wrong"
```

#### 2. Access Key Test
```bash
# Test access with key
curl http://localhost:4321/admin/auth-test?key=admin123

# Test access without key
curl http://localhost:4321/admin/auth-test
```

#### 3. Session Test
```bash
# Test session persistence
# 1. Login via browser
# 2. Close browser
# 3. Reopen and visit admin page
# 4. Should still be logged in
```

---

## ✅ Authentication Testing Checklist

### Basic Functionality:
- [ ] Login page loads without errors
- [ ] Can login with correct email/password
- [ ] Cannot login with wrong credentials
- [ ] Access key authentication works
- [ ] Session persists across browser sessions
- [ ] Logout clears session
- [ ] Redirects work after login

### Security Tests:
- [ ] Cannot access admin pages without auth
- [ ] Session expires after 24 hours
- [ ] Cookies are HttpOnly and Secure
- [ ] XSS protection in login form
- [ ] CSRF protection (basic)

### User Experience:
- [ ] Login form is user-friendly
- [ ] Error messages are clear
- [ ] Quick access key method works
- [ ] Mobile-responsive login page
- [ ] Auto-focus on email field

---

## 📝 Authentication Complete!

Once all authentication tests pass, you're ready for **Phase 2, Step 2.1: Admin Layout System**.

### Files Created:
- `src/lib/auth.js` - Core authentication utilities
- `src/lib/auth-middleware.js` - Auth middleware functions
- `src/pages/admin/login.astro` - Login page
- `src/pages/api/auth/logout.js` - Logout handler
- `src/pages/admin/auth-test.astro` - Authentication testing

### Authentication Features:
- ✅ Email/password login
- ✅ Access key authentication  
- ✅ Cookie-based sessions
- ✅ Session timeout (24 hours)
- ✅ Logout functionality
- ✅ Route protection
- ✅ Mobile-friendly login
