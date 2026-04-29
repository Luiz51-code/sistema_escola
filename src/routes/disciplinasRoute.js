import { Router } from "express";
import * as disciplinaController from "../controllers/disciplinasController.js";

const router = Router();

router.get("/", disciplinaController.listarDisciplinas);
router.get("/:id", disciplinaController.buscarDisciplinaPorId);
router.post("/", disciplinaController.criarDisciplina);
router.put("/:id", disciplinaController.atualizarDisciplina);
router.delete("/:id", disciplinaController.deletarDisciplina);

export default router;