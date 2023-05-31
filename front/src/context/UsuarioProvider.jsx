import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
  const [alerta, setAlerta] = useState({});
  const [categoria, setCategoria] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [universidad, setUniversidad] = useState({});
  const [cargando, setCargando] = useState(false);
  const [equipos, setEquipos] = useState({});
  const [teams, setTeams] = useState([]);
  const [cat, setCat] = useState({});
  const [universidades, setUniversidades] = useState([]);

  const { auth } = useAuth;

  useEffect(() => {
    const obtenerCategorias = async () => {
      setCargando(true);
      try {
        const { data } = await clienteAxios("categoria");
        setCategoria(data);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerCategorias();
  }, [auth]);

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

      await clienteAxios.post(`/equipo`, equipo, config);

      setAlerta({
        msg: "Equipo Creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const obtenerPerfil = async (id) => {
    try {
      const { data } = await clienteAxios(`/usuarios/obtenerPerfil/${id}`);
      setUsuario(data);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const eliminarEquipo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/equipo/${id}`, config);
    } catch (error) {
      setTimeout(() => {
        setAlerta({
          msg: error.response.data.msg,
          data: true,
        });
      }, 3000);
    }
  };

  const obtenerUniversidad = async (id) => {
    try {
      const { data } = await clienteAxios(`/universidad/${id}`);
      setUniversidad(data);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const eliminarUniversidad = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/universidad/${id}`, config);
    } catch (error) {
      setTimeout(() => {
        setAlerta({
          msg: error.response.data.msg,
          data: true,
        });
      }, 3000);
    }
  };

  const eliminarJugador = async (id, id2) => {
    console.log(id);
    console.log(id2);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/equipo/salir/${id}/${id2}`, config);
    } catch (error) {
      setTimeout(() => {
        setAlerta({
          msg: error.response.data.msg,
          data: true,
        });
      }, 3000);
    }
  };

  const obtenerEquipos = async (id) => {
    setCargando(true);
    setEquipos({});
    setTeams([]);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(`/categoria/${id}`, config);
      setCat(data);
      const categoriaId = data._id;
      const equipoData = data.equipos;
      const equipoPromise = equipoData.map(async (equipo) => {
        const datos = await clienteAxios(`/equipo/${equipo}`, config);
        if (categoriaId === datos.data.categoria._id) {
          setEquipos(datos.data);
          setTeams((prevTeams) => [...prevTeams, datos.data]);
        }
        1;
      });

      await Promise.all(equipoPromise);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const obtenerUniversiaddes = async () => {
      setCargando(true);
      try {
        const { data } = await clienteAxios(`/universidad`);
        setUniversidades(data);
        setCargando(false);
      } catch (error) {
        console.log(error);
        setCargando(false);
      }
    };
    obtenerUniversiaddes();
  }, []);

  return (
    <UsuarioContext.Provider
      value={{
        mostrarAlerta,
        alerta,
        submitEquipo,
        categoria,
        obtenerPerfil,
        usuario,
        obtenerUniversidad,
        universidad,
        eliminarEquipo,
        eliminarUniversidad,
        cargando,
        obtenerEquipos,
        equipos,
        teams,
        cat,
        universidades,
        eliminarJugador,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioProvider };
export default UsuarioContext;
