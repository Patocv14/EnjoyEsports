import { Link } from "react-router-dom";
import NavbarUsuario from "../../components/Usuarios/Navbar";
import useAuth from "../../hooks/useAuth";

const Equipo = () => {
  const { auth } = useAuth();

  const pagina = "equipo";

  return (
    <>
      <NavbarUsuario pagina={pagina} />

      <h1 className="text-4xl font-black py-20 text-center">
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
        ) : auth.datos?.Equipo == null && !auth.capitan ? (
          "Aun No Tienes Equipo"
        ) : (
          `Si tiene equipo ${auth.datos.Equipo}`
        )}
      </h1>
    </>
  );
};

export default Equipo;
