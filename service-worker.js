importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");if(workbox){console.log("App Version: 0.0.1-20190414-2210");workbox.routing.registerRoute(/(index\.html|.*\.js$|manifest\.json|)/,workbox.strategies.cacheFirst());workbox.routing.registerRoute(/(.*\.css|.*\.properties|.*\.woff2|.*\.txt)/,workbox.strategies.cacheFirst({cacheName:"asset-cache"}));workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/,workbox.strategies.cacheFirst({cacheName:"image-cache"}));workbox.routing.registerRoute(/.*\.json/,workbox.strategies.networkFirst({cacheName:"data-cache"}));self.addEventListener("message",e=>{if(!e.data){return}switch(e.data){case"skipWaiting":self.skipWaiting();break;default:break}});self.addEventListener("install",e=>{const s=["./index.html","./manifest.json","./register-worker.js","./resources/sap-ui-custom.js"];const t=["./css/style.css","./staticContent/impressum.txt","./staticContent/googleAnalytics.txt","./staticContent/googleAnalyticsOptOut.txt","./staticContent/license.txt","./resources/sap/ui/core/messagebundle_de.properties","./resources/sap/ui/layout/messagebundle_de.properties","./resources/sap/m/messagebundle_de.properties","./resources/sap/tnt/messagebundle_de.properties","./resources/sap/m/themes/sap_belize/library.css","./resources/sap/tnt/themes/sap_belize/library.css","./resources/sap/ui/core/themes/sap_belize/library.css","./resources/sap/ui/layout/themes/sap_belize/library.css","./resources/sap/ui/core/themes/base/fonts/SAP-icons.woff2","./resources/sap/ui/core/themes/sap_belize/fonts/72-Bold.woff2","./resources/sap/ui/core/themes/sap_belize/fonts/72-Regular.woff2"];const r=["./img/logo-128x128.png","./img/logo-144x144.png","./img/logo-152x152.png","./img/logo-192x192.png","./img/logo-512x512.png","./img/logo_gruene.png","./img/logo_gruene_impressum.png","./img/europa-denkmal-1.jpg","./img/ueberherrn_sprichwort.jpg"];const o=["https://gruene-ueberherrn.github.io/ueberherrn-app-data/dutyContact.json","https://gruene-ueberherrn.github.io/ueberherrn-app-data/dutyCycle.json","https://gruene-ueberherrn.github.io/ueberherrn-app-data/importantNumbers.json","https://gruene-ueberherrn.github.io/ueberherrn-app-data/hotels.json"];e.waitUntil(caches.open(workbox.core.cacheNames.runtime).then(e=>e.addAll(s)));e.waitUntil(caches.open("asset-cache").then(e=>e.addAll(t)));e.waitUntil(caches.open("image-cache").then(e=>e.addAll(r)));e.waitUntil(caches.open("data-cache").then(e=>e.addAll(o)))})}else{console.log("Workbox didn't load")}