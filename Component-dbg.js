sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/Core",
	"sap/m/MessageToast",
	"sap/ui/core/date/Gregorian",
	"./ComponentLoader", // ensure it's included in sap-ui-custom
	"./model/models",
	"./model/formatter",
], function (UIComponent, Core, MessageToast, Gregorian, ComponentLoader, models, formatter) {
	"use strict";

	return UIComponent.extend("gruene.ueberherrn.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			this._pStandByDutyData = this._getStandByDutyData();
			this._pNumbersData = this._getNumbersData();
			this._pHotelsData = this._getHotelsData();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set i18n resource bundle to formatter
			formatter.init(this.getModel("i18n").getResourceBundle());

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();

			// Register an event handler to inform the user when the UI is refreshed automatically or when Google Analytics is deactivated
			var oEventBus = Core.getEventBus();
			oEventBus.subscribe("grueneUeberherrn", "newVersionRefresh", this.onNewVersionRefresh, this);
			oEventBus.subscribe("grueneUeberherrn", "googleAnalyticsOptOut", this.onGoogleAnalyticsOptOut, this);
		},

		onNewVersionRefresh: function () {
			MessageToast.show(this.getModel("i18n").getResourceBundle().getText("newVersionRefresh"), {
				duration: 5000,
				closeOnBrowserNavigation: false
			});
		},

		onGoogleAnalyticsOptOut: function () {
			MessageToast.show(this.getModel("i18n").getResourceBundle().getText("googleAnalyticsOptOut"), {
				duration: 5000,
				closeOnBrowserNavigation: false
			});
		},

		requestGet: function (sUrl) {
			var oRequest = new XMLHttpRequest();
			oRequest.open("GET", sUrl, true);

			return new Promise((fnResolve, fnReject) => {
				oRequest.onload = function () {
					if (oRequest.status >= 200 && oRequest.status < 400) {
						// Success
						fnResolve(oRequest.responseText);
					} else {
						// We reached our target server, but it returned an error
						fnReject(oRequest);
					}
				};

				oRequest.onerror = function () {
					fnReject(oRequest);
				};

				oRequest.send();
			});
		},

		getStandByDutyData: function () {
			return this._pStandByDutyData;
		},

		getNumbersData: function () {
			return this._pNumbersData;
		},

		getHotelsData: function () {
			return this._pHotelsData;
		},

		_getStandByDutyData: function () {
			return new Promise((fnResolve, fnReject) => {
				var oStandByDutyData = {
					dutyContact: {},
					dutyCycle: []
				};
				Promise.all([
					this.requestGet("https://gruene-ueberherrn.github.io/ueberherrn-app-data/dutyContact.json"),
					this.requestGet("https://gruene-ueberherrn.github.io/ueberherrn-app-data/dutyCycle.json")
				]).then((aResult) => {
					oStandByDutyData.dutyContact = JSON.parse(aResult[0]);
					oStandByDutyData.dutyCycle = JSON.parse(aResult[1]);
					fnResolve(oStandByDutyData);
				}, () => fnReject(oStandByDutyData));
			});
		},

		_getNumbersData: function () {
			return new Promise((fnResolve, fnReject) => {
				this.requestGet("https://gruene-ueberherrn.github.io/ueberherrn-app-data/importantNumbers.json").then((sImportantNumbers) => {
					fnResolve(JSON.parse(sImportantNumbers));
				}, () => fnReject([]));
			});
		},

		_getHotelsData: function () {
			return new Promise((fnResolve, fnReject) => {
				this.requestGet("https://gruene-ueberherrn.github.io/ueberherrn-app-data/hotels.json").then((sHotels) => {
					fnResolve(JSON.parse(sHotels));
				}, () => fnReject([]));
			});
		}
	});
});