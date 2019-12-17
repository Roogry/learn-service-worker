const CACHE_NAME = "theChampionsv1.1";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox didapatkan`);

    workbox.precaching.precacheAndRoute([{
        url: '/manifest.json',
        revision: '1'
    }, {
        url: '/index.html',
        revision: '1'
    }, {
        url: '/nav.html',
        revision: '1'
    }, {
        url: '/css/materialize.min.css',
        revision: '1'
    }, {
        url: '/css/style.css',
        revision: '1'
    }, {
        url: '/js/materialize.min.js',
        revision: '1'
    }, {
        url: '/js/nav.js',
        revision: '1'
    }, {
        url: '/js/app.js',
        revision: '1'
    }, {
        url: '/js/api.js',
        revision: '1'
    }, {
        url: '/js/db.js',
        revision: '1'
    }, {
        url: '/js/idb.js',
        revision: '1'
    }, {
        url: '/favicon.webp',
        revision: '1'
    }, {
        url: '/icon192.png',
        revision: '1'
    }, {
        url: '/icon512.png',
        revision: '1'
    }, {
        url: '/images/the-champions-logo.webp',
        revision: '1'
    }, {
        url: '/images/icon/trophy.webp',
        revision: '1'
    }, {
        url: '/images/index/bg-index.webp',
        revision: '1'
    }, {
        url: '/images/index/illustration-ball.webp',
        revision: '1'
    }, {
        url: '/images/background/bg-empty.webp',
        revision: '1'
    }, {
        url: '/images/background/bg-upcoming.webp',
        revision: '1'
    }, {
        url: '/images/background/bg-upcoming-ticket.webp',
        revision: '1'
    }]);

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: CACHE_NAME + "-pages"
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.cacheFirst({
            cacheName: CACHE_NAME + "-api",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        }),
    );

} else {
    console.log(`Workbox gagal didapatkan`);
}

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'icon512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('The Champions', options)
    );
});