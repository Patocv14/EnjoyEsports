import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    cordinador: {
      type: Boolean,
      default: false,
    },
    capitan: {
      type: Boolean,
      default: false,
    },
    imagen: {
      type: String,
      default: null,
    },
    datos: {
      nombreCompleto: {
        type: String,
      },
      gamertag: {
        type: String,
      },
      Universidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Universidad",
        default: null,
      },
      Equipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipo",
        default: null,
      },
      Campus: {
        type: String,
      },
      Localidad: {
        type: String,
      },
      foto: {
        type: String,
      },
      fechaNacimiento: {
        type: String,
      },
      estudiando: {
        type: Boolean,
      },
      tiempoActivo: {
        type: String,
      },
      juego: {
        type: String,
      },
      redes: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
