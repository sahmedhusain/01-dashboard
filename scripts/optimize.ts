#!/usr/bin/env node

/**
 * Production Optimization Script
 * Performs various optimizations for production deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Starting production optimization...\n');

/**
 * Check if dist directory exists
 */
function checkDistDirectory() {
  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }
  console.log('✅ Dist directory found');
}

/**
 * Analyze bundle sizes
 */
function analyzeBundleSizes() {
  console.log('\n📊 Analyzing bundle sizes...');
  
  const jsFiles = [];
  const cssFiles = [];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else {
        const size = stat.size;
        const relativePath = path.relative(distDir, filePath);
        
        if (file.endsWith('.js')) {
          jsFiles.push({ path: relativePath, size });
        } else if (file.endsWith('.css')) {
          cssFiles.push({ path: relativePath, size });
        }
      }
    });
  }
  
  scanDirectory(distDir);
  
  // Sort by size (largest first)
  jsFiles.sort((a, b) => b.size - a.size);
  cssFiles.sort((a, b) => b.size - a.size);
  
  console.log('\n📦 JavaScript bundles:');
  jsFiles.forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(2);
    const status = file.size > 500000 ? '⚠️' : '✅';
    console.log(`  ${status} ${file.path}: ${sizeKB} KB`);
  });
  
  console.log('\n🎨 CSS bundles:');
  cssFiles.forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(2);
    console.log(`  ✅ ${file.path}: ${sizeKB} KB`);
  });
  
  const totalJS = jsFiles.reduce((sum, file) => sum + file.size, 0);
  const totalCSS = cssFiles.reduce((sum, file) => sum + file.size, 0);
  const totalSize = totalJS + totalCSS;
  
  console.log(`\n📈 Total bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
  
  if (totalSize > 2000000) { // 2MB
    console.log('⚠️  Bundle size exceeds recommended limit (2MB)');
  } else {
    console.log('✅ Bundle size is within recommended limits');
  }
}

/**
 * Generate service worker
 */
function generateServiceWorker() {
  console.log('\n🔧 Generating service worker...');
  
  const swContent = `
// Service Worker for GraphQL Student Dashboard
const CACHE_NAME = 'student-dashboard-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
`;
  
  fs.writeFileSync(path.join(distDir, 'sw.js'), swContent.trim());
  console.log('✅ Service worker generated');
}

/**
 * Generate manifest.json
 */
function generateManifest() {
  console.log('\n📱 Generating PWA manifest...');
  
  const manifest = {
    name: 'GraphQL Student Dashboard',
    short_name: 'Dashboard',
    description: 'Professional student analytics dashboard',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#14b8a6',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
  
  fs.writeFileSync(
    path.join(distDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✅ PWA manifest generated');
}

/**
 * Generate robots.txt
 */
function generateRobotsTxt() {
  console.log('\n🤖 Generating robots.txt...');
  
  const robotsContent = `User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
`;
  
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
  console.log('✅ robots.txt generated');
}

/**
 * Generate security.txt
 */
function generateSecurityTxt() {
  console.log('\n🔒 Generating security.txt...');
  
  const securityContent = `Contact: security@your-domain.com
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: https://your-domain.com/.well-known/security.txt
`;
  
  const wellKnownDir = path.join(distDir, '.well-known');
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir);
  }
  
  fs.writeFileSync(path.join(wellKnownDir, 'security.txt'), securityContent);
  console.log('✅ security.txt generated');
}

/**
 * Optimize HTML files
 */
function optimizeHtml() {
  console.log('\n🔧 Optimizing HTML files...');
  
  const htmlFiles = [];
  
  function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    });
  }
  
  findHtmlFiles(distDir);
  
  htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add security headers meta tags
    const securityMeta = `
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta name="referrer" content="strict-origin-when-cross-origin">`;
    
    // Add PWA meta tags
    const pwaMeta = `
    <meta name="theme-color" content="#14b8a6">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="manifest" href="/manifest.json">`;
    
    // Insert meta tags before closing head tag
    content = content.replace('</head>', `${securityMeta}${pwaMeta}\n  </head>`);
    
    // Add service worker registration
    const swScript = `
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    </script>`;
    
    content = content.replace('</body>', `${swScript}\n  </body>`);
    
    fs.writeFileSync(filePath, content);
  });
  
  console.log(`✅ Optimized ${htmlFiles.length} HTML file(s)`);
}

/**
 * Generate deployment report
 */
function generateDeploymentReport() {
  console.log('\n📋 Generating deployment report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'production',
    buildSize: {},
    optimizations: [
      'Bundle analysis completed',
      'Service worker generated',
      'PWA manifest created',
      'HTML files optimized',
      'Security headers added',
      'robots.txt generated'
    ]
  };
  
  // Calculate build size
  function calculateSize(dir) {
    let totalSize = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        totalSize += calculateSize(filePath);
      } else {
        totalSize += stat.size;
      }
    });
    
    return totalSize;
  }
  
  const totalSize = calculateSize(distDir);
  report.buildSize = {
    total: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
    totalBytes: totalSize
  };
  
  fs.writeFileSync(
    path.join(distDir, 'deployment-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('✅ Deployment report generated');
  console.log(`📊 Total build size: ${report.buildSize.total}`);
}

/**
 * Main optimization function
 */
async function optimize() {
  try {
    checkDistDirectory();
    analyzeBundleSizes();
    generateServiceWorker();
    generateManifest();
    generateRobotsTxt();
    generateSecurityTxt();
    optimizeHtml();
    generateDeploymentReport();
    
    console.log('\n🎉 Production optimization completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('  1. Review the deployment report in dist/deployment-report.json');
    console.log('  2. Test the build with: npm run preview');
    console.log('  3. Deploy using: npm run deploy:netlify or npm run deploy:vercel');
    
  } catch (error) {
    console.error('\n❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

// Run optimization
optimize();
