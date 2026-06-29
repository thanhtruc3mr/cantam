const CACHE_NAME = 'rim-face-v6';
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
  self.skipWaiting(); // Ép service worker mới cài đặt ngay lập tức
});

// Xóa cache cũ khi có phiên bản mới
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Xóa các bản v1, v2, v3, v4 cũ
          }
        })
      );
    })
  );
});

// Trả về file từ cache hoặc tải mới từ mạng
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
