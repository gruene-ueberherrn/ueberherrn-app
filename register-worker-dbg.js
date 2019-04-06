function refreshUI(oRegistration) {

    function performAutoRefresh(iNumberOfTries) {
        if (iNumberOfTries === 10) {
            // Something went wrong in this case
            console.log("New service worker could not be activated after 10 seconds.");
            return;
        }

        if (!oRegistration.waiting) {
            // Try again in 1 second
            window.setTimeout(() => {
                autoRefresh((iNumberOfTries || 0) + 1);
            }, 1000);
        } else {
            // Active the new service worker
            oRegistration.waiting.postMessage("skipWaiting");
        }
    }

    // Automatically refresh the UI after 2 seconds
    window.setTimeout(() => {
        // Trigger an event to inform the user about the update
        if (window.sap && window.sap.ui && window.sap.ui.require) {
            sap.ui.require(["sap/ui/core/Core"], (Core) => {
                Core.getEventBus().publish("grueneUeberherrn", "newVersionRefresh");
            });
        }

        // Wait another 2 seconds before refreshing
        window.setTimeout(performAutoRefresh, 2000);
    }, 2000);
};

function onNewServiceWorker(oRegistration, fnCallback) {
    if (oRegistration.waiting) {
        // SW is waiting to activate. Can occur if multiple clients open and
        // one of the clients is refreshed.
        return fnCallback();
    }

    function listenInstalledStateChange() {
        oRegistration.installing.addEventListener("statechange", (oEvent) => {
            if (oEvent.target.state === "installed") {
                // A new service worker is available, inform the user
                fnCallback();
            }
        });
    };

    if (oRegistration.installing) {
        return listenInstalledStateChange();
    }

    // We are currently controlled so a new SW may be found...
    // Add a listener in case a new SW is found,
    oRegistration.addEventListener("updatefound", listenInstalledStateChange);
}


// Register the service worker
if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then((oRegistration) => {
            console.log("Service Worker Registered");

            // Track updates to the Service Worker.
            if (!navigator.serviceWorker.controller) {
                // The window client isn't currently controlled so it's a new service worker that will activate immediately
                return;
            }

            // When the user asks to refresh the UI, we'll need to reload the window
            var bPreventDevToolsReloadLoop = false;
            navigator.serviceWorker.addEventListener("controllerchange", (oEvent) => {
                // Ensure refresh is only called once.
                // This works around a bug in "force update on reload".
                if (bPreventDevToolsReloadLoop) {
                    return;
                }
                bPreventDevToolsReloadLoop = true;
                console.log("Controller loaded");
                window.location.reload();
            });

            onNewServiceWorker(oRegistration, () => {
                refreshUI(oRegistration);
            });
        });
    });
}