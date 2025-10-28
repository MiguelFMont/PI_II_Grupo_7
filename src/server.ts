import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { request } from "http";
import cors from "cors";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

import {
    getAllEstudantes,
    getEstudanteById,
    addEstudante,
} from "./db/estudantes";

dotenv.config();

const app = express();
const port: number = 3000;

app.use(bodyParser.json());

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
    try{
        const id = Number(req.params.id);
        const estudante = await getEstudanteById(id);
        if (estudante) {
            res.json(estudante);
        } else {
            res.status(404).json({ massage: "Estudante não encontrado com o ID fornecido" })
        }
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Erro ao buscar estudante pelo ID fornecido."})
    }
});

// Rota para inserir um estudante.
app.post("/estudante", async(req:Request, res:Response) => {
    try{
        const {ra, nome, email} = req.body;
        if(!ra || !nome || !email){
            return res.status(400).json({error: "Campos RA, Nome e Email são obrigatórios"});
        }
        const id = await addEstudante(ra, nome, email);
        res.status(201).json({message: "Estudante adicionado com sucesso", id});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Erro ao inserir estudante."})
    }
})

app.listen(port, () => console.log("🚀 Servidor rodando em http://localhost:3000"));

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

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

