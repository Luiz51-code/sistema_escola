import conexao from "../config/db.js";

// 🔍 Buscar todos os professores
export const buscarTodosProfessoresModel = async () => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(`
      SELECT * FROM professores
    `);

    return rows;
  } finally {
    conn.release();
  }
};

// 🔍 Buscar professor por ID
export const buscarProfessorPorIdModel = async (id) => {
  const conn = await conexao.getConnection();

  try {
    const [rows] = await conn.query(
      `
      SELECT * FROM professores
      WHERE id = ?
      `,
      [id]
    );

    return rows[0];
  } finally {
    conn.release();
  }
};

// ➕ Criar professor
export const criarProfessorModel = async (professor) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      `
      INSERT INTO professores 
      (nome, email, telefone, especialidade)
      VALUES (?, ?, ?, ?)
      `,
      [
        professor.nome,
        professor.email,
        professor.telefone,
        professor.especialidade
      ]
    );
  } finally {
    conn.release();
  }
};

// ✏️ Atualizar professor
export const atualizarProfessorModel = async (id, professor) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      `
      UPDATE professores 
      SET nome=?, email=?, telefone=?, especialidade=? 
      WHERE id=?
      `,
      [
        professor.nome,
        professor.email,
        professor.telefone,
        professor.especialidade,
        id
      ]
    );
  } finally {
    conn.release();
  }
};

// ❌ Deletar professor
export const deletarProfessorModel = async (id) => {
  const conn = await conexao.getConnection();

  try {
    await conn.query(
      "DELETE FROM professores WHERE id=?",
      [id]
    );
  } finally {
    conn.release();
  }
};