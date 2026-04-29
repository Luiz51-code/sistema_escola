// src/routes/notaRoutes.js

import { Router } from "express";
import * as notasController from "../controllers/notasController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/", verificarToken, notasController.listar);
router.get("/:id", verificarToken, notasController.buscarPorId);
router.post("/", verificarToken, notasController.criar);
router.put("/:id", verificarToken, notasController.atualizar);
router.delete("/:id", verificarToken, notasController.remover);
export default router;