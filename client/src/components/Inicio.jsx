import React from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";

const Inicio = () => {
  const navigate = useNavigate();

  const handleDownloadFicha = () => {
    window.open("src/assets/ficha_medica.pdf", "_blank");
  };

  const handleContinuar = () => {
    navigate("/generar-tramite");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="max-w-2xl w-full shadow-lg rounded-2xl p-6 bg-white">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Inscripción a becas deportivas
          </h1>
          <p className="text-gray-700 mb-4">
            Los clubes son el primer contacto que tienen los jóvenes con la
            práctica y competencia en un deporte. Para fomentar estos espacios
            se implementó el Programa de Becas Deportivas y Sociales que permite
            apoyar tanto a los clubes en sus actividades diarias como a los
            chicos que quieren practicar un deporte y no cuentan con recursos
            suficientes.
          </p>
          <p className="text-gray-700 mb-4">
            Este sistema de becas le permite a los clubes canjear sus tasas
            municipales por atención a chicos en edad escolar y de bajos
            recursos que desean desarrollar una actividad deportiva.
          </p>
          <p className="text-gray-700 mb-6">
            Ya son miles de chicos los que acceden a los diferentes clubes de la
            ciudad como socios deportivos gracias a este programa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownloadFicha}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition"
            >
              <Download size={16} />
              Descargá acá la Ficha Médica para completar
            </button>
            <button
              onClick={handleContinuar}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-white bg-blue-600 border-blue-600 hover:bg-blue-700 transition"
            >
              Continuar con el trámite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
