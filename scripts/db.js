import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '1234',
    database: 'notaDez'
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log("✅ Conectado ao banco MySQL!");
  }
});

export default connection;