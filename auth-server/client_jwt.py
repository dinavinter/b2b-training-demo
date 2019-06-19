# pip install jwt requests
import jwt
import requests
import time

def create_client_jwt(client_id, client_secret):
    iat = int(time.time())
    message = {
        'iss': client_id,
        'iat': iat,
        'exp': iat + 300,
    }

    encoded_jwt = jwt.encode(message, client_secret.decode("base64"), algorithm='HS256')
    return encoded_jwt
    
def main():
    CLIENT_ID = "OvHHZLi5dcoVQP3iR60e2LHTUPuFPxJ8"
    CLIENT_SECRET = "5nAHJTrNukzEpOA74snLmRLWQkhvGOwI"
    API_KEY = "3_kkSKeD-UGbjbWrnnXD1nl7xOsitRcHhjUGlYNzVTH3wFLddMDnNXPVARspAdJ5O6"

    UID = "a46c64b44c4a4611ad6e35f5b644014f"
    ORG_ID = "fe11eaff-695a-4b09-8324-3ed35723ae54"

    APP_ID = "1NOAHBNU8J0AJUENVRC9"
    
    body = {
        "identity": {
            "type" :"user",
            "id":  UID
        },
        "context": {
            "organization":  ORG_ID
        }}
    

    URL = "https://us1api.b2b-gigya.com/runtime/%s/authorization/token/%s" % (API_KEY, APP_ID)
    resp = requests.post(URL, json=body, headers={"Authorization": "Bearer %s" % encoded_jwt})
    print(resp)
    print(resp.text)
    
if __name__ == "__main__":
    main()