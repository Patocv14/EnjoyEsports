import express from 'express';

import {
  obtenerUniversidades,
  crearUniversidad,
  obtenerEquiposLigadosConUni,
  obtenerUniversidad,
  actualizarUniversidad,
  eliminarUniversidad,
} from '../controllers/universidadController.js';

import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router
  .route('/')
  .get(checkAuth, obtenerUniversidades)
  .post(checkAuth, crearUniversidad);
router
  .route('/:id')
  .get(checkAuth, obtenerUniversidad)
  .put(checkAuth, actualizarUniversidad)
  .delete(checkAuth, eliminarUniversidad);

router.route('/:id/equipos').get(checkAuth, obtenerEquiposLigadosConUni);

export default router;
