import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [categoria, setCategoria] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [equipos, setEquipos] = useState({});
  const [universidad, setUniversidad] = useState({});
  const [teams, setTeams] = useState([]);

  const { auth } = useAuth();

  useEffect(() => {
    const obtenerCategorias = async () => {
      setCargando(true);
      try {
        const { data } = await clienteAxios("categoria");
        setCategorias(data);
        setCargando(false);
      } catch (error) {
        console.log(error);
        setCargando(false);
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

  const submitCategoria = async (categoria) => {
    if (categoria.id) {
      await editarCategoria(categoria);
    } else {
      await crearCategoria(categoria);
    }
  };

  const editarCategoria = async (categoria) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/categoria/${categoria.id}`,
        categoria,
        config
      );

      const categoriasActualizadas = categorias.map((cat) =>
        cat._id === data._id ? data : cat
      );
      setCategorias(categoriasActualizadas);

      setAlerta({
        msg: "Categoria Actualizada Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/admin/categorias");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const crearCategoria = async (categoria) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/categoria", categoria, config);

      setCategorias([...categorias, data]);

      setAlerta({
        msg: "Categoria Creada Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/admin/categorias");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/categoria/${id}`, config);

      const categoriasActualizadas = categorias.filter((cat) => cat._id !== id);
      setCategorias(categoriasActualizadas);
    } catch (error) {
      console.log(error);
    }
  };

  const submitNoticia = async (noticia) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.post("/noticias", noticia, config);

      setAlerta({
        msg: "Noticia Creada Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCategoria = async (id) => {
    setCargando(true);
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
      console.log(data);
      setCategoria(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerEquipos = async (id) => {
    setCargando(true);
    setCategoria({});
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
      setCategoria(data);
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

  const submitUniversidad = async (universidad) => {
    if (universidad.id) {
      await editarUniversidad(universidad);
    } else {
      await crearUniversidad(universidad);
    }
  };

  const editarUniversidad = async (universidad) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/universidad/${universidad.id}`,
        universidad,
        config
      );

      setUniversidad({ ...universidad, data });

      setAlerta({
        msg: "Universidad Actualizada Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/usuario/universidad");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const crearUniversidad = async (universidad) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/universidad",
        universidad,
        config
      );

      setUniversidad({ ...universidad, data });

      setAlerta({
        msg: "Universidad Creada Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/usuario/universidad");
      }, 3000);
    } catch (error) {
      console.log(error);
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

  return (
    <AdminContext.Provider
      value={{
        mostrarAlerta,
        alerta,
        submitCategoria,
        submitNoticia,
        obtenerCategoria,
        categoria,
        categorias,
        cargando,
        eliminarCategoria,
        obtenerEquipos,
        equipos,
        universidad,
        submitUniversidad,
        teams,
        eliminarEquipo,
        eliminarUniversidad,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider };

export default AdminContext;
