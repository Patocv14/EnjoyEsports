import { Link } from "react-router-dom";
import NavbarUsuario from "../../components/Usuarios/Navbar";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import Spinner from "../../components/globales/Spinner";
import Alerta from "../../components/globales/Alerta";
import useUsuario from "../../hooks/useUsuario";

const Equipo = () => {
  const { auth } = useAuth();
  const pagina = "equipos";
  const params = useParams();

  const [cargando, setCargando] = useState(false);
  const [equipo, setEquipo] = useState({});
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [alerta, setAlerta] = useState({});
  const [eliminar, setEliminar] = useState(false);

  // const { categorias, eliminarEquipo } = useAdmin();

  const { categoria, eliminarEquipo, eliminarJugador } = useUsuario();

  const handleEliminarJugador = async () => {
    const del = !eliminar;
    setEliminar(del);
  };

  const handleClick = (id) => {
    if (confirm("Deseas eliminar este Jugador?")) {
      eliminarJugador(id, params.id);
      setAlerta({
        msg: "Jugador Eliminada Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 1500);
    }
  };

  const handleEliminar = async (id) => {
    try {
      if (confirm("Deseas Eliminar este Equipo??")) {
        eliminarEquipo(id);
        setAlerta({
          msg: "Equipo Eliminado Correctamente",
          error: false,
        });

        setTimeout(() => {
          setAlerta({});
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fecthEquipo = async () => {
      try {
        setCargando(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(`/equipo/${params.id}`, config);
        setEquipo(data);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          data: true,
        });
      } finally {
        setCargando(false);
      }
    };

    fecthEquipo();
  }, [params.id]);

  const { msg } = alerta;

  return (
    <>
      <NavbarUsuario pagina={pagina} />

      <h1 className="text-4xl font-black py-20 text-center">
        {cargando ? (
          <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
            <Spinner />
          </div>
        ) : (
          <div>
            {auth.datos?.Equipo == null && auth.capitan ? (
              <div>
                <p>Aun no tienes equipo</p>
                <div className="pt-20">
                  <Link
                    to="/usuario/crear-equipo"
                    className="bg-naranja p-3 uppercase text-2xl font-bold text-white rounded cursor-pointer hover:bg-rojo transition-colors"
                  >
                    Crea tu Equipo
                  </Link>
                </div>
              </div>
            ) : auth.datos?.Equipo == null &&
              !auth.capitan &&
              !auth.cordinador ? (
              <h1>Aun No Tienes Equipo!</h1>
            ) : (
              <div className="flex flex-col h-screen justify-center items-center fuenteEnjoy">
                <h1 className="uppercase mb-5">Roster</h1>
                <div className="bg-gray-200 sm:w-4/6 w-full py-3 rounded-xl mb-5">
                  <h1 className="text-center text-naranja sm:text-2xl text-lg ">
                    {equipo.universidad?.uni}
                  </h1>
                </div>
                {msg && <Alerta alerta={alerta} />}
                <div className="bg-gray-200 sm:w-4/6 w-full rounded-xl py-5 ">
                  <h1 className="text-center sm:text-2xl text-lg pb-5">
                    {equipo.teamName} ({equipo.categoria?.titulo})
                  </h1>
                  <div className="flex justify-center">
                    <div className="bg-white sm:w-5/6 w-full py-8 rounded-xl">
                      <div className="flex flex-col items-center">
                        {equipo.miembros &&
                          equipo.miembros.map((obj, index) => (
                            <>
                              {eliminar ? (
                                <Link
                                  onClick={() => handleClick(obj._id)}
                                  className="bg-gray-500 hover:bg-red-500 sm:w-5/6 w-full sm:py-3 py-2 rounded-xl my-2 hover:border hover:border-naranja border border-gray200"
                                  key={index}
                                >
                                  <div className="flex justify-between sm:text-xl text-base">
                                    <div className="ms-10 ">{obj.nombre}</div>
                                    <div className="mr-10 ">
                                      {obj.capitan ? "Capitan" : "Miembro"}
                                    </div>
                                  </div>
                                </Link>
                              ) : (
                                <Link
                                  to={`/usuario/perfil/${obj._id}`}
                                  className="bg-gray-200 sm:w-5/6 w-full sm:py-3 py-2 rounded-xl my-2 hover:border hover:border-naranja border border-gray200"
                                  key={index}
                                >
                                  <div className="flex justify-between sm:text-xl text-base">
                                    <div className="ms-10 ">{obj.nombre}</div>
                                    <div className="mr-10">
                                      {obj.capitan ? "Capitan" : "Miembro"}
                                    </div>
                                  </div>
                                </Link>
                              )}
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {auth._id === equipo.capitan?._id ? (
                  <div className="flex gap-10">
                    <button
                      onClick={() => handleEliminar(params.id)}
                      className="bg-naranja p-2 text-xl uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors mt-5"
                    >
                      Eliminar Equipo
                    </button>
                    <button
                      onClick={handleEliminarJugador}
                      className="bg-naranja p-2 text-xl uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors mt-5"
                    >
                      Editar Equipo
                    </button>
                  </div>
                ) : auth._id === equipo.universidad?.cordinador ? (
                  <div className="flex gap-10">
                    <button
                      onClick={() => handleEliminar(params.id)}
                      className="bg-naranja p-2 text-xl uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors mt-5"
                    >
                      Eliminar Equipo
                    </button>
                    <button
                      // onClick={() => }
                      className="bg-naranja p-2 text-xl uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors mt-5"
                    >
                      Editar Equipo
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        )}
      </h1>
    </>
  );
};

export default Equipo;
