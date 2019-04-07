sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.Hotels", {

		onInit: function () {
			this.initBase();
			this._initModel();
			this._setHotels();
		},

		_initModel: function () {
			this.setModel(new JSONModel([]), "hotels");
		},

		_setHotels: function () {
			this.getOwnerComponent().getHotelsData().then((aHotelsData) => {
				this.getModel("hotels").setData(aHotelsData);
			});
		}
	});
});