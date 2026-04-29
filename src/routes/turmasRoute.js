import { Router } from "express";
import {
  listarTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma
} from "../controllers/turmasController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verificarToken, listarTurmas);
router.post("/", verificarToken, criarTurma);
router.put("/:id", verificarToken, atualizarTurma);
router.delete("/:id", verificarToken, deletarTurma);

export default router;