import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      // Tidak ada token yang disertakan dalam header
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
      const userRole = (decoded as { role: string }).role;

      if (!roles.includes(userRole)) {
        // Peran pengguna tidak memiliki izin untuk mengakses
        return res.status(403).json({ message: "Forbidden" });
      }

      // Pengguna memiliki peran yang diizinkan
      next();
    } catch (error) {
      // Token tidak valid atau kadaluarsa
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default authorize;
