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
