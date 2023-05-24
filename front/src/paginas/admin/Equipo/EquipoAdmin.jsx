import { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/Admin/Navbar";
import useAdmin from "../../../hooks/useAdmin";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../config/clienteAxios";
import { Link } from "react-router-dom";
import Spinner from "../../../components/globales/Spinner";
import Alerta from "../../../components/globales/Alerta";

const EquipoAdmin = () => {
  const pagina = "equipos";
  const [cargando, setCargando] = useState(false);
  const [equipo, setEquipo] = useState({});
  const [alerta, setAlerta] = useState({});

  const { categorias, eliminarEquipo } = useAdmin();
  const params = useParams();

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
    <div>
      <NavbarAdmin pagina={pagina} />
      {cargando ? (
        <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center items-center fuenteEnjoy">
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
                      <Link
                        to={`/admin/perfil/${obj._id}`}
                        key={index}
                        className="bg-gray-200 sm:w-5/6 w-full sm:py-3 py-2 rounded-xl my-2 hover:border hover:border-naranja border border-gray200"
                      >
                        <div className="flex justify-between sm:text-xl text-base">
                          <div className="ms-10 ">{obj.nombre}</div>
                          <div className="mr-10">
                            {obj.capitan ? "Capitan" : "Miembro"}
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleEliminar(params.id)}
            className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors mt-5"
          >
            Eliminar Equipo
          </button>
        </div>
      )}
    </div>
  );
};

export default EquipoAdmin;
