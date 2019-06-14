function errorHandler(e) {
    console.log(e);
}



function showGetAccountInfoResponse(response) {
    document.getElementById('div').innerHTML = "<pre>"+JSON.stringify(response, undefined, 2)+"</pre>";
 }

 function showResponse(eventObj) {
    if (eventObj.response.errorCode == 0) {
        document.getElementById('div').innerHTML = "<center>Logged in UID: "+ eventObj.response.UID+"</center>";
    }
}
 

function logout() {
    gigya.socialize.logout({onError: errorHandler, callbac:showGetAccountInfoResponse})
}



function showProfile() {
    var params = {
        screenSet: "Default-ProfileUpdate",
        containerID: "div",
        startScreen: "gigya-update-profile-screen",
        conflictHandling: "saveProfileAndFail"
    }
    gigya.accounts.showScreenSet(params);
}
 
function showAccountJson() { 
    gigya.accounts.getAccountInfo({ callback:showGetAccountInfoResponse, regToken: regToken, include: "*" });

}


function showGetUserInfoJson() { 
    gigya.socialize.getUserInfo({ callback:showGetAccountInfoResponse })
};
 
function showRegistration() {
    var params = {
        screenSet: "Default-RegistrationLogin",
        containerID: "div",
        startScreen: "gigya-register-screen",
        onAfterSubmit: showResponse

    }
    gigya.accounts.showScreenSet(params);
}

 
function showSelfRegistration() {
    var params = {
        screenSet: "Default-OrganizationRegistration",
        containerID: "div", 
        onAfterSubmit: showResponse

    }
    gigya.accounts.showScreenSet(params);
}

