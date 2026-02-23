// Service worker minimo - evita errori su richieste POST
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
