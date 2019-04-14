sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.TownHallOpeningTimes", {

		onInit: function () {
			this.initBase();
			this._initModel();
			this._setAddressText();
			this._setOpeningTimesRegularText();
			this._setOpeningTimesExtendedText();
			this._setNumberText();
		},

		_initModel: function () {
			this.setModel(new JSONModel({
				addressText: "",
				openingTimesRegularText: "",
				openingTimesExtendedText: "",
				numberText: ""
			}), "townHallOpeningTimes");
		},

		_setAddressText: function () {
			let sText = "<p><strong>Verwaltungssitz</strong><br>" +
				"Gemeindeverwaltung Überherrn<br>" +
				"Rathausstraße 101<br>" +
				"66802 Überherrn</p>";
			this.getModel("townHallOpeningTimes").setProperty("/addressText", sText);
		},

		_setOpeningTimesRegularText: function () {
			let sText = "<p><strong>Montag bis Donnerstag</strong><br>" +
				"08:30 \u2012 12:00 Uhr<br>" +
				"14:00 \u2012 16:00 Uhr</p>" +
				"<p><strong>Freitag</strong><br>" +
				"08:30 \u2012 12:00 Uhr</p>";
			this.getModel("townHallOpeningTimes").setProperty("/openingTimesRegularText", sText);
		},

		_setOpeningTimesExtendedText: function () {
			let sText = "<p><strong>Erweiterte Öffnungszeiten</strong><br>" +
				"Meldeamt, Standesamt, Zentrale<br>" +
				"Donnerstag 07:00 \u2012 12:00 Uhr und 14:00 \u2012 17:00 Uhr</p>";
			this.getModel("townHallOpeningTimes").setProperty("/openingTimesExtendedText", sText);
		},

		_setNumberText: function () {
			let sText = "<p>Telefonische Terminvereinbarungen sind unter 06836-909145 möglich.</p>";
			this.getModel("townHallOpeningTimes").setProperty("/numberText", sText);
		}
	});
});