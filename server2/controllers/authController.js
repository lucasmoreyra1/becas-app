import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Administrador from "../models/Administrador.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const admin = await Administrador.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token: token,
      id: admin.id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al iniciar sesión: " + error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { adminId } = req.admin;

    const admin = await Administrador.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.json({
      id: admin.id,
      email: admin.email,
      name: admin.nombre_usuario,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los datos del usuario: " + error.message,
    });
  }
};
