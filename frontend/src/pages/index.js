import Footer from "@/components/Footer";
import Clafisifaciones from "@/components/Inicio/Clasificaciones";
import NavBar from "@/components/NavBar";
import Noticias from "@/components/Inicio/Noticias";
import { Inter } from "@next/font/google";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const pagina = "inicio";

  return (
    <div className="bg-fondo">
      <NavBar pagina={pagina} />
      <Header />
      <Clafisifaciones />
      <Noticias />
      <Footer />
    </div>
  );
}
