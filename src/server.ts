import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { request } from "http";
import cors from "cors";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

console.log("API KEY:", process.env.RESEND_API_KEY);
import {
    getAllEstudantes,
    getEstudanteById,
    addEstudante,
} from "./db/estudantes";

import {
    gerarCodigoVericacao,
    enviarCodigoVerificacao
} from "./services/email";


const app = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(cors());

//definindo as rotas

app.get("/estudantes", async (req: Request, res: Response) => {
    try {
        const estudantes = await getAllEstudantes();
        res.json(estudantes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "error": "Erro ao buscar estudantes"
        });
    }
});

//rota para obter um estudante pelo ID.

app.get("/estudantes/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const estudante = await getEstudanteById(id);
        if (estudante) {
            res.json(estudante);
        } else {
            res.status(404).json({ massage: "Estudante não encontrado com o ID fornecido" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar estudante pelo ID fornecido." })
    }
});

// Rota para inserir um estudante.
app.post("/estudante", async (req: Request, res: Response) => {
    try {
        const { ra, nome, email } = req.body;
        if (!ra || !nome || !email) {
            return res.status(400).json({ error: "Campos RA, Nome e Email são obrigatórios" });
        }
        const id = await addEstudante(ra, nome, email);
        res.status(201).json({ message: "Estudante adicionado com sucesso", id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao inserir estudante." })
    }
})

app.post('/enviar-codigo', async (req: Request, res: Response) => {

    console.log("📩 Dados recebidos:", req.body);
    try {
        const { nome, email } = req.body;

        const codigo = gerarCodigoVericacao();

        await enviarCodigoVerificacao(email, nome, codigo);

        res.json({
            mensagem: 'Código enviado',
            codigo
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao enviar o código' });
    }
});

app.listen(port, '0.0.0.0', () => console.log("🚀 Servidor rodando em http://localhost:3000"));

// definir a rota default;
app.get("/", (req: Request, res: Response) => {
    res.send("Rota default. Server port: 3000");
});

// rota de ping/pong (teste de requisicao)
app.post("/printRequest", (req: Request, res: Response) => {
    const dadosRecebidos = req.body;
    res.json({
        mensagem: "Dados recebidos com sucesso!",
        dadosRecebidos
    });
});

