import mongoose from "mongoose";

const universidadSchema = mongoose.Schema(
  {
    uni: {
      type: String,
      required: true,
    },
    imgUni: {
      type: String,
      required: true,
    },
    inicialesUni: {
      type: String,
      required: true,
      unique: true,
    },
    confirmada: {
      type: Boolean,
      default: false,
    },
    cordinador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    categorias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
      },
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipo",
      },
    ],
    redes: [
      {
        type: String,
      },
    ],
    correo: {
      type: String,
      required: true,
    },
    discord: {
      type: String,
    },
    //TODO: agregar puntos y puntos ranking
  },
  {
    timestamps: true,
  }
);

const Universidad = mongoose.model("Universidad", universidadSchema);
export default Universidad;
