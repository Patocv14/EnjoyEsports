import express from "express";
const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
  allUsers,
  sacarMiembro,
  obtenerPerfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get("/obtenerPerfil/:id", obtenerPerfil);

router.get("/allUsers", allUsers);
router.get("/perfil", checkAuth, perfil);
router.put("/salir", checkAuth, sacarMiembro);

export default router;
