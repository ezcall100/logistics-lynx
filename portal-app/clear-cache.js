// Clear browser cache and force refresh
console.log('🔄 Clearing cache and forcing refresh...');

// Clear localStorage
localStorage.clear();

// Clear sessionStorage
sessionStorage.clear();

// Force reload with cache bypass
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (let name of names) {
      caches.delete(name);
    }
  });
}

// Add timestamp to force refresh
const timestamp = new Date().getTime();
const links = document.querySelectorAll('link[rel="stylesheet"]');
links.forEach(link => {
  const href = link.href;
  if (href.includes('?')) {
    link.href = href.split('?')[0] + '?v=' + timestamp;
  } else {
    link.href = href + '?v=' + timestamp;
  }
});

console.log('✅ Cache cleared! New design should now be visible.');
