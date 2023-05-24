import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/Admin/Navbar";
import useUsuario from "../../hooks/useUsuario";
import { useParams } from "react-router-dom";
import Alerta from "../../components/globales/Alerta";
import clienteAxios from "../../config/clienteAxios";
import { Link } from "react-router-dom";
import Spinner from "../../components/globales/Spinner";

const PerfilAdmin = () => {
  const pagina = "equipos";
  const params = useParams();
  const { obtenerPerfil, usuario } = useUsuario();
  const [cargando, setCargando] = useState(false);
  const [equipo, setEquipo] = useState({});
  const [alerta, setAlerta] = useState({});

  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  useEffect(() => {
    setCargandoPerfil(true);
    obtenerPerfil(params.id).then(() => {
      setCargandoPerfil(false);
    });
  }, [params.id]);

  useEffect(() => {
    const fetchEquipo = async () => {
      setCargando(true);
      try {
        if (usuario && usuario.datos && usuario.datos.Equipo) {
          const { data } = await clienteAxios(
            `/equipo/${usuario.datos.Equipo._id}`
          );
          setEquipo(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };

    fetchEquipo();
  }, [params.id, usuario]);

  return (
    <div>
      <NavbarAdmin pagina={pagina} />
      {cargando || cargandoPerfil ? (
        <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
          <Spinner />
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
          <div className=" lg:w-2/12 w-full lg:block flex flex-col justify-center items-center pb-14">
            <div className="bg-gray-200 h-[400px] w-[400px] rounded-xl shadow-xl ">
              D
            </div>
            <div className="bg-gray-200 h-[300px] w-[400px] mt-16 rounded-xl shadow-xl">
              <h1 className="text-center pt-2 md:text-2xl">Datos</h1>
              <div className="flex flex-col mx-5 mt-10 font-sans">
                <p className="text-naranja text-base font-bold">
                  Universidad:{" "}
                  <Link
                    to={`/admin/universidad/${usuario.datos?.Universidad?._id}`}
                  >
                    <span className=" text-slate-400">
                      {usuario.admin
                        ? ""
                        : usuario.datos?.Universidad.inicialesUni}
                    </span>
                  </Link>
                </p>

                <p className="text-naranja text-base font-bold">
                  Correo:{" "}
                  <span className=" text-slate-400">{usuario?.email}</span>
                </p>
                <p className="text-naranja text-base font-bold">
                  Juego:{" "}
                  <Link
                    to={`/admin/categorias/seleccionar/${equipo.categoria?._id}`}
                  >
                    <span className=" text-slate-400">
                      {equipo && equipo.categoria?.titulo}
                    </span>
                  </Link>
                </p>
                <p className="text-naranja text-base font-bold">
                  Rol:{" "}
                  <span className=" text-slate-400">
                    {usuario?.admin
                      ? "Admin"
                      : usuario?.cordinador
                      ? "Coordinador"
                      : usuario?.capitan
                      ? "Capitan"
                      : "Miembro"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className=" lg:w-5/12 w-full lg:block flex flex-col justify-center items-center lg:mt-0 mt-[700px] mb-10">
            <div className="bg-gray-200 h-[80px] w-[800px] rounded-xl shadow-xl flex items-center justify-center">
              <h1 className="text-3xl">{usuario?.nombre}</h1>
            </div>
            <h3 className=" text-orange-300  mt-20 p-3 pb-0">Equipo:</h3>
            <div className="bg-gray-200 h-[600px] w-[800px] rounded-xl shadow-xl p-2">
              <h2 className="text-naranja text-center text-3xl py-4">
                {usuario.admin ? "" : usuario.datos?.Equipo.teamName}
              </h2>
              <div className="flex flex-col items-center ">
                {equipo.miembros &&
                  equipo.miembros.map((obj, index) => (
                    <Link
                      to={`/admin/perfil/${obj._id}`}
                      key={index}
                      className={`bg-gray-300 sm:w-5/6 w-full sm:py-3 py-2 rounded-xl my-2 hover:border hover:border-naranja border border-gray-200 ${
                        obj._id === params.id
                          ? "border-naranja animate-pulse"
                          : ""
                      }`}
                    >
                      <div className="flex sm:text-xl text-base">
                        <div className="mx-auto">{obj.nombre}</div>
                        <div className="mx-auto">
                          {obj.capitan ? "Capitan" : "Miembro"}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilAdmin;
