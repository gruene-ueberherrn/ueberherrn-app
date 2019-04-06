sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/base/strings/capitalize",
	"sap/m/library"
], function (BaseController, formatter, JSONModel, capitalize, mobileLibrary) {
	"use strict";

	var URLHelper = mobileLibrary.URLHelper;

	return BaseController.extend("gruene.ueberherrn.controller.StandByDuty", {

		formatter: formatter,
		URLHelper: URLHelper,

		_aDutyTypes: ["doctor", "pediatrist", "dentist", "oculist", "otorhinolaryngologist", "pharmacy", "vet"],

		onInit: function () {
			this._initModel();
			this._setDutyItems();
		},

		_initModel: function () {
			var oBundle = this.getResourceBundle();
			var oStartEndDate = this._getStartEndDate();
			var sDutyTimeFrame = formatter.dateWithoutYear(oStartEndDate.start) + " \u2012 " + formatter.dateWithoutYear(oStartEndDate.end);
			var aDutyItems = [];
			for (var i = 0, iLength = this._aDutyTypes.length; i < iLength; i++) {
				aDutyItems.push({
					dutyType: this._aDutyTypes[i],
					dutyTypeText: oBundle.getText("dutyType" + capitalize(this._aDutyTypes[i])),
					dutyTime: "",
					name: "",
					phone: "",
					phone2: "",
					longitude: "",
					latitude: ""
				});
			}
			this.setModel(new JSONModel({
				dutyTimeFrame: sDutyTimeFrame,
				dutyItems: aDutyItems
			}), "standByDuty");

		},

		_getStartEndDate: function () {
			// Start date is always a friday (day=5)
			var dCurrentDate = new Date();
			var iDiffDaysToStart = this._getDiffDaysToStart(dCurrentDate.getDay());
			var dDateTemp = new Date(dCurrentDate.getTime() - iDiffDaysToStart * 24 * 60 * 60 * 1000);
			var dStartDate = new Date(dDateTemp.getFullYear(), dDateTemp.getMonth(), dDateTemp.getDate());
			var dEndDate = new Date(dStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);
			return {
				start: dStartDate,
				end: dEndDate
			};
		},

		_getDiffDaysToStart: function (iDay) {
			return iDay >= 5 ? iDay - 5 : iDay - 5 + 7;
		},

		_setDutyItems: function () {
			var oModel = this.getModel("standByDuty");
			var aDutyItems = oModel.getProperty("/dutyItems");

			var dCurrentDate = new Date();
			var iCurrentDay = dCurrentDate.getDay();
			var iCurrentDiffToStart = this._getDiffDaysToStart(iCurrentDay);
			this.getOwnerComponent().getStandByDutyData().then((oStandByDutyData) => {
				var oDutyContact = oStandByDutyData.dutyContact;
				var oDutyCycle = oStandByDutyData.dutyCycle;

				for (var i = 0, iLength = aDutyItems.length; i < iLength; i++) {
					var oDutyCycleItem = oDutyCycle[aDutyItems[i].dutyType];
					if (!oDutyCycleItem) {
						continue;
					}
					var sActiveDuty = "";
					var aActiveDutyTime = [];
					for (var sKey in oDutyCycleItem) {
						if (oDutyCycleItem[sKey].indexOf(iCurrentDay) > -1) {
							sActiveDuty = sKey;
							aActiveDutyTime = oDutyCycleItem[sKey];
							break;
						}
						var iMinDiff = 7;
						oDutyCycleItem[sKey].forEach((iDay) => {
							var iDiffTemp = this._getDiffDaysToStart(iDay);
							if ((iDiffTemp - iCurrentDiffToStart) >= 0 && (iDiffTemp - iCurrentDiffToStart) < iMinDiff) {
								// Set the duty as active which lies nearest in the future
								sActiveDuty = sKey;
								aActiveDutyTime = oDutyCycleItem[sKey];
								iMinDiff = iDiffTemp - iCurrentDiffToStart;
							}
						});
					}
					if (!sActiveDuty) {
						// If no active duty time was found, display an arbitrary value (only one should be available in this case)
						sActiveDuty = sKey;
						aActiveDutyTime = oDutyCycleItem[sKey];
					}

					aDutyItems[i].dutyTime = this._getDutyTime(aActiveDutyTime);
					if (oDutyContact[sActiveDuty]) {
						aDutyItems[i].name = oDutyContact[sActiveDuty].name;
						aDutyItems[i].phone = oDutyContact[sActiveDuty].phone;
						aDutyItems[i].phone2 = oDutyContact[sActiveDuty].phone2;
						aDutyItems[i].longitude = oDutyContact[sActiveDuty].longitude;
						aDutyItems[i].latitude = oDutyContact[sActiveDuty].latitude;
					} else {
						// Fallback in case no duty contact data available: take the key (should never happen)
						aDutyItems[i].name = sActiveDuty;
					}
				}

				oModel.setProperty("/dutyItems", aDutyItems);
			});
		},

		_getDutyTime: function (aDutyTime) {
			var sDutyTime = "";
			if (aDutyTime.length === 1) {
				var dDate = this._getDateByWeekday(aDutyTime[0]);
				sDutyTime = formatter.getWeekdayLong(dDate) + " " + formatter.dateFull(dDate);
			} else if (aDutyTime.length === 2) {
				var dDateOne = this._getDateByWeekday(aDutyTime[0]);
				var dDateTwo = this._getDateByWeekday(aDutyTime[1]);
				sDutyTime = formatter.getWeekdayShort(dDateOne) + " " + formatter.dateFull(dDateOne) + " / " +
					formatter.getWeekdayShort(dDateTwo) + " " + formatter.dateFull(dDateTwo);
			} else {
				var dCurrentDate = new Date();
				sDutyTime = formatter.getWeekdayLong(dCurrentDate) + " " + formatter.dateFull(dCurrentDate);
			}
			return sDutyTime;
		},

		_getDateByWeekday: function (iDay) {
			var oStartEndDate = this._getStartEndDate();
			var iDiffDaysToStart = this._getDiffDaysToStart(iDay);
			return new Date(oStartEndDate.start.getTime() + iDiffDaysToStart * 24 * 60 * 60 * 1000);
		},

		onMapButtonPress: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext("standByDuty");
			var sName = oContext.getProperty("name")
			var sLongitude = oContext.getProperty("longitude");
			var sLatitude = oContext.getProperty("latitude");

			if (this.getModel("device").getProperty("/os/ios")) {
				var sUrl = "http://maps.apple.com/?ll=" + sLatitude + "," + sLongitude + "&q=" + sName;
			} else {
				sUrl = "geo:0,0?q=" + sLatitude + "," + sLongitude + "(" + sName + ")";
			}
			URLHelper.redirect(sUrl);
		}
	});
});