---
name: multiplatform-pwa-architect
description: Architectural and engineering standards for building multi-platform monorepo projects combining responsive public websites, secure role-based admin portals (RBAC), and offline-first Progressive Web Apps (PWA). Use this skill when designing, building, or refactoring monorepo structure, PWA caching mechanisms, admin security boundaries, responsive UI layouts, and cross-platform shared libraries.
---

# Multi-Platform PWA & Monorepo Architect

This skill provides comprehensive architectural patterns, security guardrails, design ergonomics, and implementation workflows for modern web platforms that serve three distinct user surfaces from a single codebase or synchronized workspace:
1. **Public Responsive Web**: High-performance, SEO-optimized, mobile-first public experience.
2. **Admin Portal**: Secure, authenticated data-management interface with granular Role-Based Access Control (RBAC) and desktop/tablet/mobile ergonomics.
3. **Progressive Web App (PWA)**: Installable, offline-first native-like application with Service Worker lifecycle caching and background synchronization.

---

## 1. Monorepo Architecture & Directory Structure

To ensure zero code duplication, fast compilation, and clean separation of concerns, follow this standardized monorepo workspace structure:

```
monorepo-root/
├── apps/
│   ├── web/                  # Public web surface (SEO, fast TTFB, marketing, public catalog)
│   ├── admin/                # Admin Portal surface (Dashboard, tables, analytics, settings)
│   └── pwa-shell/            # (Optional standalone PWA or unified within apps/web)
│
├── packages/
│   ├── shared-ui/            # Reusable UI component library (design tokens, primitives)
│   │   ├── src/components/   # Buttons, Modals, Drawers, Inputs, Badges, Skeletons
│   │   ├── src/layouts/      # Shell layouts, Navbar, BottomNav, Header
│   │   └── src/tokens/       # Colors, Typography, Spacing, Shadows, Breakpoints
│   │
│   ├── api-client/           # Unified API SDK & data synchronization engine
│   │   ├── src/client.ts     # HTTP client with interceptors & auth headers
│   │   ├── src/offline/      # IndexedDB / LocalStorage queue & sync engine
│   │   └── src/endpoints/    # Resource endpoints (CRUD definitions)
│   │
│   ├── types/                # Domain models, TypeScript interfaces, and Zod schemas
│   │   ├── src/auth.ts       # Roles, Permissions, User profiles, Session tokens
│   │   ├── src/entities/     # Core domain entities (e.g., Records, Articles, Forms)
│   │   └── src/api.ts        # Request/Response DTOs, API error structures
│   │
│   ├── config/               # Shared tooling configurations
│   │   ├── tailwind/         # Tailwind preset config (colors, breakpoints, plugins)
│   │   ├── typescript/       # tsconfig base presets
│   │   └── eslint/           # Linting and formatting rules
│   │
│   └── utils/                # Cross-cutting utility functions
│       ├── src/formatters/   # Currency, Dates, Phone numbers, Text truncators
│       ├── src/crypto/       # Hash, token decoding, Base64 helpers
│       └── src/media/        # Client-side image compressor, file validators
│
└── public/
    ├── manifest.json         # Web App Manifest
    ├── sw.js                 # Service Worker script
    └── icons/                # Multi-resolution PWA icons (192, 512, maskable)
```

### Dependency Rules:
- **Strict One-Way Dependency**: `apps/*` can import from `packages/*`. `packages/*` **must never** import from `apps/*`.
- **Domain Independence**: `packages/types` and `packages/utils` must be pure TypeScript/JavaScript without framework or DOM dependencies.
- **Shared UI Separation**: Components in `packages/shared-ui` must be stateless or controlled; application business logic belongs in the respective app or `packages/api-client`.

---

## 2. Design System & Responsive Standards

All interfaces must provide a seamless experience across desktop monitors (1920px+), laptops (1280px–1440px), tablets (768px–1024px), and mobile devices (360px–430px).

### 2.1 Breakpoint System
```css
/* Standard Breakpoint Tokens */
--screen-xs: 360px;   /* Small phones */
--screen-sm: 640px;   /* Large phones / Phablets */
--screen-md: 768px;   /* Tablets (Portrait) */
--screen-lg: 1024px;  /* Tablets (Landscape) / Small Laptops */
--screen-xl: 1280px;  /* Desktop Laptops */
--screen-2xl: 1536px; /* High-res Monitors */
```

### 2.2 Mobile-First Implementation Rules
1. **Touch Target Ergonomics**:
   - All interactive elements (buttons, nav links, icon actions, select triggers) **must** have a minimum touch target of `44x44px` (recommended `48x48px`).
   - Add adequate touch spacing (`min-gap: 8px`) between adjacent icon buttons to prevent accidental taps.
2. **Safe Area Insets (Mobile Notches & Home Bars)**:
   ```css
   /* Safe areas for iOS Home Bar and Android Display Cutouts */
   padding-top: env(safe-area-inset-top, 0px);
   padding-bottom: env(safe-area-inset-bottom, 16px);
   padding-left: env(safe-area-inset-left, 0px);
   padding-right: env(safe-area-inset-right, 0px);
   ```
3. **No Horizontal Viewport Overflow**:
   - Enforce `max-width: 100vw; overflow-x: hidden;` on body/shell wrappers.
   - Long strings, emails, and IDs must use `word-break: break-word;` or `text-overflow: ellipsis;`.
4. **Fluid Typography & Adaptive Spacing**:
   - Use `clamp()` or Tailwind responsive font scaling (`text-sm sm:text-base lg:text-lg`).
   - Modals and popups must transform into **Bottom Sheets** on viewports `< 768px` for ergonomic one-handed thumb interaction.

### 2.3 Data Table Ergonomics on Mobile & Tablet
Tables with 4+ columns break on mobile screens. Choose one of two responsive table patterns:
- **Pattern A: Card Stack Transformation (`< 768px`)**:
  Using CSS Grid or Flexbox, convert each table `<tr>` into an individual card layout with labeled data fields.
- **Pattern B: Sticky Primary Column with Horizontal Scroll Indicator**:
  Wrap `<table>` in an overflow container (`overflow-x: auto`) with a fixed left column (e.g., Name / ID) and an ambient shadow gradient indicating that more columns exist to the right.

---

## 3. Progressive Web App (PWA) Architecture

### 3.1 Web App Manifest (`manifest.json`)
The manifest must be placed in the public root and referenced in `<head>`:
```json
{
  "name": "Platform App MTs Al Ikhwan",
  "short_name": "Al-Ikhwan",
  "description": "Aplikasi Web & Sistem Informasi Madrasah Terintegrasi",
  "start_url": "/?source=pwa",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#0d3b66",
  "theme_color": "#0d3b66",
  "icons": [
    {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### 3.2 Service Worker Caching Matrix
Assign every network request to one of four caching tiers:

| Tier | Request Target | Caching Strategy | Description |
|:---|:---|:---|:---|
| **Tier 1: Core Shell** | HTML, CSS, Core JS, WebFonts, Logo SVG | **Cache-First** (with cache-busting version key) | Instant app launch (< 300ms) even with zero network connectivity. |
| **Tier 2: Public Data** | News articles, Gallery, Teachers list, Public info | **Stale-While-Revalidate** | Serve cached data immediately; fetch update in background and emit dynamic update event. |
| **Tier 3: Auth & Admin** | Admin login, Settings mutations, PPDB approval | **Network-First** (fallback to offline status banner) | Prevent stale data display for administrative and financial workflows. |
| **Tier 4: Dynamic Mutations** | Public message form, PPDB registration submit | **Network with Offline Queue Fallback** | Store pending JSON payloads in IndexedDB / LocalStorage queue; replay automatically on reconnect. |

### 3.3 Service Worker Implementation Blueprint (`sw.js`)
```javascript
const CACHE_NAME = 'app-shell-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/admin/js/store.js',
  '/admin/js/api.js',
  '/manifest.json'
];

// 1. Install & Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// 2. Activate & Clean Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 3. Adaptive Fetch Strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Static files: Cache-First
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
    return;
  }

  // API Calls: Stale-While-Revalidate for GET, Network for POST
  if (event.request.method === 'GET' && url.searchParams.get('action') === 'getAll') {
    event.respondWith(
      caches.open('api-cache').then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(() => cachedResponse);
        return cachedResponse || fetchPromise;
      })
    );
  }
});
```

### 3.4 Native Installation UX
- Intercept the browser's default `beforeinstallprompt` event.
- Store the event deferred prompt and show a high-visibility, accessible **"Install App"** button or banner.
- Listen to `appinstalled` event to log conversions and hide installation banners.

---

## 4. Admin Portal Security & RBAC Standards

### 4.1 Role-Based Access Control (RBAC) Model
Implement a two-tier permission architecture:
1. **Roles**: High-level personas (e.g., `SuperAdmin`, `Editor`, `Staff`, `Viewer`).
2. **Permissions (Resource:Action)**:
   - `guru:create`, `guru:edit`, `guru:delete`
   - `ppdb:read`, `ppdb:verify`, `ppdb:export`
   - `settings:read`, `settings:write`

### 4.2 Multi-Layered Protection (Defense in Depth)
1. **Layer 1: Client-Side Route Guards**
   - Check authentication state before mounting any `/admin/*` page.
   - Redirect unauthenticated users: `/admin/login?redirect={currentPath}`.
   - Prevent flash of protected content (FOUC) by keeping UI hidden until verification passes.
2. **Layer 2: Server-Side & API-Level Verification**
   - **Never trust client-side role checks.** Every API endpoint (including Google Apps Script `doPost` / REST backends) must validate the user's session token or signature.
   - Restrict mutation actions (`upsertRecord`, `deleteRecord`, `updateSettings`) to authenticated admin sessions.
3. **Layer 3: IDOR (Insecure Direct Object Reference) Prevention**
   - When deleting or updating records via ID (`id: 123`), the backend must verify that the target record belongs to the authorized domain/scope.
4. **Layer 4: Data Sanitization & XSS Mitigation**
   - Escape all untrusted user strings before rendering into the DOM:
     ```javascript
     function escapeHtml(str) {
       return String(str).replace(/[&<>"']/g, (m) => ({
         '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
       }[m]));
     }
     ```
   - Strip malicious script payloads from inputs before saving to database/spreadsheet.

---

## 5. Agent Workflow & Verification Checklist

When assigned a task involving the Monorepo, Public Web, Admin Portal, or PWA, execute this rigorous workflow:

```
[1. PRE-CHECK] Analyze Target Surface & Security Level
       │
       ▼
[2. CODE CRAFTING] Write Code adhering to Mobile-First & Monorepo Rules
       │
       ▼
[3. MULTI-DEVICE VERIFICATION] Test 375px, 768px, 1280px Viewports
       │
       ▼
[4. OFFLINE & PWA VERIFICATION] Test Service Worker & Offline Cache Fallback
       │
       ▼
[5. RBAC & SECURITY AUDIT] Verify Route Guards, Input Escaping & Auth Checks
```

### Verification Checklist:
- [ ] **Mobile Ergonomics**: Tested on a simulated 375px viewport (iPhone SE) without horizontal scrollbar.
- [ ] **Touch Target**: All interactive buttons/links have `min-height: 44px` and adequate thumb spacing.
- [ ] **Table Responsiveness**: Tables with >3 columns transform cleanly into cards or have sticky horizontal scroll.
- [ ] **PWA Manifest**: `manifest.json` is valid, links to valid 192px/512px icons, and has matching theme color.
- [ ] **Service Worker Stability**: Background cache updates do not corrupt local mutations; offline fallback works.
- [ ] **Admin Route Guard**: Direct URL navigation to `/admin/*` without an active session immediately redirects to login.
- [ ] **XSS Prevention**: Dynamic input values are inserted via `textContent` or sanitized through `escapeHtml()`.
- [ ] **Code Reusability**: Common utilities, types, and UI tokens are imported from `packages/*` instead of being rewritten.

