var CACHE_NAME = 'my-site-cache-v10';
var urlsToCache = [
  '/',
  'favicons/android-chrome-192x192.png',
  'favicons/android-chrome-256x256.png',
  'favicons/favicon.ico',
  'favicons/manifest.json',
  'img/banana.jpg',
  'page2.html',
  'index.html',
  'index.css',
  'index.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// CACHE AND UPDATE FETCH
// self.addEventListener('fetch', event => {
//   if (event.request.method != 'GET') return;
//   const { request } = event;
//
//   event.respondWith(caches.open(CACHE_NAME)
//     .then(cache => cache.match(request))
//     .then(matching => matching || fetch(request)));
//
//   event.waitUntil(caches.open(CACHE_NAME)
//     .then(cache => fetch(request)
//       .then(response => cache.put(request, response))));
// });

// CACHE FIRST STRATEGY FETCH
self.addEventListener('fetch', event => {
  const { request } = event;
  const findResponsePromise = caches.open(CACHE_NAME)
    .then(cache => cache.match(request))
    .then(response => {
      if (response) {
        console.log("returning fetch response");
        return response;
      }

      return fetch(request);
    });

  event.respondWith(findResponsePromise);
});
