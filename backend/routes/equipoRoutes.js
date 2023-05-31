import express from "express";

import {
  obtenerEquipo,
  obtenerEquipos,
  nuevoEquipo,
  actualizarEquipo,
  eliminarEquipo,
  salirEquipo,
} from "../controllers/equipoController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, obtenerEquipos).post(checkAuth, nuevoEquipo);

router
  .route("/:id")
  .get(obtenerEquipo)
  .put(checkAuth, actualizarEquipo)
  .delete(checkAuth, eliminarEquipo);

router.delete("/salir/:id/:id2", checkAuth, salirEquipo);

export default router;
