sap.ui.define([
	"./BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/Device"
], function (BaseController, History, Device) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.Navigation", {

		onInit: function () {
			this._oPage = this.byId("page");

			if (Device.system.phone) {
				this.byId("navContainer").addEventDelegate({
					onclick: () => {
						if (this._oPage.getSideExpanded()) {
							this._oPage.setSideExpanded(false);
						}
					}
				});
			}

			this.getRouter().attachRoutePatternMatched(null, this._onRoutePatternMatched, this);
		},

		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			var sRoute = oItem.data("route");

			if (sRoute) {
				// Navigate to the respective route
				var sPreviousHash = History.getInstance().getPreviousHash();
				if (sPreviousHash) {
					if (sRoute !== "numbers") {
						this._sRouteForwarding = sRoute;
					}
					history.go(-1);
				} else {
					this.getRouter().navTo(sRoute, {}, true);
				}

				if (Device.system.phone) {
					this._oPage.setSideExpanded(false);
				}
			} else {
				// No route means this is a grouping item; just toggle the item
				oItem.setExpanded(!oItem.getExpanded());
			}
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

			// Select the correct item in the navigation list
			var sRoute = oEvent.getParameter("name");
			var oNavigationList = this.byId("navigationList");
			var oItemForRoute = null;
			var aItems = oNavigationList.getItems();
			for (var i = 0; i < aItems.length; i++) {
				if (aItems[i].data("route") === sRoute || sRoute === "numbersDetails" && aItems[i].data("route") === "numbers") {
					oItemForRoute = aItems[i];
				}
				var aSubItems = aItems[i].getItems();
				for (var j = 0; j < aSubItems.length; j++) {
					if (aSubItems[j].data("route") === sRoute) {
						oItemForRoute = aSubItems[j];
						break;
					}
				}
				if (oItemForRoute) {
					break;
				}
			}

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

			// Google Analytics
			if (window.gtag) {
				gtag("event", "screen_view", {
					"screen_name": sRoute
				});
			}
		}
	});
});