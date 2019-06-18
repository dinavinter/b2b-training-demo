# b2b-training-demo
Demo published to https://dinavinter.github.io/b2b-training-demo

To avoid CORS errors launch chrome with the following command:

"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp  https://dinavinter.github.io/b2b-training-demo/index.html

In order to config your site to work properly with the demo you need to add .*/github.io/* to trusted urls in site configuration, then use 'Config' to config your site details.

**Working with auth service - ptyon (version 27)**

Config service to use auth-service using 'auth service config' page 
Change clientId and secret in b2b-training-demo\auth-server\auth_server.py
install b2b-training-demo\rootCA.crt
Then run
b2b-training-demo\auth-server pip install requirments
b2b-training-demo\auth-server auth_server.py


**Browse files locally:**

**browse files using ptyon (version 27):**
b2b-training-demo\pyton-browse  pip install requirments
b2b-training-demo\pyton-browse  server.py
browse https://localhost:4580/index.html
 
**browse files using c# (.net core):**
b2b-training-demo\c#-browse dotnet run
browse https://localhost:5001/index.html




