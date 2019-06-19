import {clientCfg} from "./configuration.js";

export default function loadGigya(domain,   apiKey) {
    var gigurl = `http://cdn.${domain}.gigya.com/js/socialize.js?apikey=${apiKey}`;
	var eScript = document.createElement("script");
	eScript.src = gigurl;
	document.head.appendChild(eScript);
	
}

loadGigya(clientCfg.domain, clientCfg.apiKey);