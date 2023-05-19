import Header from "../../components/publica/Inicio/Header";
import Navbar from "../../components/publica/Inicio/Navbar";
import Footer from "../../components/publica/Inicio/Footer";

const Universidades = () => {
  const pagina = "universidades";
  return (
    <div className="bg-fondo">
      <Navbar pagina={pagina} />
      <Header />
      <div className="container mx-auto">
        <div className="fuenteEnjoy text-center md:text-5xl text-3xl py-2 uppercase">
          <h1>Universidades</h1>
          <h2 className="text-naranja">2023</h2>
          <h3 className="py-16">College Collition</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Universidades;
