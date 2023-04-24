import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/checkAuth.js';
import isAdmin from '../middleware/isAdmin.js';

import {
  obtenerNoticias,
  nuevaNoticia,
  obtenerNoticia,
  actualizarNoticia,
  eliminarNoticia,
} from '../controllers/noticiasController.js';

router
  .route('/')
  .get(checkAuth, isAdmin, obtenerNoticias)
  .post(checkAuth, isAdmin, nuevaNoticia);

// TODO: Crear rol de editor

router
  .route('/:id')
  .get(checkAuth, isAdmin, obtenerNoticia)
  .put(checkAuth, isAdmin, actualizarNoticia)
  .delete(checkAuth, isAdmin, eliminarNoticia);

export default router;
