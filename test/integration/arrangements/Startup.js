sap.ui.define(["sap/ui/test/Opa5"],function(e){"use strict";return e.extend("gruene.ueberherrn.test.integration.arrangements.Startup",{iStartMyApp:function(e){e=e||{};e.delay=e.delay||50;this.iStartMyUIComponent({componentConfig:{name:"gruene.ueberherrn",async:true},hash:e.hash,autoWait:e.autoWait})}})});