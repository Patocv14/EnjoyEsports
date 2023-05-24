import { useState } from "react";
import useUsuario from "../../hooks/useUsuario";
import Alerta from "../globales/Alerta";

const FormularioEquipo = () => {
  const [teamName, setTeamName] = useState("");
  const [categoria, setCategoria] = useState("");
  const [miembros, setMiembros] = useState([]);
  const [universidad, setUniversidad] = useState("");

  const { mostrarAlerta, alerta, submitEquipo } = useUsuario();

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    if ([teamName, categoria, miembros, universidad].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    //Pasar datos al provider
    await submitEquipo({ teamName, categoria, miembros, universidad });
    // setTeamName("");
    // setCategoria("");
    // setMiembros("");
    // setUniversidad("");
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={hanldeSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="teamName"
        >
          Nombre del equipo
        </label>
        <input
          type="text"
          id="teamName"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Nombre del equipo"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="juego"
        >
          Juego (id)
        </label>
        <input
          type="text"
          id="juego"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Juego"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="miembros"
        >
          Miembros del Equipo (id)
        </label>
        <input
          type="text"
          id="miembros"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Imagen de la Noticia"
          value={miembros}
          onChange={(e) => setMiembros(e.target.value.split(","))}
        />
      </div>

      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="universidad"
        >
          Universidad (id)
        </label>
        <input
          type="text"
          id="universidad"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Universidad"
          value={universidad}
          onChange={(e) => setUniversidad(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Crear Equipo"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioEquipo;
