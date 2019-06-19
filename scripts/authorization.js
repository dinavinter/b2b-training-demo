import create_client_jwt from './jwt.js';
import {serverCfg, clientCfg} from "./configuration.js";
import {clientCfg as authServiceConfig} from "./authServiceConfig.js";

export async function get_assets(app ,action){
    if (typeof getCookie("orgId") == "undefined" || typeof getCookie("uid") == "undefined" ) {
        return;
    }

    var auth= await getFunctionalRole(app);

    if( typeof auth.assets.templates[Object.keys(auth.assets.templates)[0]] !== "undefined")
    return auth
        .assets.templates[Object.keys(auth.assets.templates)[0]]
        .actions[action].map(e=>e.attributes);

  else return [{roleName:"no role"}]      ;


}

export async function getFunctionalRole(app)
{
    return authorizationToken(app, getCookie("orgId"), getCookie("uid") )
}

async  function authorizationToken(app ,orgId, uid)
{

    if(authServiceConfig.useAuthService === "true")
    {
        return callAuthService(app, orgId, uid);
    }
    else
    {
        return callPlainId(app, uid, orgId);
    }

}

async function callAuthService(app, orgId, uid) {
    const url = `http://${authServiceConfig.serviceUrl}/token/${clientCfg.apiKey}/${app}/${orgId}/${uid}`;

    var response= await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: new Headers(
            {"Content-Type": "application/json",
                "Accept":"application/json"}
        ),
       // credentials: 'same-origin',
    });

  return response.json();
}

function callPlainId(app, uid, orgId) {
    const url = `https://${serverCfg.plainId}/runtime/${clientCfg.apiKey}/authorization/token/${app}`;
    const body = {
        "identity": {
            "type": "user",
            "id": uid
        },
        "context": {
            "organization": orgId
        }
    };

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + create_client_jwt(serverCfg.clientId, serverCfg.clientSecret)
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(body),
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


