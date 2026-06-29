const CACHE_NAME = 'rim-face-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './sw.js'
];

// Cài đặt Service Worker và lưu cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Trả về file từ cache nếu không có mạng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Trả về bản offline
        }
        return fetch(event.request); // Tải từ mạng nếu chưa có cache
      })
  );
});