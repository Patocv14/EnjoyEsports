import NavbarUsuario from "../../components/Usuarios/Navbar";
import useAdmin from "../../hooks/useAdmin";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useUsuario from "../../hooks/useUsuario";

const UniversidadesCategoriaUsuarios = () => {
  const params = useParams();

  const { categoria, cargando } = useUsuario();
  const cat = categoria.filter((cat) => cat._id === params.id);

  const uni = cat[0]?.universidades;
  const cat2 = cat[0];

  const pagina = "categorias";

  return (
    <div>
      <NavbarUsuario pagina={pagina} />

      {cargando ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <div className="mt-[98px] absolute laptop:mt-24 ms-10">
            <Link
              to="/usuario/categorias"
              className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors"
            >
              Regresar
            </Link>
          </div>
          <h1 className="text-4xl font-black py-20 text-center">
            Universidades de {cat2?.titulo}
          </h1>
          <div className="container mx-auto">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
              {uni &&
                uni.map((obj, index) => (
                  <div key={index}>
                    <div className="text-center fuenteEnjoy text-xl uppercase">
                      <h1>{obj.inicialesUni}</h1>
                    </div>
                    <div className="flex justify-center pb-10">
                      <div className=" relative  cursor-pointer  pt-4 hover:scale-110 transition-all duration-150">
                        <Link to={`/usuario/universidad/${obj._id}`}>
                          <img
                            className="imagenUnis rounded-xl transition duration-300 ease-in-out  shadow-2xl"
                            src={obj.imgUni}
                            alt={obj.titulo}
                            width={384}
                            height={384}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversidadesCategoriaUsuarios;
