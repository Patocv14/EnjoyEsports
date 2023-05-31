import FormularioEquipo from "../../components/Usuarios/FormularioEquipo";
import NavbarUsuario from "../../components/Usuarios/Navbar";
import useAuth from "../../hooks/useAuth";
import Alerta from "../../components/globales/Alerta";
import { useEffect, useState } from "react";

const CrearEquipo = () => {
  const pagina = "equipo";

  const { auth } = useAuth();

  const [alerta, setAlerta] = useState({});
  const [capitan, setCapitan] = useState(false);

  useEffect(() => {
    if (auth.capitan === false) {
      setAlerta({
        msg: "Solo el capitan puede crear Equipos",
        error: true,
      });
      setCapitan(false);
    } else {
      setCapitan(true);
    }
  }, [auth.capitan]);

  return (
    <>
      {capitan ? (
        <div>
          <NavbarUsuario pagina={pagina} />
          <h1 className="text-4xl font-black py-20 text-center">
            Crear un Nuevo Equipo
          </h1>

          <div className="mt-10 flex justify-center">
            <FormularioEquipo />
          </div>
        </div>
      ) : (
        <div>
          <NavbarUsuario pagina={pagina} />
          <div className="flex flex-col h-screen justify-center items-center fuenteEnjoy ">
            <Alerta alerta={alerta} />
          </div>
        </div>
      )}
    </>
  );
};

export default CrearEquipo;
