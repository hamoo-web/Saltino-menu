const CACHE_NAME = 'saltino-v4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './logo.jpg',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;900&display=swap',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/css/all.min.css'
];

// 1. Merged Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forces the update immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Saltino: Files cached successfully');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: Cleanup old versions globally
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event: Serve the latest saved files
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
