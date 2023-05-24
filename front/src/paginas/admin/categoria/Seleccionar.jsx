import NavbarAdmin from "../../../components/Admin/Navbar";
import useAdmin from "../../../hooks/useAdmin";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../components/globales/Spinner";

const Seleccionar = () => {
  const pagina = "categorias";
  const params = useParams();
  const { categorias, cargando } = useAdmin();
  const categoria = categorias.filter((cat) => cat._id === params.id);

  return (
    <div>
      <NavbarAdmin pagina={pagina} />
      <div className="mt-[98px] absolute laptop:mt-24 ms-10">
        <Link
          to="/admin/categorias"
          className="bg-naranja p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-orange-700 transition-colors"
        >
          Regresar
        </Link>
      </div>
      {cargando ? (
        <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center items-center fuenteEnjoy ">
          <div className=" bg-gray-200 h-4/6 w-4/6 rounded border-2 shadow-xl ">
            <div className="text-center pt-5">
              <p className=" text-slate-400 md:text-xl">Categoria</p>
              <h1 className="md:text-5xl text-3xl">{categoria[0]?.titulo}</h1>
              <p className="text-naranja md:text-xl">Equipos Y Universidades</p>
            </div>
            <div className="flex md:justify-around justify-center flex-col md:flex-row pt-10">
              <div className=" ">
                <h1 className="text-center md:text-4xl text-2xl">Equipos</h1>
                <div className="flex justify-center md:py-10 py-5  cursor-pointer">
                  <Link to={`/admin/categorias/equipos/${params.id}`}>
                    <div className="md:h-[200px] md:w-[200px] h-[150px] w-[150px] bg-gray-300 rounded border-black border flex items-center justify-center hover:scale-105 transition-all duration-150">
                      <div className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-24 h-24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className=" ">
                <h1 className="text-center md:text-4xl text-2xl">
                  Universidades
                </h1>
                <div className="flex justify-center md:py-10 py-5  cursor-pointer">
                  <Link to={`/admin/categorias/universidades/${params.id}`}>
                    <div className="md:h-[200px] md:w-[200px] h-[150px] w-[150px] bg-gray-300 rounded border-black border flex items-center justify-center hover:scale-105 transition-all duration-150">
                      <div className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-24 h-24"
                        >
                          <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                          <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                          <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seleccionar;
