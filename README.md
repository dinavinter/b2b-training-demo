# b2b-training-demo
 
**Site config**
* Create a new site in CDC
* Go to "Site Settings" in CDC and add .*/github.io/* and .*/localhost/* to trusted urls
* Enable site under "Organization management"
* Follow wave 2 to build all policy 
 

**Working on remote site**
Demo published to https://dinavinter.github.io/b2b-training-demo

To avoid CORS errors launch chrome with the following command:

"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp  https://dinavinter.github.io/b2b-training-demo

**Web site setup**
* Go to 'Auth Service Config' 
    * set 'use athorization service' to false
    * set clientId and clientSecret from site settings in plainId 
* Go to "Client config"
    * set your apiKey and domain  

**Working local**

* Clone repository or create your own using "template repository"
* Run server\install.bat
* In powershell:
    * cd  .\server
    * py .\server.py

* Browse https:\\localhost:4580\index.html
 
**Web site setup**
* Go to 'Auth Service Config' 
    * set 'use athorization service' to true
    * set clientId and clientSecret from site settings in plainId 
    * press on "go to mainPage"
* Go to "Client config"
    * set your apiKey and domain 
    * press on "go to mainPage" 


