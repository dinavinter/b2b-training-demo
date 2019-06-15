import {clientCfg} from "./configuration.js";

function loadGigya() {
    var gigurl = `https://cdns.${clientCfg.domain}.gigya.com/js/socialize.js?apikey=${clientCfg.apiKey}`;
	var eScript = document.createElement("script");
	eScript.src = gigurl;
	document.head.appendChild(eScript);
	
}

loadGigya();