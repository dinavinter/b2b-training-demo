import {getFunctionalRole} from "./authorization.js";
import {clientCfg} from "./configuration.js";


  export async function get_apps(account){
    if (account.errorCode != 0) {
        return;
    }

   var auth= await getFunctionalRole(clientCfg.portal);
     
   return auth
     .assets.templates[Object.keys(auth.assets.templates)[0]]
     .actions.access.map(e=>e.attributes);


}