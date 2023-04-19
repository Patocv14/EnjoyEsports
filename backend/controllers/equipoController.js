import Equipo from '../models/Equipo.js';
import Universidad from '../models/Universidad.js';

//esta funcion me traer todos los equipos de la base de datos
const obtenerEquipos = async (req, res) => {
  const equipos = await Equipo.find();
  res.json(equipos);
};
//esta funcion me busca un equipo en espesifico
const obtenerEquipo = async (req, res) => {
  const { id } = req.params; // sacamos el id de la url
  const equipo = await Equipo.findById(id); // buscamos el id del equipo en la base de datos
  if (!equipo) {
    // verificamos que exista el equipo en la base de datos, de lo contraio retornamos error
    const error = new Error('No se encontro el equipo');
    return res.status(400).json({ msg: error.message });
  }
  res.json(equipo);
};

//esta funcion crea un equipo nuevo en la base de datos
const nuevoEquipo = async (req, res) => {
  const equipo = new Equipo(req.body);
  const { universidad } = req.body; // sacamos el id de la uni del formulario
  const existeUni = await Universidad.findById(universidad); // buscamos la uni ingresada en el backend
  if (!existeUni) {
    // hacemos una verificacion donde si no esta la uni en el backend retornamos un errror
    const error = new Error('No se encontro la universidad');
    return res.status(400).json({ msg: error.message });
  }
  req.body.capitan = req.usuario._id; // seteamos un capitan con el usuario que hizo el request

  try {
    const equipoAlmacenado = await Equipo.create(req.body);
    existeUni.teams.push(equipoAlmacenado._id);
    await existeUni.save();
    res.json(equipoAlmacenado);
  } catch (err) {
    console.log(err);
  }
};

const actualizarEquipo = async (req, res) => {
  const { id } = req.params;
  const equipo = await Equipo.findById(id);
  if (!equipo) {
    return res.status(404).json({ msg: 'Equipo no Encontrado' });
  }
  equipo.teamName = req.body.teamName || equipo.teamName;
  equipo.titulo = req.body.titulo || equipo.titulo;
  equipo.miembros = req.body.miembros || equipo.miembros;
  equipo.universidad = req.body.universidad || equipo.universidad;

  try {
    const equipoAlmacenado = await equipo.save();
    res.json(equipoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarEquipo = async (req, res) => {
  const { id } = req.params;
  const equipo = await Equipo.findById(id);
  if (!equipo) {
    return res.status(404).json({ msg: 'Equipo no Encontrado' });
  }
  try {
    await equipo.deleteOne();
    res.json({ msg: 'Equipo Eliminado' });
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
};
