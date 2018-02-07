var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 8080;
var router = express.Router();

router.get('/', (req, res) =>  res.json({mensagem: "Tá funcionando certinho"}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port);
console.log('Servidor iniciado com sucesso na porta 8080');