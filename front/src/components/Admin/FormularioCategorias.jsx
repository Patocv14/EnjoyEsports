import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Alerta from "../globales/Alerta";
import { useParams } from "react-router-dom";

const FormularioCategorias = () => {
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");
  const [id, setId] = useState(null);

  const { mostrarAlerta, alerta, submitCategoria, categoria } = useAdmin();
  const params = useParams();

  useEffect(() => {
    if (params.id && categoria.titulo) {
      setTitulo(categoria.titulo);
      setImagen(categoria.imagen);
      setId(categoria._id);
    }
  }, [params]);

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
    await submitCategoria({ id, titulo, imagen });
    setTitulo("");
    setImagen("");
    setId(null);
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
          Titulo de la Categoria
        </label>
        <input
          type="text"
          id="nombre"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Titulo de la Categoria"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
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
          placeholder="Imagen de la Categoria"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={categoria.id ? "Actualizar Categoria" : "Crear Categoria"}
        className="bg-naranja w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-oragne-700 transition-colors"
      />
    </form>
  );
};

export default FormularioCategorias;
