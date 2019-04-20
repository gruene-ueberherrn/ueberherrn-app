sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox"
], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.App", {

		onInit: function () {
			this._handlePwaInstallation();
		},

		onAfterRendering: function () {
			this.getOwnerComponent().getEventBus().publish("grueneUeberherrn", "initialAppRenderingFinished");
		},

		_handlePwaInstallation: function () {
			window.addEventListener("beforeinstallprompt", (oEvent) => {
				// Prevent Chrome 67 and earlier from automatically showing the prompt
				oEvent.preventDefault();

				// Stash the event so it can be triggered later
				this._oDeferredPromptEvent = oEvent;

				// Ask the user if he wants to install the app
				this._askForInstallation();
			});
		},

		_askForInstallation: function () {
			// Safety buffer: wait for 500 ms
			window.setTimeout(() => {
				let oResourceBundle = this.getResourceBundle();
				MessageBox.show(oResourceBundle.getText("pwaInstallationQuestion"), {
					title: oResourceBundle.getText("pwaInstallationTitle"),
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					onClose: (oAction) => {
						if (oAction === MessageBox.Action.OK) {
							// Safety buffer: wait for 500 ms
							window.setTimeout(() => {
								// Prompt the PWA installation dialog
								this._oDeferredPromptEvent.prompt();

								// Google Analytics
								if (window.gtag) {
									gtag("event", "install");
								}
							}, 500);
						}
					}
				});
			}, 500);
		}
	});
});