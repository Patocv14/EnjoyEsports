import FormularioEquipo from "../../components/Usuarios/FormularioEquipo";
import NavbarUsuario from "../../components/Usuarios/Navbar";

const CrearEquipo = () => {
  const pagina = "equipo";

  return (
    <>
      <NavbarUsuario pagina={pagina} />
      <h1 className="text-4xl font-black py-20 text-center">
        Crear un Nuevo Equipo
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioEquipo />
      </div>
    </>
  );
};

export default CrearEquipo;
