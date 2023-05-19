import Header from "../../components/publica/Inicio/Header";
import Navbar from "../../components/publica/Inicio/Navbar";
import Footer from "../../components/publica/Inicio/Footer";
import Clafisifaciones from "../../components/publica/Inicio/Clasificaciones";

import tazon from "../../assets/tazon.jpg";

const Inicio = () => {
  const pagina = "inicio";

  return (
    <>
      <Navbar pagina={pagina} />
      <Header />
      <Clafisifaciones />

      <div className="pt-10">
        <div>
          <h1 className="text-center text-black md:text-5xl text-3xl fuenteEnjoy pb-10">
            Noticias
          </h1>
          <div className="noticiaBg py-10 grid 2xl:grid-cols-2 grid-cols-1">
            <div className="flex justify-end">
              <img className="imagenTazon" src={tazon} alt="tazon Imagen" />
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="">
                <div className="md:text-6xl text-3xl fuenteEnjoy md:w-[800px] w-[300px]">
                  <h1 className="text-white md:mt-0 mt-10">
                    ¡Hoy es la gran final del tazon de los flechados!
                  </h1>
                </div>

                <div className="md:w-[700px] w-[320px] pt-10">
                  <p className="text-white md:text-xl text-xs font-semibold">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Inicio;
