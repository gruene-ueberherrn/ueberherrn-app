sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.Impressum", {

		onInit: function () {
			this.initBase();
			this._initModel();
			this._setImpressumText();
			this._setGoogleAnalyticsText();
			this._setGoogleAnalyticsOptOutText();
			this._setLicenseText();
		},

		_initModel: function () {
			this.setModel(new JSONModel({
				impressumText: "",
				googleAnalyticsText: "",
				googleAnalyticsOptOutText: "",
				licenseText: ""
			}), "impressum");
		},

		_setImpressumText: function () {
			this.requestGet("./staticContent/impressum.txt").then((sImpressum) => {
				this.getModel("impressum").setProperty("/impressumText", sImpressum);
			});
			// var oBundle = this.getResourceBundle();
			// var sText = "<p>" + oBundle.getText("impressumFirstLine") + "</p>" +
			// 	"<p><strong>" + oBundle.getText("impressumNameFirst") + "</strong><br/>" +
			// 	"<strong>" + oBundle.getText("impressumNameSecond") + "</strong></p>" +
			// 	"<p>" + oBundle.getText("impressumMail", ["gruene.ueberherrn@gmail.com"]) + "</p>" +
			// 	"<p>" + oBundle.getText("impressumLastLine") + " <strong>Felix Guldner</strong>.</p>";
			// this.getModel("impressum").setProperty("/impressumText", sText);
		},

		_setGoogleAnalyticsText: function () {
			this.requestGet("./staticContent/googleAnalytics.txt").then((sGoogleAnalytics) => {
				this.getModel("impressum").setProperty("/googleAnalyticsText", sGoogleAnalytics);
			});
		},

		_setGoogleAnalyticsOptOutText: function () {
			this.requestGet("./staticContent/googleAnalyticsOptOut.txt").then((sGoogleAnalyticsOptOut) => {
				this.getModel("impressum").setProperty("/googleAnalyticsOptOutText", sGoogleAnalyticsOptOut);
			});
		},

		_setLicenseText: function () {
			this.requestGet("./staticContent/license.txt").then((sLicenseText) => {
				this.getModel("impressum").setProperty("/licenseText", sLicenseText);
			});
		}
	});
});