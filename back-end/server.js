const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const jsonParser = bodyParser.json({ inflate: true });
const urlParser = bodyParser.urlencoded({ extended: true });

mongoose.connect("mongodb://root:nova159147@ds125588.mlab.com:25588/forca");

const palavraRouter = require('./app/router/palavra-router')(router, jsonParser, urlParser, mongoose);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/palavra', palavraRouter);
app.listen(8080);

console.log('Servidor iniciado com sucesso na porta 8080');