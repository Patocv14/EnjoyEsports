import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/globales/Spinner";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando)
    return (
      <div className="flex lg:flex-row flex-col-reverse h-screen justify-around items-center fuenteEnjoy mt-20  ">
        <Spinner />
      </div>
    );

  return <>{auth.admin === true ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default RutaProtegida;
