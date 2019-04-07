sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.App", {

		onInit: function () {

		},

		onAfterRendering: function () {
			this.getOwnerComponent().getEventBus().publish("grueneUeberherrn", "initialAppRenderingFinished");
		}
	});
});