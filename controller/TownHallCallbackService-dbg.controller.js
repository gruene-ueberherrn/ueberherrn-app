sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, MessageBox) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.TownHallCallbackService", {

		onInit: function () {
			this.initBase();
			this._initModel();
			this._setActivities();
		},

		_initModel: function () {
			this.setModel(new JSONModel({
				enteredName: "",
				selectedActivity: "",
				selectedStartTime: "08:00",
				selectedEndTime: "12:00",
				enteredNumber: "",
				enteredComment: "",
				activities: []
			}), "townHallCallbackService");
		},

		_setActivities: function () {
			let aActivities = [{
				id: "abfallangelegenheiten",
				text: "Abfallangelegenheiten"
			}, {
				id: "bauangelegenheiten",
				text: "Bauangelegenheiten"
			}, {
				id: "friedhofsangelegenheiten",
				text: "Friedhofsangelegenheiten"
			}, {
				id: "beschwerde",
				text: "Beschwerde"
			}, {
				id: "sonstiges",
				text: "Sonstiges"
			}, {
				id: "sproochen",
				text: "Nur mal sproochen"
			}];
			this.getModel("townHallCallbackService").setProperty("/activities", aActivities);
		},

		onSend: function () {
			let sText = "Diese Funktion ist leider noch nicht verfügbar.";
			MessageBox.information(sText, {

			});
		}
	});
});