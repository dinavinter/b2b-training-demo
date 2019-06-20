
export function get_cfg_var(varname) {
    var item = localStorage.getItem(varname);
   
    return item;
}

export let clientCfg = {}, serverCfg = {};

function load_all_cfg() {
    clientCfg.serviceUrl = get_cfg_var("serviceUrl");
    clientCfg.useAuthService = get_cfg_var("useAuthService");
    // serverCfg.apiKey = get_cfg_var("api_key");
    // serverCfg.clientId = get_cfg_var("client_id");
    // serverCfg.clientSecret = get_cfg_var("client_secret");
    // serverCfg.plainId = get_cfg_var("plainId");

}

function load_default(){

    set_default("serviceUrl", "https://localhost:4580");
    set_default("useAuthService",true);

    // set_default("api_key", "3_OnQvOXVIpn97YPJP6MYSMHLtYjuX0cusTWBfnm2PWJiO959CQOyMdJECTJJpwl3K");
    // set_default("client_id","0evun2M3mvCW6uuuIMIVBc8JYEIt2wCd" );
    // set_default("client_secret","E5T8O8jPyfJwRJPiJvxZ2sgthhsGrWJE");
  //  set_default("plainId","us1api.b2b-gigya.com");


    function set_default(varName, defaultValue) {
        if( !get_cfg_var(varName)){
            localStorage.setItem(varName, defaultValue);
        }
    }
}
load_default();
load_all_cfg();
