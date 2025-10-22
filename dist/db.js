"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb_1 = __importDefault(require("oracledb"));
async function connectToOracle() {
    try {
        // Configurações da Wallet
        oracledb_1.default.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_13" }); // ajuste o caminho se usar Instant Client
        const connection = await oracledb_1.default.getConnection({
            user: "ADMIN", // seu usuário Oracle
            password: "1Quatroooooooooooooooooo", // senha do banco
            connectString: "notadez_high", // nome do serviço no tnsnames.ora
            walletLocation: "C:\\Users\\migue\\Downloads\\Wallet_notaDez.zip",
            walletPassword: "1Quatroooooooooooooooooo", // a senha definida na hora do download
        });
        console.log("✅ Conectado ao Oracle com sucesso!");
        const result = await connection.execute(`SELECT sysdate FROM dual`);
        console.log("🕒 Data e hora do servidor:", result.rows);
        await connection.close();
        console.log("🔒 Conexão encerrada.");
    }
    catch (err) {
        console.error("❌ Erro ao conectar:", err);
    }
}
connectToOracle();
