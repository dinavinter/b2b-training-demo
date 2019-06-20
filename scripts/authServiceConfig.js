
export function get_cfg_var(varname) {
    var item = localStorage.getItem(varname);
   
    return item;
}

export let clientCfg = {}, serverCfg = {};

function load_all_cfg() {
    clientCfg.serviceUrl = get_cfg_var("serviceUrl");
    clientCfg.useAuthService = get_cfg_var("useAuthService");
 

}

function load_default(){

    set_default("serviceUrl", "https://localhost:4580");
    set_default("useAuthService",true);
 


    function set_default(varName, defaultValue) {
        if( !get_cfg_var(varName)){
            localStorage.setItem(varName, defaultValue);
        }
    }
}
load_default();
load_all_cfg();
