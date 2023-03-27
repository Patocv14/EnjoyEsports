import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

const calendario = () => {
  const pagina = "calendario";
  return (
    <div className="bg-fondo">
      <NavBar pagina={pagina} />
      <Header />
      <div>
        <div className="fuenteEnjoy text-center md:text-5xl text-3xl pt-10 pb-10 uppercase text-naranja">
          <h1>Calendario</h1>
        </div>
        <div className="container mx-auto pb-44">
          <div className="calendario h-[600px] bg-slate-200 rounded-xl shadow-2xl"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default calendario;
