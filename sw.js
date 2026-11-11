const CACHE_NAME = 'tyger-cache-v3';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Отдаем из кэша (офлайн)
        }
        return fetch(event.request); // Или качаем из сети
      })
  );
});

