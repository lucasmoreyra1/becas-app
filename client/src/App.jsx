import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GenerarTramite from "./pages/GenerarTramite";
import VerTramites from "./pages/VerTramites";
import ConsultarEstado from "./pages/ConsultaEstado";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Navigation from "./components/Navigation";
import { useAuth } from "./context/AuthContext"; // Importa el contexto de autenticación
import ErrorBoundary from "./components/ErrorBoundary";
import Inicio from "./components/Inicio";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Componente separado para manejar el acceso a `useAuth()`
function AppContent() {
  const { user, signOut } = useAuth(); // Obtiene el usuario y la función de cierre de sesión
  // const userRole = user ? user.role : null; // Obtiene el rol del usuario

  return (
    <>
      {/* <Navigation userRole={userRole} onLogout={signOut} user={user} /> */}
      <Navigation onLogout={signOut} user={user} />
      <Routes>
        <Route path="/" element={<Inicio></Inicio>} />
        {<Route path="/generar-tramite" element={<GenerarTramite />} />}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/consultar-estado" element={<ConsultarEstado />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/ver-tramites"
            element={
              <ErrorBoundary>
                <VerTramites />
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
