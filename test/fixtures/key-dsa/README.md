The keying material in this directory consists of a PEM encoded private key and
a PEM encoded public key, generated with the following command:

$ openssl dsaparam -genkey 1024 -out 2.pem
$ openssl dsa -in 2.pem -pubout -out public/2.pem
