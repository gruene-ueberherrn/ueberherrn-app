sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.Impressum", {

		onInit: function () {
			this._initModel();
			this._setImpressumText();
			this._setLicenseText();
		},

		_initModel: function () {
			this.setModel(new JSONModel({
				impressumText: "",
				licenseText: ""
			}), "impressum");
		},

		_setImpressumText: function () {
			var oBundle = this.getResourceBundle();
			var sText = "<p>" + oBundle.getText("impressumFirstLine") + "</p>" +
				"<p><strong>" + oBundle.getText("impressumNameFirst") + "</strong><br/>" +
				"<strong>" + oBundle.getText("impressumNameSecond") + "</strong></p>" +
				"<p>" + oBundle.getText("impressumMail", ["gruene.ueberherrn@gmail.com"]) + "</p>" +
				"<p>" + oBundle.getText("impressumLastLine") + " <strong>Felix Guldner</strong>.</p>";
			this.getModel("impressum").setProperty("/impressumText", sText);
		},

		_setLicenseText: function () {
			var oModel = this.getModel("impressum");
			this.requestGet("./staticContent/license.txt").then((sLicenseText) => {
				oModel.setProperty("/licenseText", sLicenseText);
			});
		}
	});
});