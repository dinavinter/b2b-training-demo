#import BaseHTTPServer, SimpleHTTPServer
#import ssl
from flask import Flask, Response, make_response, request
from flask_sslify import SSLify
from flask_cors import CORS
import os
import requests

from client_jwt import create_client_jwt

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

if __name__ == "__main__":
    context = ('server3.crt', 'server3.key')
    app.run(debug=True, ssl_context=context, port=4580)
    #app.run( debug = True, ssl_context = 'adhoc')  # Generate Adhoc Certs