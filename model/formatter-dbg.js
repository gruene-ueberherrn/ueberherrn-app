sap.ui.define([], function () {
	"use strict";

	var oFormatter = {
		init: function (oResourceBundle) {
			this._oResourceBundle = oResourceBundle;
		},

		dateFull: function (dDate) {
			return oFormatter.dateWithoutYear(dDate) + dDate.getFullYear();
		},

		dateWithoutYear: function (dDate) {
			return ("0" + dDate.getDate()).slice(-2) + "." +
				("0" + (dDate.getMonth() + 1)).slice(-2) + ".";
		},

		getWeekdayShort: function (dDate) {
			switch (dDate.getDay()) {
				case 0:
					return oFormatter._oResourceBundle.getText("weekdayShortSunday");
				case 1:
					return oFormatter._oResourceBundle.getText("weekdayShortMonday");
				case 2:
					return oFormatter._oResourceBundle.getText("weekdayShortTuesday");
				case 3:
					return oFormatter._oResourceBundle.getText("weekdayShortWednesday");
				case 4:
					return oFormatter._oResourceBundle.getText("weekdayShortThursday");
				case 5:
					return oFormatter._oResourceBundle.getText("weekdayShortFriday");
				case 6:
					return oFormatter._oResourceBundle.getText("weekdayShortSaturday");
				default:
					return "";
			}
		},

		getWeekdayLong: function (dDate) {
			switch (dDate.getDay()) {
				case 0:
					return oFormatter._oResourceBundle.getText("weekdayLongSunday");
				case 1:
					return oFormatter._oResourceBundle.getText("weekdayLongMonday");
				case 2:
					return oFormatter._oResourceBundle.getText("weekdayLongTuesday");
				case 3:
					return oFormatter._oResourceBundle.getText("weekdayLongWednesday");
				case 4:
					return oFormatter._oResourceBundle.getText("weekdayLongThursday");
				case 5:
					return oFormatter._oResourceBundle.getText("weekdayLongFriday");
				case 6:
					return oFormatter._oResourceBundle.getText("weekdayLongSaturday");
				default:
					return "";
			}
		}
	};

	return oFormatter;
});