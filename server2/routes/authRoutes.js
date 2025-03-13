import express from "express";
import { loginAdmin, getUserData } from "../controllers/authController.js";
import { authenticateAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/user", authenticateAdmin, getUserData);

export default router;
