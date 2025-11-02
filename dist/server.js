"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("API KEY:", process.env.RESEND_API_KEY);
const email_1 = require("./services/email");
const app = (0, express_1.default)();
const port = 3000;
let codigoAtivo;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//definindo as rotas
// app.get("/estudantes", async (req: Request, res: Response) => {
//     try {
//         const estudantes = await getAllEstudantes();
//         res.json(estudantes);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             "error": "Erro ao buscar estudantes"
//         });
//     }
// });
// //rota para obter um estudante pelo ID.
// app.get("/estudantes/:id", async (req: Request, res: Response) => {
//     try {
//         const id = Number(req.params.id);
//         const estudante = await getEstudanteById(id);
//         if (estudante) {
//             res.json(estudante);
//         } else {
//             res.status(404).json({ massage: "Estudante não encontrado com o ID fornecido" })
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Erro ao buscar estudante pelo ID fornecido." })
//     }
// });
// // Rota para inserir um estudante.
// app.post("/estudante", async (req: Request, res: Response) => {
//     try {
//         const { ra, nome, email } = req.body;
//         if (!ra || !nome || !email) {
//             return res.status(400).json({ error: "Campos RA, Nome e Email são obrigatórios" });
//         }
//         const id = await addEstudante(ra, nome, email);
//         res.status(201).json({ message: "Estudante adicionado com sucesso", id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Erro ao inserir estudante." })
//     }
// })
app.post('/verificar-codigo', async (req, res) => {
    const { codigo } = req.body;
    const codigoCerto = codigoAtivo;
    console.log(`Verificando o código: ${codigoCerto}`, req.body);
    if (!codigoCerto) {
        return res.status(400).json({ sucesso: false, mensagem: "Código não encontrado ou expirado!" });
    }
    if (codigoCerto === codigo) {
        codigoAtivo = '';
        return res.json({ sucesso: true, mensagem: "Código verificado com sucesso!" });
    }
    else {
        return res.status(400).json({ sucesso: false, mensagem: "Código incorreto." });
    }
});
app.post('/enviar-codigo', async (req, res) => {
    console.log("📩 Dados recebidos:", req.body);
    try {
        const { nome, email } = req.body;
        const codigo = (0, email_1.gerarCodigoVericacao)();
        await (0, email_1.enviarCodigoVerificacao)(email, nome, codigo);
        codigoAtivo = codigo;
        res.json({
            mensagem: 'Código enviado',
            codigo
        });
    }
    catch (error) {
        res.status(500).json({ erro: 'Erro ao enviar o código' });
    }
});
app.listen(port, '0.0.0.0', () => console.log("🚀 Servidor rodando em http://localhost:3000"));
// definir a rota default;
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '../index.html'));
});
// rota de ping/pong (teste de requisicao)
app.post("/printRequest", (req, res) => {
    const dadosRecebidos = req.body;
    res.json({
        mensagem: "Dados recebidos com sucesso!",
        dadosRecebidos
    });
});
