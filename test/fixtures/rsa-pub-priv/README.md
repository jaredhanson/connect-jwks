$ openssl genrsa -out private.pem 2048
$ openssl rsa -in private.pem -pubout -out public.pem

$ openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.pem -out certificate.crt

$ https://support.ssl.com/Knowledgebase/Article/View/19/0/der-vs-crt-vs-cer-vs-pem-certificates-and-how-to-convert-them


https://www.sslshopper.com/article-most-common-openssl-commands.html
https://kb.wisc.edu/middleware/page.php?id=4064
