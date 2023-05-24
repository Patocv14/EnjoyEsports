import NavbarAdmin from "../../../components/Admin/Navbar";
import { useEffect, useState } from "react";
import clienteAxios from "../../../config/clienteAxios";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/globales/Spinner";
import { Link } from "react-router-dom";
import useUsuario from "../../../hooks/useUsuario";
import Alerta from "../../../components/globales/Alerta";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";

const UniversidadAdmin = () => {
  const pagina = "universidades";

  const [cargando, setCargando] = useState(false);
  const [universidad, setUniversidad] = useState({});
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const params = useParams();

  const { categoria } = useUsuario();
  const { eliminarUniversidad } = useAdmin();

  const handleEliminar = async (id) => {
    try {
      if (confirm("Deseas Eliminar esta Universidad??")) {
        try {
          eliminarUniversidad(id);
          setAlerta({
            msg: "Universidad Eliminado Correctamente",
            error: false,
          });
          setTimeout(() => {
            setAlerta({});
            navigate("/admin/universidades");
          }, 2000);
        } catch (error) {
          console.log(error);
          setAlerta({
            msg: error.response.data.msg,
            error: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fecthEquipo = async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(
          `/universidad/${params.id}`,
          config
        );
        setUniversidad(data);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };

    fecthEquipo();
  }, [params.id]);

  const { msg } = alerta;
  console.log(msg);

  return (
    <div>
      <NavbarAdmin pagina={pagina} />
      {cargando ? (
        <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
            <div className=" lg:w-2/12 w-full lg:block flex flex-col justify-center items-center pb-14">
              <div className="bg-gray-200 h-[400px] w-[400px] rounded-xl shadow-xl flex justify-center items-center ">
                <img
                  src={universidad.imgUni}
                  className="perfilFoto rounded-lg shadow-2xl"
                  height={400}
                  width={400}
                />
              </div>

              <div className="bg-gray-200 h-[300px] w-[400px] mt-16 rounded-xl shadow-xl">
                <h1 className="text-center pt-2 md:text-2xl">Datos</h1>
                <div className="flex flex-col mx-5 mt-10 font-sans">
                  <p className="text-naranja text-base font-bold">
                    Correo:{" "}
                    <span className=" text-slate-400">
                      {universidad?.correo}
                    </span>
                  </p>
                  <p className="text-naranja text-base font-bold">
                    Coordinador:{" "}
                    <span className=" text-slate-400">
                      {universidad && universidad?.cordinador?.nombre}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleEliminar(params.id)}
                className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors mt-5"
              >
                Eliminar Universidad
              </button>
            </div>

            <div className=" lg:w-5/12 w-full lg:block flex flex-col justify-center items-center lg:mt-0 mt-[700px] mb-10">
              <div className="bg-gray-200 h-[80px] w-[800px] rounded-xl shadow-xl flex items-center justify-center">
                <h1 className="text-3xl">{universidad?.uni}</h1>
              </div>
              {msg && <Alerta alerta={alerta} />}
              <h3 className=" text-orange-300  mt-20 p-3 pb-0">Equipo:</h3>
              <div className="bg-gray-200 h-[600px] w-[800px] rounded-xl shadow-xl p-2">
                <h2 className="text-naranja text-center text-3xl py-4">
                  Equipos de {universidad.inicialesUni}
                </h2>

                <div className="flex flex-col items-center ">
                  {universidad.teams &&
                    universidad.teams.map((obj, index) => (
                      <Link
                        to={`/admin/equipo/${obj._id}`}
                        key={index}
                        className={`bg-gray-300 sm:w-5/6 w-full sm:py-3 py-2 rounded-xl my-2 hover:border hover:border-naranja border border-gray-200 
                          `}
                      >
                        <div className="flex sm:text-xl text-base">
                          <div className="mx-auto">{obj.teamName}</div>
                          <div className="mx-auto">
                            {
                              categoria.find((cat) => cat._id === obj.categoria)
                                ?.titulo
                            }
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversidadAdmin;
