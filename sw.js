/**
 * MTs YASUA Pilangwetan — Progressive Web App (PWA) Service Worker
 * Multi-Tier Caching Architecture & Offline-First Data Resilience Engine
 * Version: 2.0.0
 */

const SHELL_CACHE_NAME = 'mts-yasua-shell-v2.3';
const DATA_CACHE_NAME = 'mts-yasua-data-v2.3';
const OFFLINE_URL = 'offline.html';

// Critical core assets to pre-cache on install (App Shell)
const PRECACHE_ASSETS = [
  './',
  '/',
  '/app',
  'app.html',
  'app.min.css',
  'site.min.css',
  'index.html',
  'profil.html',
  'sambutan.html',
  'guru.html',
  'mou.html',
  'program.html',
  'ekskul.html',
  'kalender.html',
  'agenda.html',
  'prestasi.html',
  'alumni.html',
  'berita.html',
  'galeri.html',
  'kontak.html',
  'ppdb.html',
  'offline.html',
  'search.js',
  'pwa.js',
  'manifest.webmanifest',
  'logo.png',
  'logo.webp',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable.png',
  'apple-touch-icon.png',
  'foto-gedung.webp',
  'kepala-madrasah.webp',
  'poster_pts_berita.webp',
  'guru_1.webp',
  'guru_2.webp',
  'guru_3.webp',
  'guru_4.webp',
  'guru_5.webp',
  'guru_6.webp',
  'banner_1.jpg',
  'banner_2.jpg',
  'banner_3.jpg'
];

// Domains eligible for Tier 2: Stale-While-Revalidate Data & Cloud Image Caching
const DATA_DOMAINS = [
  'script.google.com',
  'lh3.googleusercontent.com',
  'drive.google.com',
  'api.qrserver.com',
  'images.unsplash.com'
];

// 1. Install Event: pre-cache static application shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(SHELL_CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[PWA ServiceWorker] Failed to precache shell asset:', url, err);
          })
        )
      );
    })
  );
});

// 2. Activate Event: purge legacy caches & claim clients immediately
self.addEventListener('activate', (event) => {
  const allowedCaches = [SHELL_CACHE_NAME, DATA_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!allowedCaches.includes(name)) {
            console.log('[PWA ServiceWorker] Purging legacy cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Multi-Tier Architecture
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET and non-HTTP requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // TIER 3: Admin portal & mutations — Network-First, Never cache admin sensitive data
  if (url.pathname.includes('/admin') || url.pathname.includes('admin.html')) {
    event.respondWith(
      fetch(request).catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        return caches.match(OFFLINE_URL);
      })
    );
    return;
  }

  // TIER 1A: HTML Navigation Requests — Network-First with Offline Fallback
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(SHELL_CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          // Fallback to exact cached page if available
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          // Fallback to app shell
          const appShell = await caches.match('/app');
          if (appShell) return appShell;

          // Fallback to offline fallback page
          const offlinePage = await caches.match(OFFLINE_URL);
          if (offlinePage) return offlinePage;

          return new Response(
            '<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:2rem;"><h1>MTs YASUA Offline</h1><p>Koneksi internet Anda terputus.</p></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // TIER 2: Public Data APIs & Cloud Images — Stale-While-Revalidate
  const isDataOrCloudMedia = DATA_DOMAINS.some((domain) => url.hostname.includes(domain));
  if (isDataOrCloudMedia) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(async (dataCache) => {
        const cachedResponse = await dataCache.match(request);

        const networkFetchPromise = fetch(request)
          .then((networkResponse) => {
            // Cache valid 200 responses and opaque responses (cross-origin cloud media)
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              dataCache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch((err) => {
            // Network failure: if no cache, pass error
            if (!cachedResponse) {
              console.warn('[PWA ServiceWorker] Data fetch failed and no cache available:', request.url, err);
            }
            return null;
          });

        // Return cached response immediately if present; otherwise await network
        if (cachedResponse) {
          // Trigger network fetch in background to revalidate
          event.waitUntil(networkFetchPromise);
          return cachedResponse;
        }

        const networkResponse = await networkFetchPromise;
        if (networkResponse) {
          return networkResponse;
        }

        // Neither cache nor network succeeded
        return new Response('{"status":"offline","message":"Data unavailable offline"}', {
          headers: { 'Content-Type': 'application/json' },
          status: 503
        });
      })
    );
    return;
  }

  // TIER 1B: Static Assets (CSS, JS, Fonts, Local Images) — Pure Cache-First (CDN Quota Saver)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // 1. Direct Cache-Hit: return immediately, zero network overhead
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Cache-Miss: fetch from network and store in cache for future offline / pure cache-hit
      return fetch(request).then((response) => {
        if (!response || (response.status !== 200 && response.type !== 'opaque')) {
          return response;
        }
        if (
          url.origin === self.location.origin ||
          url.hostname.includes('fonts.googleapis.com') ||
          url.hostname.includes('fonts.gstatic.com') ||
          url.hostname.includes('unpkg.com')
        ) {
          const responseToCache = response.clone();
          caches.open(SHELL_CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});
