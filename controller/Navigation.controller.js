sap.ui.define(["./BaseController","sap/ui/core/routing/History"],function(e,t){"use strict";return e.extend("gruene.ueberherrn.controller.Navigation",{onInit:function(){this.initBase();this._oPage=this.byId("page");this.byId("navContainer").addEventDelegate({onclick:()=>{if(this._oPage.getSideExpanded()){this._oPage.setSideExpanded(false)}}});this.getRouter().attachRoutePatternMatched(null,this._onRoutePatternMatched,this)},onItemSelect:function(e){var i=e.getParameter("item").data("route");var a=t.getInstance().getPreviousHash();if(a){if(i!=="numbers"){this._sRouteForwarding=i}history.go(-1)}else{this.getRouter().navTo(i,{},true)}this._oPage.setSideExpanded(false)},onSideNavButtonPress:function(){var e=this._oPage.getSideExpanded();this._oPage.setSideExpanded(!e)},_onRoutePatternMatched:function(e){if(this._sRouteForwarding){this.getRouter().navTo(this._sRouteForwarding,{},true);this._sRouteForwarding=null;return}var t=e.getParameter("name");var i=this.byId("navigationList");var a=i.getItems().find(e=>{return e.data("route")===t||t==="numbersDetails"&&e.data("route")==="numbers"});if(a){i.setSelectedItem(a)}else{var n=this.byId("navigationListFixed");a=n.getItems().find(e=>{return e.data("route")===t});if(a){n.setSelectedItem(a)}}}})});