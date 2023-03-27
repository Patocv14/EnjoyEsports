import Categoria from '../models/Categoria.js';

const obtenerCategorias = async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
};
const nuevaCategoria = async (req, res) => {
  const categoria = new Categoria(req.body);

  try {
    const categoriaAlmacenada = await categoria.save();
    res.json(categoriaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);
  if (!categoria) {
    return res.status(404).json({ msg: 'No encontrado' });
  }

  res.json(categoria);
};

const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);
  if (!Categoria) {
    return res.status(404).json({ msg: 'No encontrado' });
  }

  categoria.titulo = req.body.titulo || categoria.titulo;
  categoria.imagen = req.body.imagen || categoria.imagen;

  try {
    const categoriaAlmacenada = await categoria.save();
    res.json(categoriaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};
const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);
  if (!categoria) {
    return res.status(404).json({ msg: 'No encontrado' });
  }

  try {
    await categoria.deleteOne();
    res.json({ msg: 'Categoria Eliminada' });
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerCategorias,
  nuevaCategoria,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
