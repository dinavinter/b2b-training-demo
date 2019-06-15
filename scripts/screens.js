
function logout() {
    gigya.socialize.logout({onError: errorHandler, callbac:showGetAccountInfoResponse})
}

function showProfile() {
    var params = {
        screenSet: "Default-ProfileUpdate",
        containerID: "div",
        startScreen: "gigya-update-profile-screen",
        conflictHandling: "saveProfileAndFail"
    };
    gigya.accounts.showScreenSet(params);
}
 
function showAccountJson() { 
    gigya.accounts.getAccountInfo({ callback:showResponse, include: "groups, *" });

    function showResponse(response) {
        document.getElementById('div').innerHTML = "<pre>"+JSON.stringify(response, undefined, 2)+"</pre>";
    }

}

async function showRegistration(containerID) {

    return new Promise((resolve, reject) => {
        var params = {
            screenSet: "Default-RegistrationLogin",
            containerID: containerID,
            startScreen: "gigya-register-screen",
            include:"groups",
            onAfterSubmit: r=>onCallback(r, resolve, reject)

        };
        gigya.accounts.showScreenSet(params);

    });

    function onCallback(response, resolve, reject){
        if ( response.errorCode != 0) {
            reject(response);
            return;
        }
        var account= loadAccount().catch(reject);
        account .then(r=>setAccountVariables(r));
        account .then(r=>resolve(r));

     }

}

 
function showSelfRegistration() {
    var params = {
        screenSet: "Default-OrganizationRegistration",
        containerID: "div",
        onAfterSubmit: showResponse

    };
    gigya.accounts.showScreenSet(params);

    function showResponse(eventObj) {
        if (eventObj.response.errorCode == 0) {
            document.getElementById('div').innerHTML = "<center> Request submitted</center>";
        }
    }
}


function openDelegatedAdmin() {
    gigya.accounts.b2b.openDelegatedAdminLogin({orgId:g_orgId});
}


 async function loadAccount() {
     return new Promise((resolve, reject) => {
         setTimeout(() => {
             gigya.accounts.getAccountInfo({ callback:r=>onCallback(r, resolve, reject), include: "groups, *" });
         }, 2000)
     });

     function onCallback(response, resolve, reject){
         if ( response.errorCode != 0) {
             reject(response);
             return;
         }
         setAccountVariables(response);
         resolve(response);
     }
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


function errorHandler(e) {
    console.log(e);
}





