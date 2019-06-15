import BaseHTTPServer, SimpleHTTPServer
import ssl
import os

os.chdir("..\\")

httpd = BaseHTTPServer.HTTPServer(('localhost', 1443), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, server_side=True,
                                certfile='pyton\\yourpemfile.pem')
httpd.serve_forever()