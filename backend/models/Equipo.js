import mongoose from 'mongoose';

const equipoSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    titulo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
    },
    confirmado: {
      type: Boolean,
      default: false,
    },

    miembros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    capitan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    universidad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Universidad',
    },
  },
  //TODO: relacionar el schema de matches con este esquema

  {
    timestamps: true,
  }
);

const Equipo = mongoose.model('Equipo', equipoSchema);
export default Equipo;
