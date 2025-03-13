import React, { useState } from "react";
import { updateTramite, getArchivos } from "../api/tramites";

const Modal = ({ isOpen, onClose, tramite, onStatusChange, onComment }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async (id, nombreArchivo) => {
    try {
      const response = await getArchivos(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nombreArchivo);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el archivo", error);
    }
  };

  const handleSave = async (estado) => {
    setLoading(true);
    setError(null);

    try {
      await updateTramite(tramite.id, estado, comment);
      onStatusChange(tramite.id, estado);
      onComment(tramite.id, comment);
      onClose();
    } catch (error) {
      setError("Hubo un problema al procesar la solicitud." + error.message);
    } finally {
      setLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Detalles del Trámite</h3>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Nombre:</strong> {tramite.nombre} {tramite.apellido}
          </p>
          <p>
            <strong>Email:</strong> {tramite.email}
          </p>
          <p>
            <strong>DNI:</strong> {tramite.dni}
          </p>
          <p>
            <strong>Teléfono:</strong> {tramite.telefono}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {new Date(tramite.fecha_nacimiento).toLocaleDateString()}
          </p>
          <p>
            <strong>Colegio:</strong> {tramite.colegio}
          </p>
          <p>
            <strong>Deporte:</strong> {tramite.deporte}
          </p>
          <p>
            <strong>Categoría:</strong> {tramite.categoria}
          </p>
          <p>
            <strong>Club:</strong> {tramite.club}
          </p>
          <p>
            <strong>Dirección:</strong> {tramite.direccion}, {tramite.barrio},{" "}
            {tramite.localidad}
          </p>
          <p>
            <strong>Fecha de Solicitud:</strong>{" "}
            {new Date(tramite.fecha_solicitud).toLocaleDateString()}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            {tramite.SolicitudEstados[0]?.estado || "Pendiente"}
          </p>
        </div>

        {(tramite.Archivos?.length > 0 && (
          <button
            onClick={() =>
              handleDownload(tramite.id, tramite.Archivos[0].ruta_archivo)
            }
            className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            Descargar Archivo
          </button>
        )) || <p className="mt-4 text-gray-500">Sin archivos adjuntos</p>}

        <textarea
          className="w-full mt-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Deja un comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handleSave("Aprobado")}
            className="w-1/3 py-3 mx-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Aprobar"}
          </button>
          <button
            onClick={() => handleSave("Rechazado")}
            className="w-1/3 mx-2 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Rechazar"}
          </button>
          <button
            onClick={onClose}
            className="w-1/3 py-3 mx-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
