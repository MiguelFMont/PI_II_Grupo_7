import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, email, telefone, senha } = req.body;
  const sql = "INSERT INTO usuarios (nome, email, telefone_celular, senha) VALUES (?, ?, ?, ?)";
  connection.query(sql, [nome, email, telefone_celular, senha], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ ok: false, message: "Erro ao cadastrar." });
    }
    res.json({ ok: true, message: "Usuário cadastrado com sucesso!" });
  });
});