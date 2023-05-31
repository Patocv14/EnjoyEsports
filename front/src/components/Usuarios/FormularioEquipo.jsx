import React, { useState } from "react";
import useUsuario from "../../hooks/useUsuario";
import Alerta from "../globales/Alerta";
import DropdownSearch from "../globales/DropdownSearch";
import SingleObjectDropdownSearch from "../globales/SingleSelectDropdownSearch";
import SingleUniversityDropdownSearch from "../globales/SingleUniversityDropdownSearch";

const FormularioEquipo = () => {
  const [teamName, setTeamName] = useState("");
  const [categoria, setCategoria] = useState("");
  const [miembros, setMiembros] = useState([]);
  const [universidad, setUniversidad] = useState("");

  const { mostrarAlerta, alerta, submitEquipo } = useUsuario();

  const handleMiembrosChange = (selectedObjects) => {
    setMiembros(selectedObjects);
  };

  const handleCategoriaChange = (selectedCategoria) => {
    setCategoria(selectedCategoria);
  };

  const handleUniversidadChange = (selectedUniversidad) => {
    setUniversidad(selectedUniversidad);
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    if ([teamName, categoria, miembros, universidad].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Mostrar los datos obtenidos en la consola
    console.log("Datos obtenidos:");
    console.log("Nombre del equipo:", teamName);
    console.log("Categoría:", categoria);
    console.log("Miembros del equipo:", miembros);
    console.log("Universidad:", universidad);

    // Llamar a la función submitEquipo para enviar los datos al servidor
    await submitEquipo({ teamName, categoria, miembros, universidad });
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
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="teamName"
        >
          Nombre del equipo
        </label>
        <input
          type="text"
          id="teamName"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del equipo"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="juego"
        >
          Juego (id)
        </label>
        <SingleObjectDropdownSearch
          handleCategoriaChange={handleCategoriaChange}
        />
      </div>

      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="miembros"
        >
          Miembros del Equipo
        </label>
        <DropdownSearch handleMiembrosChange={handleMiembrosChange} isMulti />
      </div>

      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="universidad"
        >
          Universidad
        </label>
        <SingleUniversityDropdownSearch
          handleUniversidadChange={handleUniversidadChange}
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
