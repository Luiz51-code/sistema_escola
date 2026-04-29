import conexao from "../config/db.js";

export const findAllTurmas = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT 
        t.id,
        t.nome,
        t.ano_letivo,
        t.professor_id,
        COALESCE(p.nome, 'Sem professor') AS professor
      FROM turmas t
      LEFT JOIN professores p ON p.id = t.professor_id
    `);

    return rows;
  } finally {
    conn.release();
  }
};

export const createTurma = async (turma) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      `INSERT INTO turmas (nome, ano_letivo, professor_id)
       VALUES (?, ?, ?)`,
      [
        turma.nome,
        turma.ano_letivo,
        turma.professor_id ?? null
      ]
    );
  } finally {
    conn.release();
  }
};

export const updateTurma = async (id, turma) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      `UPDATE turmas 
       SET nome=?, ano_letivo=?, professor_id=? 
       WHERE id=?`,
      [
        turma.nome,
        turma.ano_letivo,
        turma.professor_id ?? null,
        id
      ]
    );
  } finally {
    conn.release();
  }
};

export const deleteTurma = async (id) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query("DELETE FROM turmas WHERE id=?", [id]);
  } finally {
    conn.release();
  }
};