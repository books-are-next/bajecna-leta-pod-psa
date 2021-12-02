/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-08ab447';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./bajecna_leta_pod_psa_006.html","./bajecna_leta_pod_psa_007.html","./bajecna_leta_pod_psa_008.html","./bajecna_leta_pod_psa_009.html","./bajecna_leta_pod_psa_010.html","./bajecna_leta_pod_psa_011.html","./bajecna_leta_pod_psa_012.html","./bajecna_leta_pod_psa_013.html","./bajecna_leta_pod_psa_014.html","./bajecna_leta_pod_psa_015.html","./bajecna_leta_pod_psa_016.html","./bajecna_leta_pod_psa_017.html","./bajecna_leta_pod_psa_018.html","./bajecna_leta_pod_psa_019.html","./bajecna_leta_pod_psa_020.html","./bajecna_leta_pod_psa_021.html","./bajecna_leta_pod_psa_022.html","./bajecna_leta_pod_psa_023.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_bajecna_leta_s_k_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./template-images/circles.png","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
