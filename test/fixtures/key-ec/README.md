$ openssl ecparam -name secp521r1 -genkey -param_enc explicit -out 3.key
$ openssl ec -in 3.key -pubout -out public/3.key
