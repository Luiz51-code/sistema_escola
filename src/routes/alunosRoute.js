// src/routes/alunoRoutes.js

import { Router } from "express";
import {
  listarAlunos,
  buscarAlunoPorId,
  criarAluno,
  atualizarAluno,
  removerAluno,
} from "../controllers/alunosController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Protege todas as rotas
router.use(verificarToken);

router.get("/", listarAlunos);
router.get("/:id", buscarAlunoPorId);
router.post("/", criarAluno);
router.put("/:id", atualizarAluno);
router.delete("/:id", removerAluno);

export default router;