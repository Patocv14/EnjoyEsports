import { useState } from "react";
import NavbarAdmin from "../../components/Admin/Navbar";
import useAdmin from "../../hooks/useAdmin";
import { Link } from "react-router-dom";
import Alerta from "../../components/globales/Alerta";

const Categoria = () => {
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [alerta, setAlerta] = useState({});
  const pagina = "categorias";

  const { categorias, eliminarCategoria } = useAdmin();

  const handleClick = (id) => {
    if (confirm("Deseas eliminar esta Categoria?")) {
      eliminarCategoria(id);
      setAlerta({
        msg: "Categoria Eliminada Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 1500);
    }
  };

  const handleEditar = async () => {
    const edit = !editar;
    setEditar(edit);
  };

  const handleEliminar = async () => {
    const del = !eliminar;
    setEliminar(del);
  };

  const { msg } = alerta;

  return (
    <div className="">
      <div className="container mx-auto">
        <NavbarAdmin pagina={pagina} />
        <h1 className="text-4xl font-black py-20 text-center">Categorias</h1>
        {msg && <Alerta alerta={alerta} />}
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          {categorias.map((obj) => (
            <div key={obj._id}>
              <div className="text-center fuenteEnjoy text-xl uppercase">
                <h1>{obj.titulo}</h1>
              </div>
              <div className="flex justify-center">
                {editar ? (
                  <div className=" relative  cursor-pointer py-8 hover:scale-110 transition-all duration-150">
                    <Link to={`/admin/editar-categoria/${obj._id}`}>
                      <img
                        className="imagenCompetencias rounded-xl transition duration-300 ease-in-out  shadow-2xl brightness-[.4]"
                        src={obj.imagen}
                        alt={obj.titulo}
                        width={384}
                        height={384}
                      />
                      <div className=" absolute top-[70px] left-[150px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-edit"
                          width="100"
                          height="100"
                          viewBox="0 0 24 24"
                          strokeWidth="1"
                          stroke="#ffffff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                          <path d="M16 5l3 3" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                ) : eliminar ? (
                  <div className=" relative  cursor-pointer py-8 hover:scale-110 transition-all duration-150">
                    <Link onClick={() => handleClick(obj._id)}>
                      <img
                        className="imagenCompetencias rounded-xl transition duration-300 ease-in-out  shadow-2xl brightness-50"
                        src={obj.imagen}
                        alt={obj.titulo}
                        width={384}
                        height={384}
                      />
                      <div className=" absolute top-[70px] left-[150px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-trash"
                          width="100"
                          height="100"
                          viewBox="0 0 24 24"
                          strokeWidth="1"
                          stroke="#ffffff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className=" relative  cursor-pointer py-8 hover:scale-110 transition-all duration-150">
                    <Link to={`/admin/categorias/seleccionar/${obj._id}`}>
                      <img
                        className="imagenCompetencias rounded-xl transition duration-300 ease-in-out  shadow-2xl"
                        src={obj.imagen}
                        alt={obj.titulo}
                        width={384}
                        height={384}
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center pb-10 gap-10  ">
          <Link
            onClick={handleEditar}
            className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors"
          >
            Editar Categoria
          </Link>
          <Link
            to="/admin/crear-categoria"
            className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors"
          >
            Agregar Nueva Categoria
          </Link>
          <Link
            onClick={handleEliminar}
            className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors"
          >
            Eliminar Categoria
          </Link>
        </div>

        {/* 
      <div className="mt-10 flex justify-center">
        <FormularioCategorias />
      </div> */}
      </div>
    </div>
  );
};

export default Categoria;
