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
