import create_client_jwt from './jwt.js';
import {clientCfg, serverCfg} from "./configuration.js";

export async function getFunctionalRole(app)
{
    return authorizationToken(app, getCookie("orgId"), getCookie("uid") )
}

 async  function authorizationToken(app ,orgId, uid)
{
    // var url= `https://${serverCfg.plainId}/runtime/${clientCfg.apiKey}/authorization/token/${app}`;
    // var body =  {
        // "identity": {
            // "type" :"user",
            // "id":  uid
        // },
        // "context": {
            // "organization":  orgId
        // }};
    // return postData(url, body);        
    
	var url= `https://${serverCfg.plainId}/token/${clientCfg.apiKey}/${app}/${orgId}/${uid}`;
    //console.log(url);
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
    })
    .then(response => response.json());
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i=0; i < cookies.length; i++) {
        var c = cookies[i].split('=');
        if (c[0].trim() == name) {
            return c[1];
        }
    }
    return "";
}

function postData(url , data  ) {
     return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  "Bearer " + create_client_jwt(serverCfg.clientId, serverCfg.clientSecret)
         },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    })
        .then(response => response.json());
}

