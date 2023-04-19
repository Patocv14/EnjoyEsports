import Universidad from '../models/Universidad.js';
import Equipo from '../models/Equipo.js';

const obtenerUniversidades = async (req, res) => {
  const universidades = await Universidad.find();
  res.json(universidades);
};

const obtenerUniversidad = async (req, res) => {
  const { id } = req.params;
  const universidad = await Universidad.findById(id);
  if (!universidad) {
    return res.status(404).json({ msg: 'Categoria no Encontrada' });
  }
  res.json(universidad);
};

const crearUniversidad = async (req, res) => {
  const universidad = new Universidad(req.body);
  const { inicialesUni } = req.body;
  const existeUni = await Universidad.findOne({ inicialesUni });

  if (existeUni) {
    const error = new Error('Universidad ya registrado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    const uniAlmacenada = await universidad.save();
    res.json(uniAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerEquiposLigadosConUni = async (req, res) => {
  const { id } = req.params;
  const equipos = await Universidad.findById(id).populate('teams');
  res.json(equipos.teams);
};

const actualizarUniversidad = async (req, res) => {
  const { id } = req.params;
  const universidad = await Universidad.findById(id);
  if (!universidad) {
    return res.status(404).json({ msg: 'Universidad no Encontrada' });
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
  const universidad = Universidad.findById(id);
  if (!universidad) {
    return res.status(404).json({ msg: 'No encontrado' });
  }
  try {
    await universidad.deleteOne();
    res.json({ msg: 'Universidad Eliminada' });
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
