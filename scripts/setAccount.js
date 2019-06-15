
function loadAccount() {
    gigya.accounts.getAccountInfo({ callback:setAccountVariables, include: "groups, *" });

}

function setAccountVariables(response) {
    if ( response.errorCode != 0) {
              return;
    }

    var uid= response.UID;
    var org = response["groups"]["organizations"][0];


    setCookie("uid", uid);
    setCookie("orgId", org.orgId);

}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}