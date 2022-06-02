const cors= require("cors")
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/privatekey.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {
    key: privateKey,
    cert: certificate
    //En caso de que protejan su llave agreguen el atributo passphrase: '<su frase>'
};
var express = require('express');
var app = express();
app.use(cors())
// your express configuration here

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.get('/principal',(req,res)=>{
    console.log("Entrex30");
    res.send(JSON.stringify({Mensaje: "Sirvio https"}))
})

//No es necesario que tengan tanto el protocolo http y https funcionando al mismo tiempo
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8081,()=>console.log("Corriendo http 8080"));
httpsServer.listen(8082,()=>console.log("Corriendo HTTPS 8443"));