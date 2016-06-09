$ openssl genrsa -out private.pem 2048
$ openssl rsa -in private.pem -pubout -out public.pem

$ openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.pem -out certificate.crt

$ 