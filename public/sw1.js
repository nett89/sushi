var urlsToCache_ = [
  '/',
  '/stylesheets/main.css',
  '/images/sushi.svg',
  '/images/pin.svg',
  '/images/star.svg',
  '/images/direction.svg',
  '/javascripts/main2.js'
];

version = 'v2';

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Installed version', version);
  event.waitUntil(
    caches.open('sushi-v2')
      .then(function(cache) {
      console.log("opened cache");
      return cache.addAll(urlsToCache_);
    })
  );
});

// self.addEventListener('fetch', function(event){
//   event.respondWith(
//     caches.match(event.request)
//     .then(function(response){
//       if(response) {
//         return response;
//       }
//       return fetch(event.request);
//     }).catch(function(response){
//
//     }
//   );
// });

//
// self.addEventListener('fetch', function(event) {
//
//   console.log('Handling fetch event for', event.request.url);
//
//   event.respondWith(
//
//
//     caches.match(event.request).then(function(response) {
//
//       if (response) {
//         console.log('Found response in cache:', response);
//
//         return response;
//       }
//
//       console.log('No response found in cache. About to fetch from network...');
//
//       return fetch(event.request).then(function(response) {
//         console.log('Response from network is:', response);
//
//         return response;
//       }).catch(function(error) {
//         console.error('Fetching failed:', error);
//
//         throw error;
//       });
//     })
//   );
// });
//
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});


self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['sushi-v2'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if ('sushi-v2' && cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleted old cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});