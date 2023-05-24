import NavbarAdmin from "../../components/Admin/Navbar";
import { useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { Link } from "react-router-dom";

const EquiposView = () => {
  const pagina = "equipos";

  const params = useParams();
  const { categorias, cargando } = useAdmin();

  return (
    <div>
      <NavbarAdmin pagina={pagina} />

      {cargando ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <div className="mt-[98px] absolute laptop:mt-24 ms-10"></div>
          <h1 className="text-4xl font-black py-20 text-center">
            Universidades Participando
          </h1>
          <div className="container mx-auto">
            {categorias.map((cat) => (
              <div key={cat._id}>
                {cat.equipos.length > 0 && (
                  <div>
                    <h1 className="text-3xl fuenteEnjoy">{cat.titulo}</h1>
                  </div>
                )}
                <div className="flex gap-24 my-5">
                  {cat.equipos.length > 0 ? (
                    cat.equipos.map((cat2) => (
                      <div key={cat2._id}>
                        <div className="flex  pb-10">
                          <div className=" relative  cursor-pointer pt-1  hover:scale-110 transition-all duration-150">
                            <p className="font-bold">{cat2.teamName}</p>
                            <Link to={`/admin/equipo/${cat2._id}`}>
                              <img
                                className="imagenUnis2 rounded-xl transition duration-300 ease-in-out  shadow-2xl"
                                // src={cat2.imgUni}
                                // alt={cat2.uni}
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
        </div>
      )}
    </div>
  );
};

export default EquiposView;
