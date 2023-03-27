import React from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import CompetenciaMain from "@/components/competencias/competenciaMain";

import comp from "../jsons/competencias.json";
import oComp from "../jsons/otrasCompetencias.json";

const competencias = () => {
  const obj = comp;

  const pagina = "competencias";
  return (
    <div className="bg-fondo">
      <NavBar pagina={pagina} />
      <Header />
      <CompetenciaMain comp={obj} oComp={oComp} />
      <Footer />
    </div>
  );
};

export default competencias;
