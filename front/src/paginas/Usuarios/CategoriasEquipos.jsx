import NavbarUsuario from "../../components/Usuarios/Navbar";
import useUsuario from "../../hooks/useUsuario";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/globales/Spinner";
import { useEffect, useState } from "react";

const CategoriasEquipos = () => {
  const pagina = "equipos";
  const params = useParams();
  const { obtenerEquipos, cargando, cat, teams } = useUsuario();

  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  useEffect(() => {
    setCargandoPerfil(true);
    obtenerEquipos(params.id).then(() => {
      setCargandoPerfil(false);
    });
  }, [params.id]);

  return (
    <>
      <NavbarUsuario pagina={pagina} />
      <div className="">
        <div className="mt-[98px] absolute laptop:mt-24 ms-10">
          <Link
            to="/usuario/categorias"
            className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors"
          >
            Regresar
          </Link>
        </div>
        {cargando ? (
          <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col h-screen justify-center items-center fuenteEnjoy ">
            <div className="  h-4/6 w-4/6 rounded border-2 shadow-xl ">
              <div className="text-center pt-5">
                <p className=" text-slate-400 md:text-xl">Categoria</p>
                <h1 className="md:text-5xl text-3xl">{cat?.titulo}</h1>
                <p className="text-naranja md:text-xl">Equipos</p>
              </div>
              <div className=" h-4/6 overflow-y-auto pt-10">
                {teams.map((obj, index) => (
                  <div key={index} className="pb-5 lg:text-lg text-sm ">
                    <Link to={`/usuario/equipo/${obj._id}`}>
                      <div className=" mx-10 bg-gray-200 rounded py-2 justify-center flex items-center  transition-all duration-150 hover:border hover:border-naranja border border-gray200">
                        <div className="w-1/12  ms-10 mr-5 md:flex hidden justify-start ">
                          <img
                            className="imagenUniSmall rounded"
                            src={obj.universidad.imgUni}
                          />
                        </div>
                        <div className="w-3/6 ">{obj.teamName}</div>
                        <div className="w-3/6  md:flex hidden justify-center">
                          <p className="">Miembros: {obj.miembros.length}</p>
                        </div>
                        <div className="w-3/6 mr-10 md:flex hidden justify-end">
                          <p className="">Capitan: {obj.capitan.nombre}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriasEquipos;
