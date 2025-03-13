import DataTypes from "sequelize";
import sequelize from "../config/database.js";

const Solicitud = sequelize.define(
  "Solicitud",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(255), allowNull: false },
    apellido: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false },
    dni: { type: DataTypes.STRING(20), allowNull: false },
    telefono: { type: DataTypes.STRING(20), allowNull: false },
    fecha_nacimiento: { type: DataTypes.DATE, allowNull: false },
    colegio: { type: DataTypes.STRING(100), allowNull: false },
    deporte: {
      type: DataTypes.ENUM("Futbol", "Basquet", "Voley", "Otro"),
      allowNull: false,
    },
    categoria: { type: DataTypes.INTEGER, allowNull: false },
    club: {
      type: DataTypes.ENUM("Regatas", "Somisa", "12 De Octubre", "Otro"),
      allowNull: false,
    },
    direccion: { type: DataTypes.STRING(255), allowNull: false },
    localidad: { type: DataTypes.STRING(255), allowNull: false },
    barrio: { type: DataTypes.STRING(255), allowNull: false },
    fecha_solicitud: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Establece el valor por defecto a la fecha y hora actual
    },
  },
  {
    tableName: "solicitudes",
    timestamps: false,
  }
);

export default Solicitud;
