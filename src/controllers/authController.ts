import { Request, Response } from "express";
import AuthService from "../services/authService";
import logger from "../utils/logger";

class AuthController {
  // Menghandle proses registrasi pengguna baru
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, role } = req.body;
      await AuthService.register(username, password, role);
      logger.info("User registered:" + username);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      logger.error("Registration error:" + error.message);
      res.status(400).json({ error: error.message }); // Mengirim pesan error yang lebih deskriptif
    }
  }

  // Menghandle proses login
  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const authResult = await AuthService.login(username, password);

    if (!authResult) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    logger.info("User logged in:" + username);
    res.json(authResult);
  }

  // Menghandle proses refresh token
  static async refreshToken(req: Request, res: Response): Promise<void> {
    // const refreshToken = req.cookies.refreshToken;
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token missing" });
      return;
    }

    try {
      const authResult = await AuthService.refreshToken(refreshToken);
      if (!authResult) {
        res.status(403).json({ message: "Invalid refresh token" });
        return;
      }
      res.json(authResult);
    } catch (error) {
      logger.info("Token refreshed error:" + error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
