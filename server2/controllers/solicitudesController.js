// controllers/usersController.js
import fs from "fs";
import {
  uploadFileToFTP,
  downloadFileFromFTP,
} from "../services/ftpService.js";
import { validationResult } from "express-validator";
import Solicitud from "../models/Solicitud.js";
import Archivo from "../models/archivo.js";
import SolicitudEstado from "../models/SolicitudEstado.js";
import { sendEmail } from "../services/correoService.js";

// Función de ejemplo para manejar la obtención de usuarios
export const getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll({
      include: [{ model: Archivo }, { model: SolicitudEstado }],
      order: [["fecha_solicitud", "DESC"]], // Ordenar por fecha_solicitud de más reciente a más antigua
    });
    res.json(solicitudes);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({ error: "Error al obtener solicitudes" });
  }
};

export const getSolicitud = async (req, res) => {
  const { id } = req.params; // El ID de la solicitud se pasa como parámetro en la URL

  try {
    // Buscar la solicitud por su ID e incluir los archivos y estados asociados
    const solicitud = await Solicitud.findOne({
      where: { id },
      include: [
        { model: Archivo }, // Incluir archivos relacionados
        { model: SolicitudEstado }, // Incluir estados relacionados
      ],
    });

    if (!solicitud) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    res.json(solicitud); // Responder con la solicitud encontrada
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    res.status(500).json({ error: "Error al obtener solicitud" });
  }
};

// Otra función para crear un usuario
export const createSolicitud = async (req, res) => {
  // Validar los datos del request

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      dni,
      nombre,
      apellido,
      telefono,
      email,
      fecha_nacimiento,
      colegio,
      deporte,
      categoria,
      club,
      localidad,
      barrio,
      direccion,
    } = req.body;

    // Crear solicitud en la base de datos
    const nuevaSolicitud = await Solicitud.create({
      dni,
      nombre,
      apellido,
      telefono,
      email,
      fecha_nacimiento,
      colegio,
      deporte,
      categoria,
      club,
      localidad,
      barrio,
      direccion,
      estado: "Pendiente", // Estado inicial
    });

    // Si hay archivos, guardarlos
    let path = null;
    if (req.files && req.files.archivo) {
      const archivo = req.files.archivo; // 'archivo' es el nombre del campo del formulario

      // Mueve el archivo a una ubicación en tu servidor
      archivo.tempFilePath = "./uploads/" + archivo.name;
      await archivo.mv(archivo.tempFilePath);

      try {
        path = await guardarArchivo(archivo);
        await Archivo.create({
          id_solicitud: nuevaSolicitud.id,
          ruta_archivo: path,
        });
        console.log(`Ruta remota: ${path}`);
      } catch (err) {
        console.error("Error al guardar archivo:", err);
        return res.status(500).send("Error al guardar el archivo.");
      }
    }

    // Registrar estado inicial en la tabla SolicitudEstado
    await SolicitudEstado.create({
      id_solicitud: nuevaSolicitud.id,
      estado: "Pendiente",
      fecha_cambio: new Date(),
      comentario: "",
    });

    res.status(201).json({
      message: "Solicitud creada con éxito",
      solicitudId: nuevaSolicitud.id,
      estado: "Pendiente",
    });
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateEstadoSolicitud = async (req, res) => {
  const { id } = req.params;
  const { estado, comentario } = req.body;
  const administrador_id = req.admin.adminId;

  if (!estado) {
    return res.status(400).json({ error: "Falta el campo 'estado'" });
  }

  try {
    // Verificar si la solicitud existe
    const solicitud = await Solicitud.findOne({ where: { id } });
    if (!solicitud) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    const solicitudEstado = await SolicitudEstado.findOne({
      where: { id_solicitud: id },
    });
    if (!solicitudEstado) {
      return res
        .status(404)
        .json({ error: "Estado de solicitud no encontrado" });
    }

    // Actualizar el estado de la solicitud
    solicitudEstado.estado = estado;
    solicitudEstado.comentario = comentario;
    solicitudEstado.fecha_cambio = new Date();

    await solicitudEstado.save();
    await sendEmail(
      solicitud.email,
      "Estado de la solicitud actualizado",
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #0056b3; text-align: center;">Actualización de su Solicitud</h2>
          <p style="font-size: 16px; color: #333;">Estimado/a,</p>
          <p style="font-size: 16px; color: #333;">Le informamos que el estado de su solicitud ha sido actualizado.</p>
          <div style="background-color: #e9f5ff; padding: 10px; border-radius: 5px; margin: 15px 0;">
              <p style="font-size: 16px; margin: 5px 0;"><strong>Nuevo estado:</strong> <span style="color: #0056b3;">${estado}</span></p>
              <p style="font-size: 16px; margin: 5px 0;"><strong>Comentario:</strong> ${comentario}</p>
          </div>
          <p style="font-size: 16px; color: #333;">Si tiene alguna consulta, no dude en responder a este correo.</p>
          <p style="font-size: 16px; color: #333;">Atentamente,</p>
          <p style="font-size: 16px; font-weight: bold; color: #0056b3;">Equipo de Atención</p>
      </div>`
    );

    // Responder con éxito
    return res.status(200).json({
      message: "Estado de la solicitud actualizado exitosamente",
      solicitudEstado,
    });
  } catch (error) {
    console.error("Error en la actualización:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getSolicitudEstado = async (req, res) => {
  const { dni } = req.params; // Obtener el DNI desde los parámetros

  try {
    const solicitudEstado = await SolicitudEstado.findOne({
      include: {
        model: Solicitud,
        where: { dni }, // Filtrar por DNI en la tabla 'solicitudes'
        attributes: [
          "nombre",
          "apellido",
          "email",
          "telefono",
          "fecha_nacimiento",
          "colegio",
          "deporte",
          "categoria",
          "club",
          "direccion",
          "localidad",
          "barrio",
        ],
        // Ordenar las solicitudes por la fecha de solicitud en orden descendente
        order: [["fecha_solicitud", "DESC"]],
      },
    });

    if (!solicitudEstado) {
      return res
        .status(404)
        .json({ error: "Estado de solicitud no encontrado" });
    }

    res.json(solicitudEstado);
  } catch (error) {
    console.error("Error obteniendo estado de la solicitud:", error);
    res.status(500).json({ error: "Error obteniendo estado de la solicitud" });
  }
};

export const getArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el archivo asociado a la solicitud usando Sequelize
    const archivo = await Archivo.findOne({
      where: { id_solicitud: id },
      attributes: ["ruta_archivo"],
    });

    if (!archivo) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const remoteFilePath = archivo.ruta_archivo;
    const localFilePath = await downloadFileFromFTP(remoteFilePath);

    res.setHeader("X-Remote-FilePath", remoteFilePath);

    // Enviar el archivo al cliente
    res.download(localFilePath);
  } catch (error) {
    console.error("Error obteniendo archivo:", error);
    res
      .status(500)
      .json({ error: "Error obteniendo archivo: " + error.message });
  }
};

const guardarArchivo = async (archivo) => {
  // console.log(archivo);
  const file = archivo;
  const localFilePath = file.tempFilePath;
  const remoteFilePath = `${file.name}`;

  await uploadFileToFTP(localFilePath, remoteFilePath);
  console.log(`Archivo ${file.name} subido exitosamente.`);

  // Eliminar archivo local (opcional)
  fs.unlink(localFilePath, (err) => {
    if (err) {
      console.error(`Error al eliminar ${localFilePath}:`, err);
    } else {
      console.log(`Archivo ${localFilePath} eliminado.`);
    }
  });

  return remoteFilePath;
};
