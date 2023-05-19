import Usuario from "../models/Usuario.js"; //Modelo de usuarios

import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/Emails.js";

const registrar = async (req, res) => {
  const { email } = req.body; // sacamos el email del formulario
  // const { Universidad } = req.body.datos;
  const existeUsuario = await Usuario.findOne({ email }); // buscamos el email en la db
  if (existeUsuario) {
    // Esta funcion comprueba si el email ingresado ya existe en la db
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  // if (!Universidad) {
  //   // Esta funcion comprueba si el email ingresado ya existe en la db
  //   const error = new Error('No se encontro la universidad');
  //   return res.status(404).json({ msg: error.message });
  // }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId(); // Esta funcion me ayuda a generar un id unico
    const usuarioAlmacenado = await usuario.save();
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });
    res.json({
      msg: "Usuario Creado Correctamente, Revista tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { password, email } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(400).json({ msg: error.message });
  }
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      usuario: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }

  try {
    console.log(usuarioConfirmar);
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }
  try {
    usuario.token = generarId();
    await usuario.save();

    emailOlvidePassword({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    try {
      await usuario.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

const allUsers = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

const sacarMiembro = async (req, res) => {
  const { usuario } = await req.body;

  let buscarMiembro = await Usuario.findById(usuario).select(
    "-password -confirmado -token -createdAt -updatedAt -__v -cordinador -admin -email "
  );
  buscarMiembro.datos.Equipo = null;

  try {
    await buscarMiembro.save();
    res.json({ msg: "Eliminaste a un miembro correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
  allUsers,
  sacarMiembro,
};
