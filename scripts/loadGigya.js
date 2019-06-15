loadGigya();

function loadGigya() {
    var url = new URL(window.location.href);
    var apiKeyParam = url.searchParams.get("apiKey");
    var domainParam = url.searchParams.get("domain");

    if (apiKeyParam) {
        g_apiKey = apiKeyParam;
    }
    if (domainParam) {
        g_domain = domainParam
    }

    var gigurl = ("https://cdns." + g_domain + ".gigya.com/js/socialize.js?apikey=" + g_apiKey);
    document.write('<scr' + 'ipt type="text/javascript" src="' + gigurl + '"></scr' + 'ipt>');
 
}