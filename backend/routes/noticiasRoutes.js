import express from "express";

import {
  listarNoticias,
  listarDestaques,
  criarNoticia,
  buscarNoticiaPorId,
} from "../controllers/noticiasController.js";

import uploadImagem from "../middlewares/uploadImagem.js";

const router = express.Router();

router.get("/", listarNoticias);
router.get("/destaques", listarDestaques);
// router.post("/", uploadImagem.single("imagem"), criarNoticia);

router.post(
  "/",
  (req, res, next) => {
    uploadImagem.single("imagem")(req, res, (erro) => {
      if (erro) {
        console.error("Erro no Multer:", erro.message);
        return res.status(400).json({
          mensagem: erro.message,
        });
      }

      console.log("Arquivo recebido:", req.file);
      console.log("Campos recebidos:", req.body);

      next();
    });
  },
  criarNoticia,
);

router.get("/:idNoticias", buscarNoticiaPorId);

export default router;
