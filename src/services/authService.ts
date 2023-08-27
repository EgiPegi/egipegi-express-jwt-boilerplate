import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import logger from "../utils/logger";
import User from "../models/User";
import RefreshToken from "../models/RefreshToken";

// Tipe data untuk hasil autentikasi yang berisi token akses dan token penyegar
interface AuthResult {
  token: string;
  refreshToken: string;
}

class AuthService {
  // Fungsi untuk mendaftarkan pengguna baru
  static async register(
    username: string,
    password: string,
    role: string
  ): Promise<void> {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role });
    logger.info("User registered:" + username);
  }

  // Fungsi untuk proses login dan menghasilkan token akses dan token penyegar
  static async login(
    username: string,
    password: string
  ): Promise<AuthResult | null> {
    const user = await User.findOne({ username });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      { username, role: user.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { username, role: user.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "7d" }
    );

    await RefreshToken.create({ userId: user._id, token: refreshToken });
    logger.info("User logged in:" + username);
    return { token, refreshToken };
  }

  // Fungsi untuk memperbarui token akses dengan menggunakan token penyegar
  static async refreshToken(refreshToken: string): Promise<AuthResult | null> {
    try {
      const decoded: any = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET || ""
      );

      const token = await RefreshToken.findOneAndDelete({
        token: refreshToken,
      });

      if (!token) {
        return null;
      }

      const user = await User.findOne({ username: decoded.username });

      if (!user) {
        return null;
      }

      const newAccessToken = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET || "",
        { expiresIn: "1h" }
      );

      const newRefreshToken = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET || "",
        { expiresIn: "7d" }
      );

      await RefreshToken.create({ userId: user._id, token: newRefreshToken });
      logger.info("Token refreshed for:" + decoded.username);
      return { token: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;
