import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

const universidades = () => {
  const pagina = "universidades";
  return (
    <div>
      <NavBar pagina={pagina} />
      <Header />
      <h1>Universidades</h1>
      <Footer />
    </div>
  );
};

export default universidades;
