sap.ui.define([
	"./BaseController",
	"sap/ui/core/routing/History"
], function (BaseController, History) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.Navigation", {

		onInit: function () {
			this.initBase();
			this._oPage = this.byId("page");
			this.byId("navContainer").addEventDelegate({
				onclick: () => {
					if (this._oPage.getSideExpanded()) {
						this._oPage.setSideExpanded(false);
					}
				}
			});
			this.getRouter().attachRoutePatternMatched(null, this._onRoutePatternMatched, this);
		},

		onItemSelect: function (oEvent) {
			var sRoute = oEvent.getParameter("item").data("route");
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash) {
				if (sRoute !== "numbers") {
					this._sRouteForwarding = sRoute;
				}
				history.go(-1);
			} else {
				this.getRouter().navTo(sRoute, {}, true);
			}
			this._oPage.setSideExpanded(false);
		},

		onSideNavButtonPress: function () {
			var bSideExpanded = this._oPage.getSideExpanded();
			this._oPage.setSideExpanded(!bSideExpanded);
		},

		_onRoutePatternMatched: function (oEvent) {
			if (this._sRouteForwarding) {
				// In case of route forwarding after back navigation
				this.getRouter().navTo(this._sRouteForwarding, {}, true);
				this._sRouteForwarding = null;
				return;
			}

			var sRoute = oEvent.getParameter("name");
			var oNavigationList = this.byId("navigationList");
			var oItemForRoute = oNavigationList.getItems().find((oItem) => {
				return oItem.data("route") === sRoute || sRoute === "numbersDetails" && oItem.data("route") === "numbers";
			});
			if (oItemForRoute) {
				oNavigationList.setSelectedItem(oItemForRoute);
			} else {
				// Check the navigation list fixed items (impressum)
				var oNavigationListFixed = this.byId("navigationListFixed");
				oItemForRoute = oNavigationListFixed.getItems().find((oItem) => {
					return oItem.data("route") === sRoute;
				});
				if (oItemForRoute) {
					oNavigationListFixed.setSelectedItem(oItemForRoute);
				}
			}
		}
	});
});