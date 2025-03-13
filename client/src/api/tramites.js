import axios from "./axios";

const getToken = () => {
  return localStorage.getItem("token") || null;
};

// Crear trámite
export const createTramite = async (formData) => {
  try {
    const response = await axios.post("solicitudes", formData);
    return response.data; // Si todo va bien, devuelve la respuesta
  } catch (error) {
    // Si la respuesta tiene errores, se extraen del objeto de error
    if (error.response && error.response.data && error.response.data.errors) {
      console.log(error.response.data.errors);
      throw error.response.data.errors; // Lanzamos los errores para que se manejen en el frontend
    }
    console.error("Error al crear el trámite", error);
    throw new Error("Error al crear el trámite"); // Error genérico
  }
};

// Obtener trámites
export const getTramites = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No se encontró el token JWT");
  }

  try {
    const response = await axios.get("solicitudes", {
      headers: {
        Token: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los trámites", error);
    throw new Error("Error al obtener los trámites");
  }
};

// Obtener trámite por ID
export const getTramite = async (id) => {
  try {
    const response = await axios.get(`solicitudes/dni/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el trámite", error);
    throw new Error("Error al obtener el trámite");
  }
};

// Actualizar trámite
export const updateTramite = async (id, estado, comentario) => {
  const token = getToken();
  if (!token) {
    throw new Error("No se encontró el token JWT");
  }

  try {
    const response = await axios.patch(
      `solicitudes/${id}`,
      { estado, comentario },
      {
        headers: {
          Token: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el trámite", error);
    throw new Error("Error al actualizar el trámite");
  }
};

export const getArchivos = async (id) => {
  try {
    const response = await axios.get(`solicitudes/archivo/${id}`, {
      responseType: "blob", // Recibir la imagen como un blob
    });
    return response;
  } catch (error) {
    console.error("Error al obtener los archivos", error);
    throw new Error("Error al obtener los archivos");
  }
};
