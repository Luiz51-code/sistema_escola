// 
import { Router } from "express";
import {
  listarProfessores,
  criarProfessor,
  atualizarProfessor,
  removerProfessor
} from "../controllers/professorController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verificarToken, listarProfessores);
router.post("/", verificarToken, criarProfessor);
router.put("/:id", verificarToken, atualizarProfessor);
router.delete("/:id", verificarToken, removerProfessor);

export default router;