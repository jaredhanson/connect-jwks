The keying material in this directory consists of a PEM encoded private key and
a self-signed, PEM encoded certificate, generated with the following command:

$ openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout A.pem -out public/A.pem
