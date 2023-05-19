import FormularioUniversidad from "../../../components/Usuarios/FormularioUniversidad";
import NavbarUsuario from "../../../components/Usuarios/Navbar";

const Universidad = () => {
  const pagina = "universidad";

  return (
    <div>
      <NavbarUsuario pagina={pagina} />
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-4xl fuenteEnjoy mt-24">Registrar Universidad</h1>
        <div className="container mx-auto">
          <div className="mt-20 flex justify-center">
            <FormularioUniversidad />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Universidad;
