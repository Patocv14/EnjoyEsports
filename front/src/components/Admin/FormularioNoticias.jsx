import { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Alerta from "../globales/Alerta";

const FormularioNoticias = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  const { mostrarAlerta, alerta, submitNoticia } = useAdmin();

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    if ([titulo, imagen].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    //Pasar datos al provider
    await submitNoticia({ titulo, imagen, descripcion });
    setTitulo("");
    setDescripcion("");
    setImagen("");
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
          htmlFor="nombre"
        >
          Titulo de la Noticia
        </label>
        <input
          type="text"
          id="nombre"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Titulo de la Noticia"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="desc"
        >
          Descripcion de la Noticia
        </label>
        <textarea
          type="text"
          id="desc"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Descripcion de la Noticia"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="pb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm "
          htmlFor="nombre"
        >
          Imagen de la Categoria (url)
        </label>
        <input
          type="text"
          id="nombre"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Imagen de la Noticia"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Crear Categoria"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioNoticias;
