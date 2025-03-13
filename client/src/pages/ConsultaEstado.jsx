import React, { useState } from "react";
import { Search, Loader } from "lucide-react";
import { getTramite } from "../api/tramites";

const ConsultaEstado = () => {
  const [searchId, setSearchId] = useState("");
  const [tramite, setTramite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTramite(null);

    try {
      const result = await getTramite(searchId);
      setTramite(result);
      console.log(result);
    } catch (error) {
      setError(
        "No se encontró el trámite o hubo un error en la búsqueda." +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Consultar Estado del Trámite
      </h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Ingrese DNI"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Buscar
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center text-gray-500 mt-4">
          <Loader className="h-6 w-6 animate-spin inline" /> Buscando trámite...
        </div>
      )}

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      {tramite && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Estado del Trámite
          </h3>
          <div className="mb-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${
                tramite.estado === "Aprobado"
                  ? "bg-green-100 text-green-800"
                  : tramite.estado === "Rechazado"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {tramite.estado === "Aprobado"
                ? "Aprobado"
                : tramite.estado === "Rechazado"
                ? "Rechazado"
                : "Pendiente"}
            </span>
          </div>
          {tramite.comentario && (
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <p className="text-sm text-gray-600">{tramite.comentario}</p>
            </div>
          )}
          <h4 className="text-md font-semibold text-gray-800 mb-3">Detalles</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Nombre:</strong> {tramite.Solicitud.nombre}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Apellido:</strong> {tramite.Solicitud.apellido}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Teléfono:</strong> {tramite.Solicitud.telefono}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {tramite.Solicitud.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Fecha de Nacimiento:</strong>{" "}
              {new Date(
                tramite.Solicitud.fecha_nacimiento
              ).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Fecha de actualizacion:</strong>{" "}
              {new Date(tramite.fecha_cambio).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultaEstado;
