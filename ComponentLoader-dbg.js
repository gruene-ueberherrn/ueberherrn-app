sap.ui.define([
    "sap/ui/core/Core"
], function (Core) {
    "use strict";

    Core.attachInit(function () {
        Promise.all([
            // Avoid sync requests for messagebundles
            Core.getLibraryResourceBundle("sap.ui.core", true),
            Core.getLibraryResourceBundle("sap.ui.layout", true),
            Core.getLibraryResourceBundle("sap.m", true),
            Core.getLibraryResourceBundle("sap.tnt", true)
        ]).then(function () {
            sap.ui.require(["sap/ui/core/ComponentSupport"]);
        });
    });
});