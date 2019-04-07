sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/core/routing/History"
], function (Controller, formatter, History) {
    "use strict";

    return Controller.extend("gruene.ueberherrn.controller.BaseController", {

        formatter: formatter,

        initBase: function () {
            this.getOwnerComponent().getEventBus().subscribe("grueneUeberherrn", "initialAppRenderingFinished", this.onInitialAppRenderingFinished, this);
        },

        onInitialAppRenderingFinished: function () {
            let oScrollContainer = this.byId("scrollContainer");
            if (oScrollContainer) {
                oScrollContainer.scrollTo(0, 0, 0);
            }
        },

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        onNavBack: function () {
            var sPreviousHash = History.getInstance().getPreviousHash();

            if (sPreviousHash) {
                history.go(-1);
            } else {
                this.getRouter().navTo("home", {}, true);
            }
        },

        requestGet: function (sUrl) {
            return this.getOwnerComponent().requestGet(sUrl);
        }
    });
});