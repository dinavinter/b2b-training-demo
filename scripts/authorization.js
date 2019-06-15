import create_client_jwt from './jwt.js';
import {clientCfg, serverCfg} from "./configuration.js";

export async function getFunctionalRole( )
{
    return authorizationToken(getCookie("app"),getCookie("orgId"), getCookie("uid") )
}

 async  function authorizationToken(app ,orgId, uid)
{
    var url= `https://${serverCfg.plainId}/runtime/${clientCfg.apiKey}/authorization/token/${app}`;
    var body =  {
        "identity": {
            "type" :"user",
            "id":  uid
        },
        "context": {
            "organization":  orgId
        }};
    return postData(url, body);

}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i=0; i < cookies.length; i++) {
        var c = cookies[i].split('=');
        if (c[0] == name) {
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

