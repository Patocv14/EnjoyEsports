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
import CrearCategoria from "./paginas/admin/categoria/CrearCategoria";
import EditarCategoria from "./paginas/admin/categoria/EditarCategoria";
import EquiposCategorias from "./paginas/admin/categoria/EquiposCategorias";
import Seleccionar from "./paginas/admin/categoria/Seleccionar";
import PerfilAdmin from "./paginas/admin/PerfilAdmin";
import EquipoAdmin from "./paginas/admin/Equipo/EquipoAdmin";
import UniversidadesCategoria from "./paginas/admin/categoria/UniversidadesCategoria";
import UniversidadAdmin from "./paginas/admin/Universidad/UniversidadAdmin";
import UniversidadesView from "./paginas/admin/UniversidadesView";
//Admin

//Usuario
import HomeUsuario from "./paginas/Usuarios/HomeUsuario";
import Equipo from "./paginas/Usuarios/Equipo";
import CrearEquipo from "./paginas/Usuarios/CrearEquipo";
import Universidad from "./paginas/Usuarios/cordinador/Universidad";
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
import EquiposView from "./paginas/admin/EquiposView";
import Perfil from "./components/Usuarios/Perfil";
import UniversidadUsuario from "./paginas/Usuarios/UniversidadUsuario";
import UniversidadesUsuario from "./paginas/Usuarios/UniversidadesUsuario";
import EquiposUsuarios from "./paginas/Usuarios/EquiposUsuarios";
import CategoriasUsuario from "./paginas/Usuarios/CategoriasUsuario";
import CategoriasSeleccionarUsuario from "./paginas/Usuarios/CategoriasSeleccionarUsuario";
import CategoriasEquipos from "./paginas/Usuarios/CategoriasEquipos";
import UniversidadesCategoriaUsuarios from "./paginas/Usuarios/UniversidadesCategoriaUsuarios";

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
                <Route
                  path="categorias/seleccionar/:id"
                  element={<Seleccionar />}
                />
                <Route
                  path="categorias/universidades/:id"
                  element={<UniversidadesCategoria />}
                />
                <Route path="equipo/:id" element={<EquipoAdmin />} />

                <Route path="universidad/:id" element={<UniversidadAdmin />} />
                <Route path="universidades" element={<UniversidadesView />} />
                <Route path="equipos" element={<EquiposView />} />
                <Route path="perfil/:id" element={<PerfilAdmin />} />
                <Route path="noticias" element={<Noticias />} />
              </Route>
              {/* SOLO ADMIN PUEDE ACCEDER AQUI */}

              <Route path="/usuario" element={<RutaProtegidaUsuario />}>
                <Route index element={<HomeUsuario />} />
                <Route path="equipo/:id" element={<Equipo />} />
                <Route path="universidad" element={<Universidad />} />
                <Route path="crear-equipo" element={<CrearEquipo />} />
                <Route path="perfil/:id" element={<Perfil />} />
                <Route
                  path="universidad/:id"
                  element={<UniversidadUsuario />}
                />
                <Route
                  path="universidades"
                  element={<UniversidadesUsuario />}
                />
                <Route path="categorias" element={<CategoriasUsuario />} />
                <Route
                  path="categorias/seleccionar/:id"
                  element={<CategoriasSeleccionarUsuario />}
                />
                <Route
                  path="categorias/equipos/:id"
                  element={<CategoriasEquipos />}
                />
                <Route
                  path="categorias/universidades/:id"
                  element={<UniversidadesCategoriaUsuarios />}
                />
                <Route path="equipos" element={<EquiposUsuarios />} />
              </Route>
            </Routes>
          </UsuarioProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
