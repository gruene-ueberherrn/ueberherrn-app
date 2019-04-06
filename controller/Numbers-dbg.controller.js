sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.Numbers", {

		onInit: function () {
			this._initModel();
			this._setNumbers();
		},

		_initModel: function () {
			this.setModel(new JSONModel([]), "numbers");
		},

		_setNumbers: function () {
			this.getOwnerComponent().getNumbersData().then((aNumbersData) => {
				this.getModel("numbers").setData(aNumbersData);
			});
		},

		navToNumberType: function (iNumberType) {
			this.getRouter().navTo("numbersDetails", {
				numberType: iNumberType
			});
		}
	});
});