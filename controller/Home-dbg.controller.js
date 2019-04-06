sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("gruene.ueberherrn.controller.Home", {

		onInit: function () {
			var sHomeText = "<p>Die Gemeinde Überherrn ist mit ihren rund 13.000 Einwohnern eine weltoffene, sympathische Gemeinde im Südwesten des Saarlandes. Im Zuge der saarländischen Gebiets- und Verwaltungsreform wurden die ehemals selbstständigen Gemeinden 1974 zu Ortsteilen und zur Gemeinde Überherrn zusammengelegt.</p>" +
				"<p>Der Ortsteil <strong>Überherrn</strong> ist der wirtschaftliche Mittelpunkt der Gemeinde. Hier gibt es vielfältige Einkaufsmöglichkeiten. Auch Handwerks- und Dienstleistungsfirmen sowie mittelständige Unternehmen haben sich hier niedergelassen. Mit dem Kulturhaus steht ein attraktiver Veranstaltungs-, Versammlungs- und Tagungsort zur Verfügung. In Überherrn befinden sich auch das Parkbad und der Campingplatz.</p>" +
				"<p><strong>Altforweiler</strong> bietet durch seine geschützte Lage eine besondere Wohnqualität. Die Dorfgemeinschaft wird von einem regen Vereinseben geprägt.</p>" +
				"<p>Die ehemals mittelalterliche Bergstadt <strong>Berus</strong> beherbergt eine Vielzahl an Sehenswürdigkeiten wie das ‚Torhaus Scharfeneck‘, das ‚Torhaus Schloss‘, das ‚Philippshaus‘, die Orannakapelle und das Europadenkmal, Wahrzeichen der Gemeinde Überherrn.</p>" +
				"<p>In <strong>Bisten</strong> befindet sich das alte und das neue Rathaus; dort hat seit 1998 die Verwaltung ihren gemeinsamen Sitz. Wahrzeichen des Ortes ist die katholische Pfarrkirche St. Peter.</p>" +
				"<p>Der Ortsteil <strong>Felsberg</strong> ist vor allem durch den Europasender und die Teufelsburg bekannt. Der Ort nahm schon mehrfach erfolgreich am Wettbewerb ‚Unser Dorf soll schöner werden‘ teil.</p>" +
				"<p>Der jüngste Ortsteil ist die <strong>Wohnstadt</strong>. Hier befindet sich auch die ‚Schule am Warndtwald‘, auf der auch höhere Bildungsabschlüsse möglich sind und die einen hervorragenden Ruf genießt. Sie feierte 2013 ihr 50jähriges Bestehen.</p>"

			this.byId("formattedText").setHtmlText(sHomeText);
		}
	});
});