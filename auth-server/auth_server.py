#pip install flask flask_sslify flask_cors requests 


from flask import Flask, Response, make_response, request
from flask_sslify import SSLify
from flask_cors import CORS
import os
import requests

from client_jwt import create_client_jwt

app = Flask(__name__)
CORS(app)
sslify = SSLify(app)

@app.route("/")
def hello():
    return "Auth server!"
    
@app.route("/token/<api_key>/<app_id>/<org_id>/<uid>", methods=["GET", "POST"])
def auth_token(api_key, app_id, org_id, uid):            
    plainId = "us1api.b2b-gigya.com"
    CLIENT_ID = "0evun2M3mvCW6uuuIMIVBc8JYEIt2wCd"
    CLIENT_SECRET = "E5T8O8jPyfJwRJPiJvxZ2sgthhsGrWJE"
    client_id = CLIENT_ID
    client_secret = CLIENT_SECRET
    
    auth_msg = {
        "identity": {
            "type" :"user",
            "id":  uid
        },
        "context": {
            "organization":  org_id
        }
    }
    
    URL = "https://{plainId}/runtime/{api_key}/authorization/token/{app_id}".format(**locals());
    encoded_jwt = create_client_jwt(client_id, client_secret)    
    resp = requests.post(URL, json=auth_msg, headers={"Authorization": "Bearer %s" % (encoded_jwt)})
    res = make_response(resp.content)
    res.headers = dict(resp.headers)
    return res, resp.status_code

        
if __name__ == "__main__":
     app.run( debug = True, port=6580)
    #context = ('server3.crt', 'server3.key')
    #app.run( debug = True, ssl_context = context, port=6580)
    #app.run( debug = True, ssl_context = 'adhoc')  # Generate Adhoc Certs