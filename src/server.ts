import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import { request } from "http";
import cors from "cors";
import path from "path";

const app = express();
const port: number = 3000;
app.use(bodyParser.json());

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