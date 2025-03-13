import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Solicitud from "./Solicitud.js"; // Importa Solicitud

const SolicitudEstado = sequelize.define(
  "SolicitudEstado",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_solicitud: {
      // Corregido el nombre de la clave foránea
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("Pendiente", "Aprobado", "Rechazado"),
      allowNull: false,
    },
    comentario: { type: DataTypes.STRING(255) },
    fecha_cambio: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "solicitud_estado",
    timestamps: false,
  }
);

Solicitud.hasMany(SolicitudEstado, { foreignKey: "id_solicitud" });
SolicitudEstado.belongsTo(Solicitud, { foreignKey: "id_solicitud" });

export default SolicitudEstado;
