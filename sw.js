const CACHE_NAME = 'samsung-music-v1';
// Liste des fichiers à enregistrer pour le mode hors-ligne
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './manifest.json'
];

// Installation : on met les fichiers en cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation : on nettoie les vieux caches si besoin
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Stratégie : Réseau d'abord, sinon Cache (pour le hors-ligne)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});