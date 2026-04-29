

// import {
//   listarProfessoresModel,
//   buscarProfessorPorIdModel,
//   criarProfessorModel,
//   atualizarProfessorModel,
//   removerProfessorModel,
// } from "../models/professorModel.js";

// export const listarProfessores = async (req, res) => {
//   try {
//     const professores = await listarProfessoresModel();
//     return res.status(200).json(professores);
//   } catch (error) {
//     return res.status(500).json({
//       mensagem: "Erro ao listar professores",
//       erro: error.message,
//     });
//   }
// };

// export const buscarProfessorPorId = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const professor = await buscarProfessorPorIdModel(id);

//     if (!professor) {
//       return res.status(404).json({
//         mensagem: "Professor não encontrado",
//       });
//     }

//     return res.status(200).json(professor);
//   } catch (error) {
//     return res.status(500).json({
//       mensagem: "Erro ao buscar professor",
//       erro: error.message,
//     });
//   }
// };

// export const criarProfessor = async (req, res) => {
//   try {
//     const {
//       nome,
//       cpf,
//       email,
//       disciplina,
//     } = req.body;

//     // validação básica (evita 400 silencioso)
//     if (!nome || !cpf || !email || !disciplina) {
//       return res.status(400).json({
//         mensagem: "Campos obrigatórios faltando",
//       });
//     }

//     const result = await criarProfessorModel({
//       nome,
//       cpf,
//       email,
//       disciplina,
//     });

//     return res.status(201).json({
//       mensagem: "Professor cadastrado com sucesso",
//       id: result.insertId,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       mensagem: "Erro ao cadastrar professor",
//       erro: error.message,
//     });
//   }
// };

// export const atualizarProfessor = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const professorExiste = await buscarProfessorPorIdModel(id);

//     if (!professorExiste) {
//       return res.status(404).json({
//         mensagem: "Professor não encontrado",
//       });
//     }

//     await atualizarProfessorModel(id, req.body);

//     return res.status(200).json({
//       mensagem: "Professor atualizado com sucesso",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       mensagem: "Erro ao atualizar professor",
//       erro: error.message,
//     });
//   }
// };

// export const removerProfessor = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const professorExiste = await buscarProfessorPorIdModel(id);

//     if (!professorExiste) {
//       return res.status(404).json({
//         mensagem: "Professor não encontrado",
//       });
//     }

//     await removerProfessorModel(id);

//     return res.status(200).json({
//       mensagem: "Professor removido com sucesso",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       mensagem: "Erro ao remover professor",
//       erro: error.message,
//     });
//   }
// };

import {
  buscarTodosProfessoresModel,
  buscarProfessorPorIdModel,
  criarProfessorModel,
  atualizarProfessorModel,
  deletarProfessorModel,
} from "../models/professorModel.js";

// 🔍 Listar todos os professores
export const listarProfessores = async (req, res) => {
  try {
    const professores = await buscarTodosProfessoresModel();
    return res.status(200).json(professores);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar professores",
      erro: error.message,
    });
  }
};

// 🔍 Buscar professor por ID
export const buscarProfessorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const professor = await buscarProfessorPorIdModel(id);

    if (!professor) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    return res.status(200).json(professor);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar professor",
      erro: error.message,
    });
  }
};

// ➕ Criar professor
export const criarProfessor = async (req, res) => {
  try {
    const { nome, email, telefone, especialidade } = req.body;

    if (!nome || !email || !telefone || !especialidade) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios faltando",
      });
    }

    await criarProfessorModel({
      nome,
      email,
      telefone,
      especialidade,
    });

    return res.status(201).json({
      mensagem: "Professor criado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao criar professor",
      erro: error.message,
    });
  }
};

// ✏️ Atualizar professor
export const atualizarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const professorExiste = await buscarProfessorPorIdModel(id);

    if (!professorExiste) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    await atualizarProfessorModel(id, req.body);

    return res.status(200).json({
      mensagem: "Professor atualizado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar professor",
      erro: error.message,
    });
  }
};

// ❌ Remover professor
export const removerProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const professorExiste = await buscarProfessorPorIdModel(id);

    if (!professorExiste) {
      return res.status(404).json({
        mensagem: "Professor não encontrado",
      });
    }

    await deletarProfessorModel(id);

    return res.status(200).json({
      mensagem: "Professor removido com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao remover professor",
      erro: error.message,
    });
  }
};