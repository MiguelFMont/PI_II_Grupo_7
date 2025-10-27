import {open, close} from "../config/db";
import OracleDB from "oracledb";

export interface Docentes {
    id_docente: number,
    nome: string,
    email: string,
    telefone: string,
    senha: string
}

