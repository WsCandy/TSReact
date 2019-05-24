workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
    event => {
        return (
            event.request.mode === "navigate" ||
            event.request.headers.get("type") === "page"
        );
    },
    new workbox.strategies.NetworkFirst({
        cacheName: "pages",
        networkTimeoutSeconds: 5
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 3
            })
        ]
    })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.precaching.cleanupOutdatedCaches();
