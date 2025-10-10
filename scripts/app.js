// Referenciando os pacotes necessários
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./db'); // Importando a conexão com o banco de dados

const port = 3000;
const webServerApp = express();

webServerApp.use(bodyParser.json());
webServerApp.use(cors());

// Rota padrão
webServerApp.get('/', (req,res)=>{
    res.send('Teste da rota padrão');
});

webServerApp.listen(port);