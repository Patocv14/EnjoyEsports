import Universidad from "../models/Universidad.js";
import Equipo from "../models/Equipo.js";
import Categoria from "../models/Categoria.js";
import Usuario from "../models/Usuario.js";

const obtenerUniversidades = async (req, res) => {
  const universidades = await Universidad.find();
  res.json(universidades);
};

const obtenerUniversidad = async (req, res) => {
  const { id } = req.params;
  const universidad = await Universidad.findById(id)
    .populate("cordinador")
    .populate("teams");
  if (!universidad) {
    return res.status(404).json({ msg: "Categoria no Encontrada" });
  }
  res.json(universidad);
};

const crearUniversidad = async (req, res) => {
  const universidad = new Universidad(req.body);
  const { inicialesUni } = req.body;
  const existeUni = await Universidad.findOne({ inicialesUni });

  if (existeUni) {
    const error = new Error("Universidad ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  universidad.cordinador = req.usuario._id;

  const { categorias } = universidad;
  try {
    const universidadAlmacenada = await Universidad.create(universidad);
    for (const categoria of categorias) {
      let existeCategoria = await Categoria.findById(categoria).select(
        "-createdAt -updatedAt -__v -titulo -imagen"
      );
      existeCategoria.universidades.push(universidad._id);
      await existeCategoria.save();
    }
    await universidad.save();
    res.json(universidadAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerEquiposLigadosConUni = async (req, res) => {
  const { id } = req.params;
  const equipos = await Universidad.findById(id).populate("teams");
  res.json(equipos.teams);
};

const actualizarUniversidad = async (req, res) => {
  const { id } = req.params;
  const universidad = await Universidad.findById(id);
  if (!universidad) {
    return res.status(404).json({ msg: "Universidad no Encontrada" });
  }
  if (
    universidad.cordinador.toString() !== req.usuario._id.toString() ||
    !req.usuario.admin
  ) {
    const error = new Error("Solo el cordinador puede eliminar el equipo");
    return res.status(401).json({ msg: error.message });
  }

  universidad.uni = req.body.uni || universidad.uni;
  universidad.imgUni = req.body.imgUni || universidad.imgUni;
  universidad.inicialesUni = req.body.inicialesUni || universidad.inicialesUni;

  try {
    const uniAlmacenada = await universidad.save();
    res.json(uniAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarUniversidad = async (req, res) => {
  const { id } = req.params;
  const universidad = await Universidad.findById(id);
  const { categorias, teams } = universidad;
  if (!universidad) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  if (universidad.cordinador.toString() !== req.usuario._id.toString()) {
    if (!req.usuario.admin) {
      const error = new Error(
        "Solo el Cordinador o un Admin puede eliminar la universidad"
      );
      return res.status(401).json({ msg: error.message });
    }
  }
  try {
    for (const categoria of categorias) {
      let existeCategoria = await Categoria.findById(categoria).select(
        "-createdAt -updatedAt -__v -titulo -imagen"
      );
      const unis = existeCategoria.universidades.filter((obj) => {
        return obj.toString() !== id;
      });

      existeCategoria.universidades = unis;
      await existeCategoria.save();
    }
  } catch (error) {
    console.log(error);
  }

  //aqui se busca team por team y se elimina cada jugador del team y aparte se elimina el equipo de la db
  for (const team of teams) {
    let existeTeam = await Equipo.findById(team).select(
      "-password -confirmado -token -createdAt -updatedAt -__v -cordinador -admin -email "
    );
    const idTeam = existeTeam._id;

    let { categoria, miembros } = existeTeam;

    let categori = await Categoria.findById(categoria).select(
      "-createdAt -updatedAt -__v -titulo -imagen"
    );
    const categorias = categori.equipos.filter((obj) => {
      return obj.toString() !== idTeam.toString();
    });

    categori.equipos = categorias;
    await categori.save();

    try {
      for (const miembro of miembros) {
        let existenMiembros = await Usuario.findById(miembro);
        existenMiembros.datos.Equipo = null;
        existenMiembros.datos.Universidad = null;
        existenMiembros.save();
      }

      await existeTeam.deleteOne(); // eliminamos el objeto del equipo
    } catch (error) {
      console.log(error);
    }
  }

  try {
    await universidad.deleteOne();
    res.json({ msg: "Universidad Eliminada" });
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerUniversidades,
  crearUniversidad,
  obtenerEquiposLigadosConUni,
  obtenerUniversidad,
  actualizarUniversidad,
  eliminarUniversidad,
};
