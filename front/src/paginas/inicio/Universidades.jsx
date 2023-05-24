import Header from "../../components/publica/Inicio/Header";
import Navbar from "../../components/publica/Inicio/Navbar";
import Footer from "../../components/publica/Inicio/Footer";
import useUsuario from "../../hooks/useUsuario";
import { Link } from "react-router-dom";
import Spinner from "../../components/globales/Spinner";
import useAuth from "../../hooks/useAuth";

const Universidades = () => {
  const { categoria, cargando } = useUsuario();
  const { auth } = useAuth();
  const pagina = "universidades";
  return (
    <div className="bg-fondo">
      <Navbar pagina={pagina} />
      <Header />

      {cargando ? (
        <Spinner />
      ) : (
        <div className="container mx-auto">
          <div className="fuenteEnjoy text-center md:text-5xl text-3xl py-2 uppercase">
            <h1>Universidades</h1>
            <h2 className="text-naranja">2023</h2>
            <h3 className="py-16">College Collition</h3>
          </div>

          {categoria.map((cat) => (
            <div key={"categoria-" + cat._id}>
              <div className="flex gap-24 my-5">
                {cat.universidades.length > 0 ? (
                  cat.universidades.map((cat2) => (
                    <div key={"universidad-" + cat2._id}>
                      <div className="flex  pb-10">
                        <div className=" relative  cursor-pointer pt-1  hover:scale-110 transition-all duration-150">
                          <p className="font-bold">{cat2.inicialesUni}</p>
                          <Link
                            to={
                              !auth
                                ? "/login"
                                : auth.admin
                                ? `/admin/universidad/${cat2._id}`
                                : `/usuario/universidad/${cat2._id}`
                            }
                          >
                            <img
                              className="imagenUnis2 rounded-xl transition duration-300 ease-in-out  shadow-2xl"
                              src={cat2.imgUni}
                              alt={cat2.uni}
                              width={184}
                              height={184}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Universidades;
