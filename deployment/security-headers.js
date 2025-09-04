// Security Headers Configuration for Trans Bot AI Production
// Use this with your hosting platform (Vercel, Netlify, AWS, etc.)

// Vercel Configuration (vercel.json)
const vercelConfig = {
  headers: [
    {
      source: "/(.*)",
      headers: [
        // Content Security Policy
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
            "frame-src 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests"
          ].join("; ")
        },
        // Security Headers
        {
          key: "X-Frame-Options",
          value: "DENY"
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff"
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin"
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=()"
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block"
        },
        // Performance & Caching
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    },
    // Specific routes with different headers
    {
      source: "/api/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
};

// Netlify Configuration (_headers)
const netlifyHeaders = `
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  X-XSS-Protection: 1; mode=block
  Cache-Control: public, max-age=31536000, immutable

/api/*
  Cache-Control: no-cache, no-store, must-revalidate
`;

// AWS CloudFront Configuration
const cloudFrontConfig = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join("; "),
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload"
};

// Cookie Security Configuration
const cookieConfig = {
  // Production cookie settings
  secure: true,
  httpOnly: true,
  sameSite: 'Lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  domain: '.transbot.ai',
  
  // Cookie prefixes for security
  prefixes: {
    session: '__Host-', // Secure, HTTPS only, same site
    analytics: '__Secure-', // Secure, HTTPS only
    preferences: '__Host-' // Secure, HTTPS only, same site
  }
};

// Environment-specific configurations
const getSecurityConfig = (environment = 'production') => {
  const baseConfig = {
    csp: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com"
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com"
      ],
      'font-src': [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      'img-src': [
        "'self'",
        "data:",
        "https:",
        "blob:"
      ],
      'connect-src': [
        "'self'",
        "https://www.google-analytics.com",
        "https://analytics.google.com"
      ],
      'frame-src': ["'none'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'upgrade-insecure-requests': []
    }
  };

  if (environment === 'development') {
    // Relaxed CSP for development
    baseConfig.csp['script-src'].push("'unsafe-eval'");
    baseConfig.csp['style-src'].push("'unsafe-inline'");
  }

  return baseConfig;
};

// Export configurations
module.exports = {
  vercelConfig,
  netlifyHeaders,
  cloudFrontConfig,
  cookieConfig,
  getSecurityConfig
};

// Usage Examples:

// 1. Vercel: Create vercel.json in project root
// 2. Netlify: Create _headers file in public directory
// 3. AWS: Use cloudFrontConfig in CloudFront distribution
// 4. Custom server: Apply headers in your server configuration

console.log('Security Headers Configuration Ready for Production Deployment!');
console.log('Choose your platform configuration and deploy with enterprise-grade security.');
