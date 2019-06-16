import BaseHTTPServer, SimpleHTTPServer
import ssl
import os

os.chdir("..\\")

httpd = BaseHTTPServer.HTTPServer(('localhost', 5000), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, server_side=True,
                                certfile='pyton\\server3.crt', keyfile="pyton\\server3.key")
httpd.serve_forever()