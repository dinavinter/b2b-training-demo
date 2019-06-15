var g_clientId ="OvHHZLi5dcoVQP3iR60e2LHTUPuFPxJ8";
var g_secret  =  "5nAHJTrNukzEpOA74snLmRLWQkhvGOwI";


require.config({
    paths: {
        'crypto-js': 'path-to/bower_components/crypto-js/crypto-js'
    }
});

require(["crypto-js"], function (CryptoJS) {
    console.log(CryptoJS.HmacSHA1("Message", "Key"));
});


// Defining our token parts
var header = {
    "alg": "HS256",
    "typ": "JWT"
};

var iat = Math.floor(new Date().getTime()/1000);
var minutesToAdd = 5;
var exp = iat + minutesToAdd*60;

var data = {
    "iss":  g_clientId,
    "exp": exp,
    "iat": iat,
};


function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}

var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
var encodedHeader = base64url(stringifiedHeader);

var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
var encodedData = base64url(stringifiedData);

var headerAndData = encodedHeader + "." + encodedData;
var secret = g_secret;

signature = CryptoJS.HmacSHA256(headerAndData, CryptoJS.enc.Base64.parse(secret));
signature = base64url(signature);

var jwt = headerAndData + "." + signature;
console.log("jwt token created: " + jwt);

pm.environment.set("token", jwt);
