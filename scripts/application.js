import {getFunctionalRole} from "./authorization.js";
import {clientCfg} from "./configuration.js";
import loadGigya from "./loadGigya.js"


export function loadApp(appName, container){
 
var app=JSON.parse(clientCfg.app[appName]);

loadGigya(clientCfg.domain, app.apikey);

 getFunctionalRole(app.appId)
     .then(showResponse);

 function showResponse(response) {
     var role= response.assets
     .templates[Object.keys(response.assets.templates)[0]]
     .actions.access
     .map(e=>e.attributes.roleName)[0]

     container.innerHTML = `<pre>Welcome to ${app.appName} your role is ${role}</pre>`;
 }
}