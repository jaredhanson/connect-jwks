The keying material in this directory consists of a PEM encoded private key and
a PEM encoded public key, generated with the following command:

$ openssl genrsa -out abc.key 2048
$ openssl rsa -in abc.key -pubout -out public/abc.key
