import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
  const [alerta, setAlerta] = useState({});
  const [categoria, setCategoria] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data } = await clienteAxios("categoria");
        setCategoria(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCategorias();
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitEquipo = async (equipo) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/equipo", equipo, config);

      setAlerta({
        msg: "Equipo Creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/usuario/equipo");
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        mostrarAlerta,
        alerta,
        submitEquipo,
        categoria,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioProvider };
export default UsuarioContext;
