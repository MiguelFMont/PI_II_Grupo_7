"use strict";
//Apenas testando, a estrutura das tabelas de alunos é diferente.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEstudantes = getAllEstudantes;
exports.getEstudanteById = getEstudanteById;
exports.addEstudante = addEstudante;
const db_1 = require("../config/db");
const oracledb_1 = __importDefault(require("oracledb"));
;
// Obter todos os estudantes da tabela Estudantes do Oracle
async function getAllEstudantes() {
    const conn = await (0, db_1.open)();
    try {
        const result = await conn.execute(`SELECT ID as "id", RA as "ra", NOME as "nome", EMAIL as "email" FROM ESTUDANTES`);
        return result.rows;
    }
    finally {
        await (0, db_1.close)(conn);
    }
}
// Obter o estudante pelo ID.
async function getEstudanteById(id) {
    const conn = await (0, db_1.open)();
    try {
        const result = await conn.execute(`SELECT ID as "id", RA as "ra", NOME as "nome", EMAIL as "email" FROM ESTUDANTES
            WHERE ID = :id`, [id]);
        return (result.rows && result.rows[0]);
    }
    finally {
        await (0, db_1.close)(conn);
    }
}
async function addEstudante(ra, nome, email) {
    const conn = await (0, db_1.open)();
    try {
        const result = await conn.execute(`
            INSERT INTO ESTUDANTES (RA, NOME, EMAIL)
            VALUES (:ra, :nome, :email)
            RETURNING ID INTO :id
            `, { ra, nome, email, id: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER } }, { autoCommit: true });
        const outBinds = result.outBinds;
        if (!outBinds || !outBinds.id || outBinds.id.length === 0) {
            throw new Error("Erro ao obter um ID retornado na inserção de Estudante.");
        }
        return outBinds.id[0];
    }
    finally {
        await (0, db_1.close)(conn);
    }
}
