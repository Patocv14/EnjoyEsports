import NavbarUsuario from "../../components/Usuarios/Navbar";
import { useParams } from "react-router-dom";
import useUsuario from "../../hooks/useUsuario";
import { Link } from "react-router-dom";

const UniversidadesUsuario = () => {
  const pagina = "universidades";
  const { categoria, cargando, universidades } = useUsuario();

  return (
    <div>
      <NavbarUsuario pagina={pagina} />

      {cargando ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <div className="mt-[98px] absolute laptop:mt-24 ms-10"></div>
          <h1 className="text-4xl font-black py-20 text-center">
            Universidades Participando
          </h1>
          <div className="container mx-auto">
            {universidades.map((cat) => (
              <div key={"categoria-" + cat._id}>
                <div className="flex gap-24 my-5">
                  <div key={"universidad-" + cat._id}>
                    <div className="flex  pb-10">
                      <div className=" relative  cursor-pointer pt-1  hover:scale-110 transition-all duration-150">
                        <p className="font-bold">{cat.inicialesUni}</p>
                        <Link to={`/usuario/universidad/${cat._id}`}>
                          <img
                            className="imagenUnis2 rounded-xl transition duration-300 ease-in-out  shadow-2xl"
                            src={cat.imgUni}
                            alt={cat.uni}
                            width={184}
                            height={184}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversidadesUsuario;
