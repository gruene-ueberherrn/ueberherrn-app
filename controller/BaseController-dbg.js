sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/core/routing/History",
    "sap/m/library"
], function (Controller, formatter, History, mobileLibrary) {
    "use strict";

    var URLHelper = mobileLibrary.URLHelper;

    return Controller.extend("gruene.ueberherrn.controller.BaseController", {

        formatter: formatter,

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

        callNumber: function (sPhone) {
            // URLHelper.triggerTel("06836-1772");
            window.location.href = URLHelper.normalizeTel("06836-1772");
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