import { useParams } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import { useEffect } from "react";
import FormularioCategorias from "../../../components/Admin/FormularioCategorias";
import NavbarAdmin from "../../../components/Admin/Navbar";
import { Link } from "react-router-dom";
import Spinner from "../../../components/globales/Spinner";

const EditarCategoria = () => {
  const pagina = "categorias";
  const params = useParams();

  const { obtenerCategoria, cargando } = useAdmin();

  useEffect(() => {
    obtenerCategoria(params.id);
  }, []);

  return (
    <>
      <NavbarAdmin pagina={pagina} />
      {cargando ? (
        <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="mt-[98px] absolute laptop:mt-24 ms-10">
            <Link
              to="/admin/categorias"
              className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors"
            >
              Regresar
            </Link>
          </div>
          <div className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-4xl fuenteEnjoy">Actualizar Categoria</h1>
            <div className="container mx-auto">
              <div className="mt-20 flex justify-center">
                <FormularioCategorias />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditarCategoria;
