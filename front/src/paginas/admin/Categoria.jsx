import NavbarAdmin from "../../components/Admin/Navbar";
import useAdmin from "../../hooks/useAdmin";
import { Link } from "react-router-dom";

const Categoria = () => {
  const pagina = "categorias";

  const { categorias, eliminarCategoria } = useAdmin();

  const handleClick = (id) => {
    if (confirm("Deseas eliminar esta Categoria?")) {
      eliminarCategoria(id);
    }
  };

  return (
    <div className="">
      <div className="container mx-auto">
        <NavbarAdmin pagina={pagina} />
        <h1 className="text-4xl font-black py-20 text-center">Categorias</h1>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          {categorias.map((obj) => (
            <div key={obj._id}>
              <div className="text-center fuenteEnjoy text-xl uppercase">
                <h1>{obj.titulo}</h1>
              </div>
              <div className="flex justify-center">
                <img
                  className="imagenCompetencias rounded-xl transition duration-300 ease-in-out  cursor-pointer shadow-2xl"
                  src={obj.imagen}
                  alt={obj.titulo}
                  width={384}
                  height={384}
                />
              </div>
              <div className="flex justify-around pb-10 pt-2">
                <div className="flex justify-around gap-10">
                  <div className="w-full text-center">
                    <Link to={`/admin/editar-categoria/${obj._id}`}>
                      <p className="cursor-pointer">Editar</p>
                    </Link>
                  </div>
                  <div className="w-full text-center">
                    <p
                      className=" cursor-pointer"
                      onClick={() => handleClick(obj._id)}
                    >
                      Eliminar
                    </p>
                  </div>
                  <div className="w-full text-center">
                    <Link to={`/admin/categorias/equipos/${obj._id}`}>
                      <p className="cursor-pointer">Equipos</p>
                    </Link>
                  </div>
                  <div className="w-full text-center">
                    <p>Universidades</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center pb-10">
          <Link
            to="/admin/crear-categoria"
            className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors"
          >
            Agregar Nueva Categoria
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
