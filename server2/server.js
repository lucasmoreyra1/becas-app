import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import solicitudRoutes from "./routes/solicitudRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/solicitudes", solicitudRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
