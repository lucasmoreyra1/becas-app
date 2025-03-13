import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Solicitud from "./Solicitud.js";

const Archivo = sequelize.define(
  "Archivo",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_solicitud: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Solicitud, key: "id" },
    },
    ruta_archivo: { type: DataTypes.STRING(255), allowNull: false },
  },
  {
    tableName: "archivos",
    timestamps: false,
  }
);

Solicitud.hasMany(Archivo, { foreignKey: "id_solicitud" });
Archivo.belongsTo(Solicitud, { foreignKey: "id_solicitud" });

export default Archivo;
