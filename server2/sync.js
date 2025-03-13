import sequelize from "./config/database.js"; // Asegúrate de que la ruta sea correcta

// Importar los modelos (esto es necesario para registrar las relaciones en Sequelize)
import "./models/Administrador.js";
import "./models/Solicitud.js";
import "./models/archivo.js";
import "./models/SolicitudEstado.js";

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Evita borrar datos en producción
    console.log("Base de datos sincronizada correctamente.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  } finally {
    await sequelize.close();
  }
})();
