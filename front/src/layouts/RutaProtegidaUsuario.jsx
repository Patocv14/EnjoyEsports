import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegidaUsuario = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";

  return <>{auth._id && !auth.admin ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default RutaProtegidaUsuario;
