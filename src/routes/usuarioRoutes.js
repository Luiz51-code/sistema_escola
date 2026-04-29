import { Router } from "express";
import { listarUsuarios } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Rota protegida para listar usuários
router.get("/", verificarToken, listarUsuarios);

export default router;