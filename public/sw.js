// This is a basic service worker.

self.addEventListener('install', (event) => {
  // Perform install steps
  console.log('Service Worker installing.');
});

self.addEventListener('fetch', (event) => {
  // This is a simple pass-through fetch handler.
  // A more complex app would have caching strategies here.
  event.respondWith(fetch(event.request));
});
