import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  Building,
  PlusCircle,
  Activity,
  LogIn,
  LogOut,
} from "lucide-react";

const Navigation = ({ onLogout, user }) => {
  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y navegación básica */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Building className="h-8 w-8" />
              </Link>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Nueva Beca
              </Link>
              <Link
                to="/consultar-estado"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Activity className="h-4 w-4 mr-2" />
                Estado de la Beca
              </Link>

              {user && (
                <>
                  <Link
                    to="/ver-tramites"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Lista de Trámites
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <button
                onClick={onLogout}
                className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium text-white flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium text-white flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
