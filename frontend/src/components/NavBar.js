import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = ({ pagina }) => {
  const [state, setState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const changeValueScroll = () => {
      const scrollValue = document.documentElement.scrollTop;

      if (scrollValue > 80) {
        setState(true);
      } else {
        setState(false);
      }
    };

    window.addEventListener("scroll", changeValueScroll);
  }, []);

  return (
    <header
      className={` ${
        state ? "bg-opacity-50 bg-gris2 headerBlur" : ""
      } fixed laptop:top-0 laptop:left-0 laptop:right-0 top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent header `}
    >
      <div className="container mx-auto px-5 laptop:px-16 text-white py-5 text-xl">
        <nav className="flex flex-col md:justify-start laptop:-ml-5">
          <div className="">
            <div className=" flex justify-around">
              <div className="ml-5 space-x-5 laptop:flex flex-col laptop:flex-row hidden items-center">
                <div
                  onClick={() => router.push("/")}
                  className={`${
                    pagina === "inicio" ? "text-naranja" : ""
                  }  hover:text-naranja cursor-pointer fuenteEnjoy uppercase transition-all duration-100`}
                >
                  Inicio
                </div>
                <div
                  onClick={() => router.push("/nosotros")}
                  className={`${
                    pagina === "nosotros" ? " text-naranja" : ""
                  }  hover:text-naranja cursor-pointer uppercase fuenteEnjoy transition-all duration-100`}
                >
                  Sobre Nosotros
                </div>
                <div
                  onClick={() => router.push("/calendario")}
                  className={`${
                    pagina === "calendario" ? " text-naranja" : ""
                  }  hover:text-naranja cursor-pointer uppercase fuenteEnjoy transition-all duration-100`}
                >
                  Calendario
                </div>
                <div
                  onClick={() => router.push("/competencias")}
                  className={`${
                    pagina === "competencias" ? " text-naranja" : ""
                  }  hover:text-naranja cursor-pointer uppercase fuenteEnjoy transition-all duration-100`}
                >
                  Competencias
                </div>
                <div
                  onClick={() => router.push("/universidades")}
                  className={`${
                    pagina === "universidades" ? " text-naranja" : ""
                  }  hover:text-naranja cursor-pointer uppercase fuenteEnjoy transition-all duration-100`}
                >
                  Universidades
                </div>
              </div>
              <div className=" bg-cyan px-3 py-2 rounded-xl fuenteEnjoy laptop:flex hidden">
                <button
                  className="text-black uppercase"
                  onClick={() => router.push("/login")}
                >
                  Iniciar Sesion
                </button>
              </div>
            </div>
            <div className="laptop:hidden flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
