// import {
//   listarTurmas as listarTurmasModel,
//   criarTurma as criarTurmaModel,
//   deletarTurma as deletarTurmaModel,
//   atualizarTurma as atualizarTurmaModel,
//   buscarTurmaPorIdModel as buscarTurmaPorIdModel  // ✅ Adicione esta importação
// } from "../models/turmasModel.js";

// // No início do arquivo turmasController.js, importe a conexão

// // Depois use db em vez de conexao
// const buscarTurmaPorId = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`🔍 Buscando turma com ID: ${id}`);
    
//     // Use db.query() em vez de conexao.query()
//     const [rows] = await db.query('SELECT * FROM turmas WHERE id = ?', [id]);
    
//     if (rows.length === 0) {
//       return res.status(404).json({ mensagem: "Turma não encontrada" });
//     }
    
//     return res.status(200).json(rows[0]);
//   } catch (error) {
//     console.error('Erro ao buscar turma:', error);
//     return res.status(500).json({ mensagem: "Erro interno" });
//   }
// };
// export const listarTurmas = async (req, res) => {
//   const data = await listarTurmasModel(); // ✅ usando a função importada
//   return res.status(200).json(data);
// };

// export const criarTurma = async (req, res) => {
//   const { nome, ano, professor_id } = req.body;

//   if (!nome || !ano) {
//     return res.status(400).json({ mensagem: "Os campos 'nome' e 'ano' são obrigatórios" });
//   }

//   const result = await criarTurmaModel({  // ✅ Pegue o resultado
//     nome,
//     ano,
//     professor_id,
//   });

//   return res.status(201).json({
//     mensagem: "Turma criada com sucesso",
//     id: result.insertId  // ✅ Adicione o ID aqui
//   });
// };

// export const atualizarTurma = async (req, res) => {
//   const { id } = req.params;
//   const { nome, ano, professor_id } = req.body;

//   // Descomente estas linhas:
//   await atualizarTurmaModel(id, {
//     nome,
//     ano_letivo, // ou ano, dependendo do que seu model espera
//     professor_id,
//   });

//   return res.status(200).json({
//     mensagem: "Turma atualizada com sucesso",
//   });
// };


// export const deletarTurma = async (req, res) => {
//   const { id } = req.params;

//   await deletarTurmaModel(id); // ✅ usando a função importada

//   return res.status(200).json({
//     mensagem: "Turma removida com sucesso",
//   });
// };





// src/controllers/turmasController.js
import db from '../config/db.js'; // ✅ IMPORTANTE: Importar a conexão do banco
import {
  listarTurmas as listarTurmasModel,
  criarTurma as criarTurmaModel,
  deletarTurma as deletarTurmaModel,
  atualizarTurma as atualizarTurmaModel,
  buscarTurmaPorIdModel  // ✅ Importe sem alias para usar diretamente
} from "../models/turmasModel.js";


export const buscarTurmaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Buscando turma com ID: ${id}`);
    
    // Usar o MODEL em vez de query direta
    const turma = await buscarTurmaPorIdModel(id);
    
    if (!turma) {
      return res.status(404).json({ mensagem: "Turma não encontrada" });
    }
    
    return res.status(200).json(turma);
  } catch (error) {
    console.error('Erro ao buscar turma:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};


export const listarTurmas = async (req, res) => {
  try {
    const data = await listarTurmasModel();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao listar turmas:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};


export const criarTurma = async (req, res) => {
  try {
    const { nome, ano_letivo, professor_id } = req.body;

    if (!nome || !ano_letivo) {
      return res.status(400).json({ mensagem: "Os campos 'nome' e 'ano_letivo' são obrigatórios" });
    }

    const result = await criarTurmaModel({
      nome,
      ano_letivo,
      professor_id,
    });

    return res.status(201).json({
      mensagem: "Turma criada com sucesso",
      id: result.insertId
    });
  } catch (error) {
    console.error('Erro ao criar turma:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

// ✅ Função usando MODEL
export const atualizarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ano_letivo, professor_id } = req.body;

    await atualizarTurmaModel(id, {
      nome,
      ano_letivo,
      professor_id,
    });

    return res.status(200).json({
      mensagem: "Turma atualizada com sucesso",
    });
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

// ✅ Função usando MODEL
export const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    await deletarTurmaModel(id);
    
    return res.status(200).json({
      mensagem: "Turma removida com sucesso",
    });
  } catch (error) {
    console.error('Erro ao deletar turma:', error);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};