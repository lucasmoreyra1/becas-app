import DataTypes from "sequelize";
import sequelize from "../config/database.js";

const Administrador = sequelize.define(
  "Administrador",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre_usuario: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "administradores",
    timestamps: false,
  }
);

export default Administrador;
