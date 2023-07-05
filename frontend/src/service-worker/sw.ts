declare const self: ServiceWorkerGlobalScope;

interface PeriodicBackgroundSyncEvent extends ExtendableEvent {
  tag: string;
}

import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import * as googleAnalytics from "workbox-google-analytics";

googleAnalytics.initialize();

const UPDATE_CHECK = "UPDATE_CHECK";
const checkForUpdates = async () => {
  console.log("Checking for updates...");
  Promise.resolve();
};

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  /^https:\/\/fonts\.googleapis\.com\/.*/i,
  new CacheFirst({
    cacheName: "google-fonts-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  /^https:\/\/fonts\.gstatic\.com\/.*/i,
  new CacheFirst({
    cacheName: "gstatic-fonts-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  /\/api\/.*/i,
  new NetworkFirst({
    cacheName: "events-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 10, // 10 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
  "GET"
);
self.addEventListener("install", () => void self.skipWaiting());
self.addEventListener("activate", () => void self.clients.claim());

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(self.clients.openWindow(event.notification.tag));
  event.notification.close();
});

self.addEventListener("periodicsync", (event: PeriodicBackgroundSyncEvent) => {
  if (event.tag === UPDATE_CHECK) {
    event.waitUntil(checkForUpdates());
  }
});

self.addEventListener("message", (event) => {
  if (event.data === UPDATE_CHECK) {
    event.waitUntil(checkForUpdates());
  }
});
