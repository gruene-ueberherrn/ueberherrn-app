sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t,i){"use strict";return e.extend("gruene.ueberherrn.controller.TownHallCallbackService",{onInit:function(){this.initBase();this._initModel();this._setActivities()},_initModel:function(){this.setModel(new t({enteredName:"",selectedActivity:"",selectedStartTime:"08:00",selectedEndTime:"12:00",enteredNumber:"",enteredComment:"",activities:[]}),"townHallCallbackService")},_setActivities:function(){let e=[{id:"abfallangelegenheiten",text:"Abfallangelegenheiten"},{id:"bauangelegenheiten",text:"Bauangelegenheiten"},{id:"friedhofsangelegenheiten",text:"Friedhofsangelegenheiten"},{id:"beschwerde",text:"Beschwerde"},{id:"sonstiges",text:"Sonstiges"},{id:"sproochen",text:"Nur mal sproochen"}];this.getModel("townHallCallbackService").setProperty("/activities",e)},onSend:function(){let e="Diese Funktion ist leider noch nicht verfügbar.";i.information(e,{})}})});