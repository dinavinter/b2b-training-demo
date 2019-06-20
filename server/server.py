from flask import Flask, Response, make_response, request
from flask_sslify import SSLify
from flask_cors import CORS
import os
import requests
from client_jwt import create_client_jwt
import json

WEBDIR = os.path.abspath("../")

app = Flask(__name__)
sslify = SSLify(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')    
def route_all(path):
    if ".." in path or path.startswith("/") or "//" in path:
        return "FU"
        
    if not path:
        path = "index.html"
 
    fpath = os.path.join(WEBDIR, path)
    if os.path.isdir(fpath):
        return "Dir!"
    elif os.path.isfile(fpath):
        resp = make_response(open(fpath, "rb").read())
        _, ext = os.path.splitext(fpath)
        if ext == ".js":
            resp.headers["Content-Type"] = "text/javascript"
        elif ext == ".css":
            resp.headers["Content-Type"] = "text/css"
        return resp
    elif os.path.exists(fpath):
        return "Unk file type"
    return "404"

@app.route("/token/<api_key>/<app_id>/<org_id>/<uid>", methods=["GET", "POST"])
def auth_token(api_key, app_id, org_id, uid):            
    plainId = "us1api.b2b-gigya.com"
    #CLIENT_ID = "0evun2M3mvCW6uuuIMIVBc8JYEIt2wCd"
    #CLIENT_SECRET = "E5T8O8jPyfJwRJPiJvxZ2sgthhsGrWJE"
    #import pdb; pdb.set_trace()
    with open('data.json') as json_file:  
         data = json.load(json_file)

    client_id = data['client_id']
    client_secret = data['client_secret']

    
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

@app.route("/creds/<client_id>/<client_secret>", methods=["GET", "POST"])
def set_creds(client_id, client_secret): 
    data = {}           
    data['client_id'] = client_id 
    data['client_secret'] = client_secret

    with open('data.json', 'w') as outfile:  
         json.dump(data, outfile)
  
    return "200"

if __name__ == "__main__":
    # app.run(debug=True, port=4580)
     context = ('server3.crt', 'server3.key')
     app.run(debug=True, ssl_context=context, port=4580)
    #app.run( debug = True, ssl_context = 'adhoc')  # Generate Adhoc Certs