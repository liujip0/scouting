const cacheName = "isa2025-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/main.tsx",
  "/index.css",

  "/LandingPage.tsx",

  "/utils/constants.ts",
  "/utils/trpc.ts",

  "/scout/Scout.tsx",

  "/viewdata/ViewData.tsx",
  "/viewdata/Login.tsx",
  "/viewdata/SelectEvent.tsx",
  "/viewdata/DataViewerLayout.tsx",
];

self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});
