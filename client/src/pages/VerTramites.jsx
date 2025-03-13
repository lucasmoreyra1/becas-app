import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MessageCircle } from "lucide-react";
import { getTramites } from "../api/tramites";
import Modal from "../components/Modal"; // Asegúrate de que Modal esté exportado y correctamente implementado

const VerTramites = () => {
  const [tramites, setTramites] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTramite, setSelectedTramite] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTramites = async () => {
      const data = await getTramites();
      console.log(data);
      setTramites(data);
      data.forEach((element) => {
        console.log(element.SolicitudEstados[0].estado);
      });
    };
    fetchTramites();
  }, []);

  const handleStatusChange = (id, status) => {
    setTramites((prevTramites) =>
      prevTramites.map((tramite) =>
        tramite.id === id
          ? {
              ...tramite,
              SolicitudEstados: tramite.SolicitudEstados.length
                ? [{ ...tramite.SolicitudEstados[0], estado: status }]
                : [{ estado: status }],
            }
          : tramite
      )
    );
  };

  const handleComment = (id, comentario) => {
    console.log("Agregando comentario:", id, comentario);
  };

  const openModal = (tramite) => {
    setSelectedTramite(tramite);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTramite(null);
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre + " " + row.apellido,
      sortable: true,
    },
    {
      name: "Detalles",
      selector: (row) => `${row.colegio} - ${row.deporte} - ${row.categoria}`,
      sortable: true,
    },
    {
      name: "Fecha de Envio",
      selector: (row) => new Date(row.fecha_solicitud).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => {
        const estado =
          row.SolicitudEstados && row.SolicitudEstados.length > 0
            ? row.SolicitudEstados[0].estado
            : "Estado no disponible";

        const estadoClase =
          estado === "Aprobado"
            ? "bg-green-200 text-green-800"
            : estado === "Rechazado"
            ? "bg-red-200 text-red-800"
            : "bg-gray-200 text-gray-800";

        return (
          <span
            className={`px-4 py-2 font-semibold text-lg rounded-full ${estadoClase}`}
          >
            {estado}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => {
        const estado =
          row.SolicitudEstados && row.SolicitudEstados.length > 0
            ? row.SolicitudEstados[0].estado
            : "";

        return estado === "Aprobado" || estado === "Rechazado" ? null : (
          <button
            onClick={() => openModal(row)}
            className="inline-flex items-center p-2 border border-transparent rounded-full text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title="Ver Detalles"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        );
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Lista de Trámites
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <DataTable
          columns={columns}
          data={tramites.filter((tramite) =>
            `${tramite.nombre} ${tramite.apellido}`
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )}
          pagination
          responsive
          noDataComponent={<div>No hay trámites para revisar</div>}
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Buscar trámites..."
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          }
        />
      </div>

      {/* Mostrar el Modal cuando esté abierto */}
      {selectedTramite && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          tramite={selectedTramite}
          onStatusChange={handleStatusChange}
          onComment={handleComment}
        />
      )}
    </div>
  );
};

export default VerTramites;
