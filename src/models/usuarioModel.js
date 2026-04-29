// // models/usuarioModel.js
// import conexao from "../config/db.js";

// export const buscarTodosUsuarios = async () => {
//   let conn;

//   try {
//     conn = await conexao.getConnection();

//     const [usuarios] = await conn.query(`
//       SELECT id, nome, email, perfil, criado_em
//       FROM usuarios
//     `);

//     return usuarios;
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// };

// models/usuarioModel.js
import conexao from "../config/db.js";

// 🔍 Buscar todos os usuários
export const buscarTodosUsuarios = async () => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [usuarios] = await conn.query(`
      SELECT id, nome, email, perfil, criado_em
      FROM usuarios
    `);

    return usuarios;
  } finally {
    if (conn) conn.release();
  }
};

// 🔍 Buscar usuário por ID
export const buscarUsuarioPorId = async (id) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [usuario] = await conn.query(
      `
      SELECT id, nome, email, perfil, criado_em
      FROM usuarios
      WHERE id = ?
      `,
      [id]
    );

    return usuario[0];
  } finally {
    if (conn) conn.release();
  }
};

// ✏️ Atualizar usuário
export const atualizarUsuarioModel = async (id, dados) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const { nome, email, perfil } = dados;

    await conn.query(
      `
      UPDATE usuarios
      SET nome = ?, email = ?, perfil = ?
      WHERE id = ?
      `,
      [nome, email, perfil, id]
    );

    return { mensagem: "Usuário atualizado com sucesso" };
  } finally {
    if (conn) conn.release();
  }
};

// ❌ Deletar usuário
export const deletarUsuarioModel = async (id) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    await conn.query(
      `
      DELETE FROM usuarios
      WHERE id = ?
      `,
      [id]
    );

    return { mensagem: "Usuário deletado com sucesso" };
  } finally {
    if (conn) conn.release();
  }
};

export const criarUsuarioModel = async ({ nome, email, senha }) => {
  let conn;

  try {
    conn = await conexao.getConnection();

    const [result] = await conn.query(
      `
      INSERT INTO usuarios (nome, email, senha, perfil)
      VALUES (?, ?, ?, ?)
      `,
      [nome, email, senha, "usuario"]
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};