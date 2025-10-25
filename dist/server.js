"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const estudantes_1 = require("./db/estudantes");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
//definindo as rotas
app.get("/estudantes", async (req, res) => {
    try {
        const estudantes = await (0, estudantes_1.getAllEstudantes)();
        res.json(estudantes);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            "error": "Erro ao buscar estudantes"
        });
    }
});
//rota para obter um estudante pelo ID.
app.get("/estudantes/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const estudante = await (0, estudantes_1.getEstudanteById)(id);
        if (estudante) {
            res.json(estudante);
        }
        else {
            res.status(404).json({ massage: "Estudante não encontrado com o ID fornecido" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar estudante pelo ID fornecido." });
    }
});
// Rota para inserir um estudante.
app.post("/estudante", async (req, res) => {
    try {
        const { ra, nome, email } = req.body;
        if (!ra || !nome || !email) {
            return res.status(400).json({ error: "Campos RA, Nome e Email são obrigatórios" });
        }
        const id = await (0, estudantes_1.addEstudante)(ra, nome, email);
        res.status(201).json({ message: "Estudante adicionado com sucesso", id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao inserir estudante." });
    }
});
app.listen(port, () => console.log("🚀 Servidor rodando em http://localhost:3000"));
// definir a rota default;
app.get("/", (req, res) => {
    res.send("Rota default. Server port: 3000");
});
// rota de ping/pong (teste de requisicao)
app.post("/printRequest", (req, res) => {
    const dadosRecebidos = req.body;
    res.json({
        mensagem: "Dados recebidos com sucesso!",
        dadosRecebidos
    });
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
