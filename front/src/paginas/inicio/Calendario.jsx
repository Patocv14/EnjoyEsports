import Header from "../../components/publica/Inicio/Header";
import Navbar from "../../components/publica/Inicio/Navbar";
import Footer from "../../components/publica/Inicio/Footer";

const Calendario = () => {
  const pagina = "calendario";
  return (
    <div className="bg-fondo">
      <Navbar pagina={pagina} />
      <Header />
      <div>
        <div className="fuenteEnjoy text-center md:text-5xl text-3xl pt-10 pb-10 uppercase text-naranja">
          <h1>Calendario</h1>
        </div>
        <div className="container mx-auto pb-44">
          <div className="calendario h-[600px] bg-slate-200 rounded-xl shadow-2xl">
            <iframe
              className="rounded-xl"
              width="1540"
              height="600"
              src="https://widget.toornament.com/tournaments/6491013719597350912/matches/schedule/?_locale=es"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calendario;
