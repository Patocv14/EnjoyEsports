import NavbarAdmin from "../../components/Admin/Navbar";
import FormularioNoticias from "../../components/Admin/FormularioNoticias";

const Noticias = () => {
  const pagina = "noticias";

  return (
    <>
      <NavbarAdmin pagina={pagina} />
      <h1 className="text-4xl font-black py-20 text-center">
        Crear Nueva Noticia
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioNoticias />
      </div>
    </>
  );
};

export default Noticias;
