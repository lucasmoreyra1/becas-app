import React, { useState } from "react";
import { createTramite } from "../api/tramites.js";
import { Navigate } from "react-router-dom";

const GenerarTramite = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    colegio: "",
    deporte: "",
    categoria: "",
    club: "",
    direccion: "",
    localidad: "",
    barrio: "",
    archivo: null,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, archivo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes previos
    setErrorMessage(null);
    setValidationErrors({});

    const formDataToSend = new FormData();

    // Agregar los campos al FormData
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await createTramite(formDataToSend); // Usa formDataToSend en lugar de data
      setSuccessMessage("El trámite se envió correctamente.");
      setErrorMessage(null); // Limpiar el mensaje de error si todo está bien

      // Limpiar formulario después de enviar
      setFormData({
        dni: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        fecha_nacimiento: "",
        colegio: "",
        deporte: "",
        categoria: "",
        club: "",
        localidad: "",
        barrio: "",
        direccion: "",
        archivo: null,
      });

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
        localStorage.removeItem("documentoVerificado");
        Navigate("/"); //Todo
      }, 3000);
    } catch (error) {
      // Si ocurren errores de validación, se manejan aquí
      if (error && Array.isArray(error)) {
        // Transformar los errores en un objeto con los mensajes
        // console.log("error em arf");
        const errors = {};
        error.forEach((err) => {
          errors[err.path] = err.msg;
        });
        setValidationErrors(errors);
      } else {
        setErrorMessage("Hubo un error al crear el trámite.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        GENERAR TRAMITE PARA BECA DEPORTIVA
      </h2>

      {errorMessage && (
        <div className="mb-4 p-4 text-red-800 bg-red-100 rounded-md shadow-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          "nombre",
          "apellido",
          "dni",
          "email",
          "telefono",
          "fecha_nacimiento",
          "colegio",
          "categoria",
          "direccion",
          "barrio",
        ].map((campo) => (
          <div key={campo}>
            <label className="block text-sm font-medium text-gray-700">
              {campo.replace("_", " ").toUpperCase()}
            </label>
            <input
              type={
                campo === "fecha_nacimiento"
                  ? "date"
                  : campo === "dni" || campo === "categoria"
                  ? "number"
                  : "text"
              }
              name={campo}
              value={formData[campo]}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {validationErrors[campo] && (
              <div className="text-red-600 text-sm">
                {validationErrors[campo]}
              </div>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Localidad
          </label>
          <select
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Seleccionar...</option> {/* Opción vacía */}
            <option value="San Nicolas De Los Arroyos">
              San Nicolas De Los Arroyos
            </option>
            <option value="Campos Salles">Campos Salles</option>
            <option value="La Emilia">La Emilia</option>
            <option value="Villa Campi">Villa Campi</option>
            <option value="Otro">Otro</option>
          </select>
          {validationErrors.localidad && (
            <div className="text-red-600 text-sm">
              {validationErrors.localidad}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Club
          </label>
          <select
            name="club"
            value={formData.club}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Seleccionar...</option> {/* Opción vacía */}
            <option value="Regatas">Regatas</option>
            <option value="Somisa">Somisa</option>
            <option value="12 De Octubre">12 De Octubre</option>
            <option value="Otro">Otro</option>
          </select>
          {validationErrors.club && (
            <div className="text-red-600 text-sm">{validationErrors.club}</div>
          )}
        </div>
        {/* Selector de deporte sin valor seleccionado por defecto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deporte
          </label>
          <select
            name="deporte"
            value={formData.deporte}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Seleccionar...</option> {/* Opción vacía */}
            <option value="Futbol">Fútbol</option>
            <option value="Basquet">Básquet</option>
            <option value="Voley">Vóley</option>
            <option value="Otro">Otro</option>
          </select>
          {validationErrors.deporte && (
            <div className="text-red-600 text-sm">
              {validationErrors.deporte}
            </div>
          )}
        </div>

        {/* Campo de archivo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Adjuntar archivo
          </label>
          <input
            type="file"
            name="archivo"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {successMessage && (
          <div className="mb-4 p-4 text-green-800 bg-green-100 rounded-md shadow-sm">
            {successMessage}
          </div>
        )}

        {/* Botón de enviar */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Enviar Trámite
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerarTramite;
