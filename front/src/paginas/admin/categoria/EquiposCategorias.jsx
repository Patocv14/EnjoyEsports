import { useParams } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/Admin/Navbar";
import { Link } from "react-router-dom";

const EquiposCategorias = () => {
  const pagina = "categorias";
  const params = useParams();

  const { obtenerEquipo, equipos, cargando, categoria } = useAdmin();

  useEffect(() => {
    obtenerEquipo(params.id);
  }, []);

  console.log(equipos);

  return (
    <>
      <NavbarAdmin pagina={pagina} />
      <div className="flex flex-col h-screen justify-center items-center">
        {cargando ? (
          <h1>Cargando...</h1>
        ) : (
          <div>
            <h1 className="text-4xl fuenteEnjoy">
              Equipos de {categoria.titulo}
            </h1>
            <div className="container mx-auto">
              <div className="mt-20 flex justify-center"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EquiposCategorias;
