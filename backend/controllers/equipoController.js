import Equipo from "../models/Equipo.js";
import Universidad from "../models/Universidad.js";
import Categoria from "../models/Categoria.js";
import Usuario from "../models/Usuario.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

//esta funcion me traer todos los equipos de la base de datos
const obtenerEquipos = async (req, res) => {
  const equipos = await Equipo.find();
  res.json(equipos);
};
//esta funcion me busca un equipo en espesifico
const obtenerEquipo = async (req, res) => {
  const { id } = req.params; // sacamos el id de la url
  const equipo = await Equipo.findById(id)
    .populate("miembros")
    .populate("universidad")
    .populate("capitan")
    .populate("categoria"); // buscamos el id del equipo en la base de datos
  if (!equipo) {
    // verificamos que exista el equipo en la base de datos, de lo contraio retornamos error
    const error = new Error("No se encontro el equipo");
    return res.status(400).json({ msg: error.message });
  }
  res.json(equipo);
};

//esta funcion crea un equipo nuevo en la base de datos
const nuevoEquipo = async (req, res) => {
  const { universidad, categoria, teamName } = req.body; // sacamos el id de la uni del formulario

  const existeUni = await Universidad.findById(universidad);
  const existeEquipo = await Equipo.findOne({ teamName });
  let existeCategoria = await Categoria.findById(
    categoria.match(/^[0-9a-fA-F]{24}$/)
  ).select("-createdAt -updatedAt -__v -titulo -imagen");

  if (!existeCategoria) {
    const error = new Error("No se encontro la categoria");
    return res.status(400).json({ msg: error.message });
  }
  if (!existeUni) {
    const error = new Error("No se encontro la universidad");
    return res.status(400).json({ msg: error.message });
  }

  if (existeEquipo) {
    const error = new Error("Equipo ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  req.body.capitan = await req.usuario._id; // seteamos un capitan con el usuario que hizo el request
  if (!req.usuario.cordinador) {
    req.body.miembros.push(req.usuario._id.toString());
  }
  let { miembros } = await req.body;

  try {
    for (const miembro of miembros) {
      let existenMiembros = await Usuario.findById(miembro).select(
        "-password -confirmado -token -createdAt -updatedAt -__v -cordinador -admin -email "
      );
      if (existenMiembros.datos.Equipo !== undefined) {
        if (existenMiembros.datos.Equipo !== null) {
          const error = new Error(
            `el jugador ${existenMiembros.nombre} ya esta registrado en un equipo`
          );
          return res.status(401).json({ msg: error.message });
        }
      }
    }

    const equipoAlmacenado = await Equipo.create(req.body);
    existeUni.teams.push(equipoAlmacenado._id);
    existeCategoria.equipos.push(equipoAlmacenado._id);
    existeCategoria.universidades.push(existeUni._id);

    for (const miembro of miembros) {
      let existenMiembros = await Usuario.findById(miembro).select(
        "-password -confirmado -token -createdAt -updatedAt -__v -cordinador -admin -email "
      );
      existenMiembros.datos.Equipo = equipoAlmacenado._id;
      existenMiembros.datos.Universidad = existeUni._id;
      await existenMiembros.save();
    }
    await existeUni.save();
    await existeCategoria.save();

    res.json(equipoAlmacenado);
  } catch (err) {
    console.log(err);
  }
};

const actualizarEquipo = async (req, res) => {
  const { id } = req.params;
  const equipo = await Equipo.findById(id);
  const { miembros } = await req.body;

  if (!equipo) {
    return res.status(404).json({ msg: "Equipo no Encontrado" });
  }
  if (equipo.capitan.toString() !== req.usuario._id.toString()) {
    const error = new Error("Solo el capitan puede eliminar el equipo");
    return res.status(401).json({ msg: error.message });
  }
  // seteamos lo ingresado en el formulario y si no hay modificaciones se queda con lo que esta en la base de datos
  equipo.teamName = req.body.teamName || equipo.teamName;
  equipo.titulo = req.body.titulo || equipo.titulo;
  equipo.miembros = req.body.miembros || equipo.miembros;
  equipo.universidad = req.body.universidad || equipo.universidad;

  for (const miembro of miembros) {
    let existenMiembros = await Usuario.findById(miembro).select(
      "-password -confirmado -token -createdAt -updatedAt -__v -cordinador -admin -email"
    );

    if (existenMiembros.datos.Equipo.toString() !== equipo._id.toString()) {
      console.log(
        `el jugador ${existenMiembros.nombre} es de este mismo equipo`
      );
      if (existenMiembros.datos.Equipo !== undefined) {
        if (existenMiembros.datos.Equipo !== null) {
          const error = new Error(
            `el jugador ${existenMiembros.nombre} ya esta registrado en un equipo`
          );
          return res.status(401).json({ msg: error.message });
        }
      }
    }
    existenMiembros.datos.Equipo = equipo._id;
    await existenMiembros.save();
  }

  try {
    const equipoAlmacenado = await equipo.save();
    res.json(equipoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarEquipo = async (req, res) => {
  const { id } = req.params; // scamos el id de la url
  const equipo = await Equipo.findById(id); // buscamos el id en la base de datos

  if (!equipo) {
    // verificamos si no existe el equipo, si no existe mandamos un error
    return res.status(404).json({ msg: "Equipo no Encontrado" });
  }
  const { categoria, miembros, universidad } = equipo;

  const existeUni = await Universidad.findById(universidad); // buscamos la uni ingresada en el backend
  let existeCategoria = await Categoria.findById(categoria).select(
    "-createdAt -updatedAt -__v -titulo -imagen -universidades"
  );
  //todo: que el admin pueda elimiarnlo

  if (!req.usuario.admin) {
    if (req.usuario._id.toString() !== existeUni.cordinador.toString()) {
      if (equipo.capitan.toString() !== req.usuario._id.toString()) {
        const error = new Error(
          "Solo el capitan o el coodinador puede eliminar el equipo"
        );
        return res.status(401).json({ msg: error.message });
      }
    }
  }

  try {
    const unis = existeUni.teams.filter((obj) => {
      return obj.toString() !== equipo._id.toString();
    });
    existeUni.teams = unis;

    const categorias = existeCategoria.equipos.filter((obj) => {
      return obj.toString() !== equipo._id.toString();
    });

    existeCategoria.equipos = categorias;
    for (const miembro of miembros) {
      let existenMiembros = await Usuario.findById(miembro).select(
        "-password -confirmado -token -createdAt -updatedAt -__v -cordinador -admin -email "
      );
      existenMiembros.datos.Equipo = null;
      existenMiembros.save();
    }
    await existeUni.save();
    await existeCategoria.save();
    await equipo.deleteOne(); // eliminamos el objeto del equipo
    res.json({ msg: "Equipo Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const salirEquipo = async (req, res) => {
  const { id, id2 } = req.params; // scamos el id de la url
  const equipo = await Equipo.findById(id2); // buscamos el id en la base de datos
  if (!equipo) {
    // verificamos si no existe el equipo, si no existe mandamos un error
    return res.status(404).json({ msg: "Equipo no Encontrado" });
  }

  const usuario = id;
  let buscarMiembro = await Usuario.findById(usuario).select(
    "-password -confirmado -token -createdAt -updatedAt -__v -cordinador -admin -email "
  );
  buscarMiembro.datos.Equipo = null;
  const usuarios = await equipo.miembros.filter((obj) => {
    return obj.toString() !== id.toString();
  });
  equipo.miembros = usuarios;

  try {
    await buscarMiembro.save();
    await equipo.save();
    res.json({ msg: "Saliste del equipo correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerEquipo,
  obtenerEquipos,
  nuevoEquipo,
  actualizarEquipo,
  eliminarEquipo,
  salirEquipo,
};
