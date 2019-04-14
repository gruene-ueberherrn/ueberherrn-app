importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
    console.log("App Version: 0.0.1-20190414-1550");

    // index.html / manifest.json and JavaScript files
    workbox.routing.registerRoute(
        /(index\.html|.*\.js$|manifest\.json)/,
        workbox.strategies.cacheFirst()
    );

    // CSS, i18n, fonts, text files
    workbox.routing.registerRoute(
        /(.*\.css|.*\.properties|.*\.woff2|.*\.txt)/,
        workbox.strategies.cacheFirst({
            // Use a custom cache name
            cacheName: "asset-cache"
        })
    );

    // Image files
    workbox.routing.registerRoute(
        /.*\.(?:png|jpg|jpeg|svg|gif)/,
        // Use the cache if it's available
        workbox.strategies.cacheFirst({
            // Use a custom cache name
            cacheName: "image-cache"
        })
    );

    // JSON data files
    workbox.routing.registerRoute(
        /.*\.json/,
        workbox.strategies.networkFirst({
            cacheName: "data-cache"
        })
    );

    self.addEventListener("message", (oEvent) => {
        if (!oEvent.data) {
            return;
        }

        switch (oEvent.data) {
            case "skipWaiting":
                self.skipWaiting();
                break;
            default:
                // NOOP
                break;
        }
    });

    self.addEventListener("install", (oEvent) => {
        const aUrlCore = [
            "./index.html",
            "./manifest.json",
            "./register-worker.js",
            "./resources/sap-ui-custom.js"
        ];
        const aUrlAsset = [
            "./css/style.css",
            "./staticContent/impressum.txt",
            "./staticContent/googleAnalytics.txt",
            "./staticContent/googleAnalyticsOptOut.txt",
            "./staticContent/license.txt",
            "./resources/sap/ui/core/messagebundle_de.properties",
            "./resources/sap/ui/layout/messagebundle_de.properties",
            "./resources/sap/m/messagebundle_de.properties",
            "./resources/sap/tnt/messagebundle_de.properties",
            "./resources/sap/m/themes/sap_belize/library.css",
            "./resources/sap/tnt/themes/sap_belize/library.css",
            "./resources/sap/ui/core/themes/sap_belize/library.css",
            "./resources/sap/ui/layout/themes/sap_belize/library.css",
            "./resources/sap/ui/core/themes/base/fonts/SAP-icons.woff2",
            "./resources/sap/ui/core/themes/sap_belize/fonts/72-Bold.woff2",
            "./resources/sap/ui/core/themes/sap_belize/fonts/72-Regular.woff2"
        ];
        const aUrlImage = [
            "./img/logo-128x128.png",
            "./img/logo-144x144.png",
            "./img/logo-152x152.png",
            "./img/logo-192x192.png",
            "./img/logo-512x512.png",
            "./img/logo_gruene.png",
            "./img/logo_gruene_impressum.png",
            "./img/europa-denkmal-1.jpg",
            "./img/ueberherrn_sprichwort.jpg"
        ];
        const aUrlJsonData = [
            "https://gruene-ueberherrn.github.io/ueberherrn-app-data/dutyContact.json",
            "https://gruene-ueberherrn.github.io/ueberherrn-app-data/dutyCycle.json",
            "https://gruene-ueberherrn.github.io/ueberherrn-app-data/importantNumbers.json",
            "https://gruene-ueberherrn.github.io/ueberherrn-app-data/hotels.json"
        ];
        oEvent.waitUntil(caches.open(workbox.core.cacheNames.runtime).then((cache) => cache.addAll(aUrlCore)));
        oEvent.waitUntil(caches.open("asset-cache").then((cache) => cache.addAll(aUrlAsset)));
        oEvent.waitUntil(caches.open("image-cache").then((cache) => cache.addAll(aUrlImage)));
        oEvent.waitUntil(caches.open("data-cache").then((cache) => cache.addAll(aUrlJsonData)));
    });
} else {
    console.log("Workbox didn't load");
}