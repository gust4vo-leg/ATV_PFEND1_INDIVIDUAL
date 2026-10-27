import multer from "multer";
import path from "node:path";
import { mkdirSync } from "node:fs";

const pastaUploads = path.resolve("uploads");

mkdirSync(pastaUploads, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaUploads);
  },

  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname).toLowerCase();
    const nomeArquivo = `noticia-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${extensao}`;

    cb(null, nomeArquivo);
  },
});

function filtroImagem(req, file, cb) {
  const formatosPermitidos = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (formatosPermitidos.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Formato inválido. Envie uma imagem JPG, PNG ou WEBP."));
}

const uploadImagem = multer({
  storage,
  fileFilter: filtroImagem,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default uploadImagem;