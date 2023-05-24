import Header from "../../components/publica/Inicio/Header";
import Navbar from "../../components/publica/Inicio/Navbar";
import Footer from "../../components/publica/Inicio/Footer";
import { Link } from "react-router-dom";

import useUsuario from "../../hooks/useUsuario";

const Competencias = () => {
  const pagina = "competencias";

  const { categoria } = useUsuario();

  return (
    <div className="bg-fondo">
      <Navbar pagina={pagina} />
      <Header />
      <div className="container mx-auto">
        <div className="fuenteEnjoy text-center md:text-5xl text-3xl py-2 uppercase">
          <h1>Competencias</h1>
          <h2 className="text-naranja">2023</h2>
          <h3 className="py-16">College Collition</h3>
        </div>
        <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          {categoria.map((obj) => (
            <div key={obj._id}>
              <div className="flex justify-center">
                <Link to={`/usuario/categorias/seleccionar/${obj._id}`}>
                  <img
                    className="imagenCompetencias rounded-xl transition duration-300 ease-in-out hover:scale-110 cursor-pointer shadow-2xl"
                    src={obj.imagen}
                    alt={obj.titulo}
                    width={384}
                    height={384}
                  />
                </Link>
              </div>
              <div className="text-center pt-5 pb-10 fuenteEnjoy text-xl uppercase">
                <h1>{obj.titulo}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Competencias;
