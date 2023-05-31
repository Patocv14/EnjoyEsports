import React, { useState } from "react";
import NavbarUsuario from "../../components/Usuarios/Navbar";
import { Link } from "react-router-dom";
import useUsuario from "../../hooks/useUsuario";
import Spinner from "../../components/globales/Spinner";

const CategoriasUsuario = () => {
  const pagina = "categorias";

  let { categoria, cargando } = useUsuario();

  categoria = categoria || [];

  if (cargando) {
    return <Spinner />;
  }

  return (
    <div className="">
      <div className="container mx-auto">
        <NavbarUsuario pagina={pagina} />
        <div className="fuenteEnjoy text-center md:text-5xl text-3xl py-2 uppercase mt-20">
          <h1>Competencias</h1>
          <h2 className="text-naranja">2023</h2>
          <h3 className="py-16">College Collition</h3>
        </div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          {categoria.map((obj) => (
            <div key={obj._id}>
              <div className="text-center fuenteEnjoy text-xl uppercase">
                <h1>{obj.titulo}</h1>
              </div>
              <div className="flex justify-center">
                <div className=" relative  cursor-pointer py-8 hover:scale-110 transition-all duration-150">
                  <Link to={`/usuario/categorias/seleccionar/${obj._id}`}>
                    <img
                      className="imagenCompetencias rounded-xl transition duration-300 ease-in-out  shadow-2xl"
                      src={obj.imagen}
                      alt={obj.titulo}
                      width={384}
                      height={384}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriasUsuario;
