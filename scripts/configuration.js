export let APP_NAMES = ["portal", "eCommerce", "eLearning", "Orders"]; 

export function get_cfg_var(varname) {
	var item = localStorage.getItem(varname);
	// if (typeof(globalThis._g_is_cfg_page) == "undefined" || !_g_is_cfg_page) {
	// 	 if (!item) {
	// 	// 	//debugger;
	// 	 	window.location.replace("./configuration.html");
	// 	 }
	// }
	return item;
}
 	
export let clientCfg = {}, serverCfg = {};

function load_all_cfg() {
	clientCfg.domain = get_cfg_var("domain");
    clientCfg.apiKey = get_cfg_var("api_key");
    clientCfg.portal = get_cfg_var("portal");

	serverCfg.clientId = get_cfg_var("client_id");
	serverCfg.clientSecret = get_cfg_var("client_secret");
    serverCfg.plainId = get_cfg_var("plainId"); 
    //var apps = {};
    //
	// clientCfg.apps = apps;
	// for (var i = 0; i < APP_NAMES.length; i++) {
	// 	apps[APP_NAMES[i]] = get_cfg_var("apps." + APP_NAMES[i]);
    // }
    
    var app = {};

	clientCfg.app = app;
	for (var i = 0; i < APP_NAMES.length; i++) {
		app[APP_NAMES[i]] = get_cfg_var("app." + APP_NAMES[i]);
	}
}

function load_default(){

    set_default("domain", "us1");
    set_default("api_key", "3_OnQvOXVIpn97YPJP6MYSMHLtYjuX0cusTWBfnm2PWJiO959CQOyMdJECTJJpwl3K");
    set_default("client_id","0evun2M3mvCW6uuuIMIVBc8JYEIt2wCd" );
    set_default("client_secret","E5T8O8jPyfJwRJPiJvxZ2sgthhsGrWJE");
    set_default("plainId","us1api.b2b-gigya.com");
    set_default("portal","V8DP1YJFD2TCAHYF02SX");
    
    function set_default(varName, defaultValue) {
        if( !get_cfg_var(varName)){
            localStorage.setItem(varName, defaultValue);
        }
    }
}
load_default();
load_all_cfg();
