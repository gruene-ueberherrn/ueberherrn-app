sap.ui.define(["sap/ui/core/mvc/Controller","../model/formatter","sap/ui/core/routing/History","sap/m/library"],function(e,t,r,n){"use strict";var o=n.URLHelper;return e.extend("gruene.ueberherrn.controller.BaseController",{formatter:t,getRouter:function(){return this.getOwnerComponent().getRouter()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},callNumber:function(e){window.location.href=o.normalizeTel("06836-1772")},onNavBack:function(){var e=r.getInstance().getPreviousHash();if(e){history.go(-1)}else{this.getRouter().navTo("home",{},true)}},requestGet:function(e){return this.getOwnerComponent().requestGet(e)}})});