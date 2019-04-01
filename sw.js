const CACHE_NAME = 'xilaraux-cache-v1';

// TODO: Cache only files here and provide cache for GIPHY images.
const urlsToCache = [
  '/src/main.css',
  '/assets/robot-128.png',
  '/assets/robot-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(async () => {
    const cache = await caches.open(CACHE_NAME);

    try {
      await cache.addAll(urlsToCache);
    } catch (e) {
      console.group('SW.js:: Install');
      console.log('Failed to fetch.');
      console.log(e);
      console.groupEnd();
    }
  });
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;

      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});
