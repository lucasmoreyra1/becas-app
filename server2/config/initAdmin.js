import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Administrador from "../models/Administrador.js";

dotenv.config();

const registerAdmin = async () => {
  const password = "admin123";
  const nombre = "admin";
  const email = "admin@email.com";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await Administrador.create({
      nombre_usuario: nombre,
      email: email,
      password: hashedPassword,
      created_at: new Date(),
    });

    console.log("Administrador registrado con éxito");
  } catch (error) {
    console.log("Error al registrar administrador: " + error.message);
  }
};

registerAdmin();
