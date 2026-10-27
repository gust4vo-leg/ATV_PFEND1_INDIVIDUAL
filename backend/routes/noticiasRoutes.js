import express from "express";

import {
  listarNoticias,
  listarDestaques,
  criarNoticia,
  buscarNoticiaPorId,
  excluirNoticia,
} from "../controllers/noticiasController.js";

import uploadImagem from "../middlewares/uploadImagem.js";

const router = express.Router();

router.get("/", listarNoticias);
router.get("/destaques", listarDestaques);
router.post("/", uploadImagem.single("imagem"), criarNoticia);
router.delete("/:idNoticias", excluirNoticia);
router.get("/:idNoticias", buscarNoticiaPorId);

export default router;
