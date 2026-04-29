
import {
  buscarTodosUsuarios,
  buscarUsuarioPorId as buscarUsuarioPorIdModel,
  criarUsuarioModel,
  atualizarUsuarioModel,
  deletarUsuarioModel,
} from "../models/usuarioModel.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await buscarTodosUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar usuários",
      erro: error.message,
    });
  }
};

export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await buscarUsuarioPorIdModel(id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar usuário",
      erro: error.message,
    });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios faltando",
      });
    }

    const result = await criarUsuarioModel({
      nome,
      email,
      senha,
    });

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      id: result.insertId,
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao criar usuário",
      erro: error.message,
    });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioExiste = await buscarUsuarioPorIdModel(id);

    if (!usuarioExiste) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    await atualizarUsuarioModel(id, req.body);

    return res.status(200).json({
      mensagem: "Usuário atualizado com sucesso",
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar usuário",
      erro: error.message,
    });
  }
};

export const removerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioExiste = await buscarUsuarioPorIdModel(id);

    if (!usuarioExiste) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    await deletarUsuarioModel(id);

    return res.status(200).json({
      mensagem: "Usuário removido com sucesso",
    });

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao remover usuário",
      erro: error.message,
    });
  }
};