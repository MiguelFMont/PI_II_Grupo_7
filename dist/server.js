"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const oracledb_1 = __importDefault(require("oracledb"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
// Configuração Oracle
oracledb_1.default.initOracleClient({ libDir: "C:\\Users\\migue\\Downloads\\instantclient-basic-windows.x64-23.9.0.25.07.zip" });
async function getConnection() {
    return await oracledb_1.default.getConnection({
        user: "ADMIN",
        password: "1Quatroooooooooooooooooo",
        connectString: "db2025_high", // nome no tnsnames.ora
        walletLocation: "C:\\Users\\migue\\Downloads\\Wallet_notaDez.zip",
        walletPassword: "1Quatroooooooooooooooooo",
    });
}
// Rota de teste
app.get("/api/usuarios", async (req, res) => {
    try {
        const conn = await getConnection();
        const result = await conn.execute("SELECT * FROM ALUNO");
        res.json(result.rows);
        await conn.close();
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar o banco");
    }
});
app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));
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
