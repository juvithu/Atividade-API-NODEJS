const CACHE_NAME = 'produtos-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/index.html',
  '/main.js',
  '/styles.css'
];

self.addEventListener('install', function(event) {
  // Instala o Service Worker e adiciona os arquivos ao cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Busca os arquivos em cache ou na rede
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
