import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateAdmin = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res
      .status(403)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.admin = decoded;
    console.log(req.admin);
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const isSuperAdmin = (req, res, next) => {
  if (req.admin.role !== "SuperAdmin") {
    return res
      .status(403)
      .json({ error: "Acceso denegado. Se requiere rol de SuperAdmin." });
  }
  next();
};
