//Apenas testando, a estrutura das tabelas de alunos é diferente.

import {open, close} from "../config/db";
import OracleDB from "oracledb";

export interface Estudante{
    id: number,
    ra: string,
    nome: string,
    email: string
};


// Obter todos os estudantes da tabela Estudantes do Oracle
export async function getAllEstudantes(): Promise<Estudante[]> {
    const conn = await open();
    try{
        const result = await conn.execute(
            `SELECT ID as "id", RA as "ra", NOME as "nome", EMAIL as "email" FROM ESTUDANTES`
        );
        return result.rows as Estudante[];
    }finally{
        await close(conn);
    }
}

// Obter o estudante pelo ID.
export async function getEstudanteById(id: number): Promise<Estudante | null> {
    const conn = await open();
    try{
        const result = await conn.execute(
            `SELECT ID as "id", RA as "ra", NOME as "nome", EMAIL as "email" FROM ESTUDANTES
            WHERE ID = :id`,
            [id]
        );
        return (result.rows && result.rows[0]) as Estudante | null;
    }finally{
        await close(conn);
    }
}

export async function addEstudante(ra: string, nome: string, email: string): Promise<number> {
    const conn = await open();
    try{
        const result = await conn.execute<{outBinds : {id: number}}>(
            `
            INSERT INTO ESTUDANTES (RA, NOME, EMAIL)
            VALUES (:ra, :nome, :email)
            RETURNING ID INTO :id
            `,
            {ra, nome, email, id: {dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER}},
            {autoCommit: true}
        );

        const outBinds = result.outBinds as {id?: number[]} | undefined;

        if(!outBinds || !outBinds.id || outBinds.id.length === 0){
            throw new Error("Erro ao obter um ID retornado na inserção de Estudante.");
        }

        return outBinds.id[0];
        
    }finally{
        await close(conn);
    }
}
