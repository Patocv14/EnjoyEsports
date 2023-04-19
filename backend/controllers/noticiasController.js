import Noticia from '../models/Noticia.js';

const obtenerNoticias = async (req, res) => {
  const noticias = await Noticia.find();
  res.json(noticias);
};
const nuevaNoticia = async (req, res) => {
  const noticia = new Noticia(req.body);

  try {
    const noticiaAlmacenada = await noticia.save();
    res.json(noticiaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerNoticia = async (req, res) => {
  const { id } = req.params;
  const noticia = await Noticia.findById(id.match(/^[0-9a-fA-F]{24}$/));
  if (!noticia) {
    return res.status(404).json({ msg: 'Noticia No Encontrada' });
  }
  res.json(noticia);
};

const actualizarNoticia = async (req, res) => {
  const { id } = req.params;
  const noticia = await Noticia.findById(id.match(/^[0-9a-fA-F]{24}$/));
  if (!noticia) {
    return res.status(404).json({ msg: 'Noticia no Encontrada' });
  }
  noticia.titulo = req.body.titulo || noticia.titulo;
  noticia.descripcion = req.body.descripcion || noticia.descripcion;
  noticia.imagen = req.body.imagen || noticia.imagen;

  try {
    const noticiaAlmacenada = await noticia.save();
    res.json(noticiaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarNoticia = async (req, res) => {
  const { id } = req.params;
  const noticia = await Noticia.findById(id.match(/^[0-9a-fA-F]{24}$/));
  if (!noticia) {
    return res.status(404).json({ msg: 'Noticia no Encontrada' });
  }
  try {
    await noticia.deleteOne();
    res.json({ msg: 'Noticia Eliminada Correctamente' });
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerNoticias,
  nuevaNoticia,
  obtenerNoticia,
  actualizarNoticia,
  eliminarNoticia,
};
