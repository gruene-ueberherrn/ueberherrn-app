sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/GroupHeaderListItem",
	"sap/m/library"
], function (BaseController, JSONModel, GroupHeaderListItem, mobileLibrary) {
	"use strict";

	var URLHelper = mobileLibrary.URLHelper;

	return BaseController.extend("gruene.ueberherrn.controller.NumbersDetails", {

		URLHelper: URLHelper,

		onInit: function () {
			this.initBase();
			this.getRouter().getRoute("numbersDetails").attachMatched(this._onRouteMatched, this);
			this._initModel();
		},

		_initModel: function () {
			this.setModel(new JSONModel({}), "numbersDetails");
		},

		_onRouteMatched: function (oEvent) {
			var iNumberType = Number(oEvent.getParameter("arguments").numberType);
			this.getOwnerComponent().getNumbersData().then((aNumbersData) => {
				var oNumbersDataForType = aNumbersData.find((oNumbersData) => {
					return oNumbersData.numberType === iNumberType;
				});
				this.getModel("numbersDetails").setData(oNumbersDataForType);
			});
		}
	});
});