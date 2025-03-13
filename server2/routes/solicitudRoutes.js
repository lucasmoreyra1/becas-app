// routes/usersRoutes.js
import express from "express";
import { authenticateAdmin } from "../middlewares/authMiddleware.js";
import { validateSolicitud } from "../middlewares/validateSolicitud.js";
import {
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateEstadoSolicitud,
  getSolicitudEstado,
  getArchivo,
} from "../controllers/solicitudesController.js";

const router = express.Router();

// Definir rutas
router.get("/", authenticateAdmin, getSolicitudes); // todo: agregar la autenticacions
router.get("/:id", authenticateAdmin, getSolicitud); // Ruta para ver un Solicitud
router.get("/dni/:dni", getSolicitudEstado); // Ruta para ver estado de Solicitud solicitante
router.post("/", validateSolicitud, createSolicitud); // Ruta para crear un Solicitud
router.patch("/:id", authenticateAdmin, updateEstadoSolicitud); // Ruta para actualizar un Solicitud
router.get("/archivo/:id", getArchivo); // Ruta para obtener un archivo

export default router;
