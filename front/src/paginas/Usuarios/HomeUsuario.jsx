import { useEffect, useState } from "react";
import NavbarUsuario from "../../components/Usuarios/Navbar";

const HomeUsuario = () => {
  const pagina = "home";

  const [recargado, setRecargado] = useState(false);

  useEffect(() => {
    if (!recargado) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 200);

      setRecargado(true);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [recargado]);

  return (
    <>
      <NavbarUsuario pagina={pagina} />
    </>
  );
};

export default HomeUsuario;
