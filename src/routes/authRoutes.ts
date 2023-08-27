import * as express from "express";
import AuthController from "../controllers/authController";

const router = express.Router();

// Rute untuk mendaftarkan pengguna baru
router.post("/register", AuthController.register);

// Rute untuk proses login
router.post("/login", AuthController.login);

// Rute untuk memperbarui token akses dengan refresh token
router.post("/refresh", AuthController.refreshToken);

export default router;
