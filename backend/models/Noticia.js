import mongoose from 'mongoose';

const noticiaSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Noticia = mongoose.model('Noticia', noticiaSchema);
export default Noticia;
