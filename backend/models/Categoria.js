import mongoose from 'mongoose';

const categoriaSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    imagen: {
      type: String,
      required: true,
      trim: true,
    },
    universidades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Universidad',
      },
    ],
    equipos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Categoria = mongoose.model('Categoria', categoriaSchema);
export default Categoria;
