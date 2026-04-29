// src/models/alunoModel.js

import conexao from "../config/db.js";

export const listarAlunosModel = async () => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [alunos] = await conn.query(`
      SELECT
        a.id,
        a.nome,
        a.cpf,
        a.email,
        a.telefone,
        a.data_nascimento,
        a.turma_id,
        a.status,
        t.nome AS turma
      FROM alunos a
      LEFT JOIN turmas t ON a.turma_id = t.id
      ORDER BY a.nome
    `);

    return alunos;
  } finally {
    if (conn) conn.release();
  }
};

export const buscarAlunoPorIdModel = async (id) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [rows] = await conn.query(
      `
      SELECT
        a.id,
        a.nome,
        a.cpf,
        a.email,
        a.telefone,
        a.data_nascimento,
        a.turma_id,
        a.status,
        t.nome AS turma
      FROM alunos a
      LEFT JOIN turmas t ON a.turma_id = t.id
      WHERE a.id = ?
      `,
      [id]
    );

    return rows[0] || null;
  } finally {
    if (conn) conn.release();
  }
};

export const criarAlunoModel = async ({
  nome,
  cpf,
  email,
  telefone,
  data_nascimento,
  turma_id,
  status,
}) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `
      INSERT INTO alunos
      (nome, cpf, email, telefone, data_nascimento, turma_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nome,
        cpf,
        email,
        telefone,
        data_nascimento,
        turma_id,
        status || "ativo",
      ]
    );

    return result.insertId;
  } finally {
    if (conn) conn.release();
  }
};

export const atualizarAlunoModel = async (
  id,
  {
    nome,
    cpf,
    email,
    telefone,
    data_nascimento,
    turma_id,
    status,
  }
) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `
      UPDATE alunos
      SET
        nome = ?,
        cpf = ?,
        email = ?,
        telefone = ?,
        data_nascimento = ?,
        turma_id = ?,
        status = ?
      WHERE id = ?
      `,
      [
        nome,
        cpf,
        email,
        telefone,
        data_nascimento,
        turma_id,
        status,
        id,
      ]
    );

    return result.affectedRows;
  } finally {
    if (conn) conn.release();
  }
};

export const removerAlunoModel = async (id) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [result] = await conn.query(
      "DELETE FROM alunos WHERE id = ?",
      [id]
    );

    return result.affectedRows;
  } finally {
    if (conn) conn.release();
  }
};