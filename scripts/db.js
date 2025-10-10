//importando o múdulo do banco de dados
const mysql = require('mysql2');

//criando a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'notadez'
});

// testando a conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});
//exportando a conexão para ser usada em outros arquivos
module.exports = connection;