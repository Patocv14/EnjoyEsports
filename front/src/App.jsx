import { BrowserRouter, Routes, Route } from "react-router-dom";

//Formularios
import Login from "./paginas/formularios/Login";
import Registrar from "./paginas/formularios/Registrar";
import OlvidePassword from "./paginas/formularios/OlvidePassword";
import NuevoPassword from "./paginas/formularios/NuevoPassword";
import ConfirmarCuenta from "./paginas/formularios/ConfirmarCuenta";
//Formularios

//Inicio
import Inicio from "./paginas/inicio/Inicio";
import SobreNosotros from "./paginas/inicio/SobreNosotros";
import Calendario from "./paginas/inicio/Calendario";
import Competencias from "./paginas/inicio/Competencias";
import Universidades from "./paginas/inicio/Universidades";
//Inicio

//Admin
import Categoria from "./paginas/admin/Categoria";
import Home from "./paginas/admin/Home";
import Noticias from "./paginas/admin/Noticias";
//Admin

//Usuario
import HomeUsuario from "./paginas/Usuarios/HomeUsuario";
import Equipo from "./paginas/Usuarios/Equipo";
import CrearEquipo from "./paginas/Usuarios/CrearEquipo";
//Usuario

//Rutas
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";
import RutaProtegidaUsuario from "./layouts/RutaProtegidaUsuario";
//Rutas

//Providers
import { AuthProvider } from "./context/AuthProvider";
import { AdminProvider } from "./context/AdminProvider";
import { UsuarioProvider } from "./context/UsuarioProvider";
import CrearCategoria from "./paginas/admin/categoria/CrearCategoria";
import EditarCategoria from "./paginas/admin/categoria/EditarCategoria";
import EquiposCategorias from "./paginas/admin/categoria/EquiposCategorias";
import Universidad from "./paginas/Usuarios/cordinador/Universidad";
//Providers

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <UsuarioProvider>
            <Routes>
              <Route path="/">
                <Route index element={<Inicio />} />
                <Route path="sobre-nosotros" element={<SobreNosotros />} />
                <Route path="calendario" element={<Calendario />} />
                <Route path="competencias" element={<Competencias />} />
                <Route path="universidades" element={<Universidades />} />
              </Route>
              <Route path="/" element={<AuthLayout />}>
                <Route path="registrar" element={<Registrar />} />
                <Route path="login" element={<Login />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route
                  path="olvide-password/:token"
                  element={<NuevoPassword />}
                />
                <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
              </Route>

              {/* SOLO ADMIN PUEDE ACCEDER AQUI */}
              <Route path="/admin" element={<RutaProtegida />}>
                <Route index element={<Home />} />
                <Route path="categorias" element={<Categoria />} />
                <Route path="crear-categoria" element={<CrearCategoria />} />
                <Route
                  path="editar-categoria/:id"
                  element={<EditarCategoria />}
                />
                <Route
                  path="categorias/equipos/:id"
                  element={<EquiposCategorias />}
                />
                <Route path="noticias" element={<Noticias />} />
              </Route>
              {/* SOLO ADMIN PUEDE ACCEDER AQUI */}

              <Route path="/usuario" element={<RutaProtegidaUsuario />}>
                <Route index element={<HomeUsuario />} />
                <Route path="equipo" element={<Equipo />} />
                <Route path="universidad" element={<Universidad />} />
                <Route path="crear-equipo" element={<CrearEquipo />} />
              </Route>
            </Routes>
          </UsuarioProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
