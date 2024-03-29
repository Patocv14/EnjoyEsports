import express from "express";

import {
  obtenerCategorias,
  nuevaCategoria,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../controllers/categoriaController.js";

import checkAuth from "../middleware/checkAuth.js";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();

router
  .route("/")
  .get(obtenerCategorias)
  .post(checkAuth, isAdmin, nuevaCategoria);
router
  .route("/:id")
  .get(obtenerCategoria)
  .put(checkAuth, isAdmin, actualizarCategoria)
  .delete(checkAuth, isAdmin, eliminarCategoria);

export default router;
