import React from "react";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import QuienesSomos from "@/components/Nosotros/QuienesSomos";

const nosotros = () => {
  const pagina = "nosotros";

  return (
    <div className="bg-fondo">
      <NavBar pagina={pagina} />
      <Header />
      <QuienesSomos />
    </div>
  );
};

export default nosotros;
