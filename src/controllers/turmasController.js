// import { 
//   createTurma,
//   findAllTurmas,
//   updateTurma,
//   deleteTurma 
// } from "../models/turmasModel.js";

// export const listarTurmas = async (req, res) => {
//   try {
//     const turmas = await findAllTurmas();
//     res.json(turmas);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ erro: error.message });
//   }
// };

// export const criarTurma = async (req, res) => {
//   try {
//     const { nome, ano_letivo, professor_id } = req.body;

//     if (!nome || !ano_letivo) {
//       return res.status(400).json({ erro: "Nome e ano são obrigatórios" });
//     }

//     await createTurma({ nome, ano_letivo, professor_id });

//     res.status(201).json({ mensagem: "Turma criada com sucesso" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ erro: error.message });
//   }
// };

// export const atualizarTurma = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nome, ano_letivo, professor_id } = req.body;

//     if (!nome || !ano_letivo) {
//       return res.status(400).json({ erro: "Nome e ano são obrigatórios" });
//     }

//     await updateTurma(id, { nome, ano_letivo, professor_id });

//     res.json({ mensagem: "Turma atualizada com sucesso" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ erro: error.message });
//   }
// };

// export const deletarTurma = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await deleteTurma(id);
//     res.json({ mensagem: "Turma deletada com sucesso" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ erro: error.message });
//   }
// };


import { 
  createTurma,
  findAllTurmas,
  updateTurma,
  deleteTurma 
} from "../models/turmasModel.js";

export const listarTurmas = async (req, res) => {
  try {
    const turmas = await findAllTurmas();
    return res.status(200).json(turmas);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const criarTurma = async (req, res) => {
  try {
    const { nome, ano_letivo, professor_id } = req.body;

    if (!nome || !ano_letivo) {
      return res.status(400).json({
        erro: "Nome e ano são obrigatórios"
      });
    }

    const result = await createTurma({
      nome,
      ano_letivo,
      professor_id
    });

    return res.status(201).json({
      mensagem: "Turma criada com sucesso",
      id: result.insertId
    });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const atualizarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ano_letivo, professor_id } = req.body;

    if (!nome || !ano_letivo) {
      return res.status(400).json({
        erro: "Nome e ano são obrigatórios"
      });
    }

    await updateTurma(id, { nome, ano_letivo, professor_id });

    return res.status(200).json({
      mensagem: "Turma atualizada com sucesso"
    });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

export const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteTurma(id);

    return res.status(200).json({
      mensagem: "Turma deletada com sucesso"
    });

  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};