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
