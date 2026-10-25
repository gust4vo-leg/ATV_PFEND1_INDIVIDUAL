import express from 'express';
import { listarNoticias, listarDestaques, criarNoticia, buscarNoticiaPorId } from '../controllers/noticiasController.js'; 
import { verificarAutenticacao } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', listarNoticias);
router.post('/', verificarAutenticacao, criarNoticia);
router.get('/destaques', listarDestaques);
router.get('/:idNoticias', buscarNoticiaPorId);

export default router;
