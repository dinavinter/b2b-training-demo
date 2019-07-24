# pip install jwt requests
import jwt
import requests
import time 
import base64

def create_client_jwt(client_id, client_secret):
    iat = int(time.time())
    message = {
        'iss': client_id,
        'iat': iat,
        'exp': iat + 500,
    }
 
    header = {"alg":"HS256","typ":"JWT"}
    b64_string = base64.b64decode(client_secret)
    encoded_jwt = jwt.encode(message, b64_string  , algorithm='HS256' , headers= header)
    return  str(encoded_jwt, 'utf-8')
    
def main():
    CLIENT_ID = "0evun2M3mvCW6uuuIMIVBc8JYEIt2wCd"
    CLIENT_SECRET = "E5T8O8jPyfJwRJPiJvxZ2sgthhsGrWJE"
    API_KEY = "3_OnQvOXVIpn97YPJP6MYSMHLtYjuX0cusTWBfnm2PWJiO959CQOyMdJECTJJpwl3K"

    UID = "78302ee6d8a141f08c9efdba55787ad3"
    ORG_ID = "159a07a3-09a7-4b2b-8527-445c910689d4"

    APP_ID = "V8DP1YJFD2TCAHYF02SX"
    
    body = {
        "identity": {
            "type" :"user",
            "id":  UID
        },
        "context": {
            "organization":  ORG_ID
        }}
    

    URL = "https://us1api.b2b-gigya.com/runtime/%s/authorization/token/%s" % (API_KEY, APP_ID)
    encoded_jwt = create_client_jwt(CLIENT_ID, CLIENT_SECRET)
    header = "Bearer %s" % (encoded_jwt)

    print(URL)
    print(body) 
    print(header) 
    

    resp = requests.post(URL, json=body, headers={"Authorization": header})
    
    print(resp.text)
    
if __name__ == "__main__":
    main()