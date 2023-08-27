import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import db from "./configs/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Mengizinkan permintaan dari berbagai domain dengan CORS
app.use(cors());

// Menggunakan middleware untuk menguraikan body JSON dari permintaan
app.use(express.json());

// Mengarahkan rute autentikasi ke modul authRoutes
app.use("/auth", authRoutes);

// Mengarahkan rute yang memerlukan otorisasi ke modul protectedRoutes
app.use("/protected", protectedRoutes);

// Menjalankan fungsi ketika koneksi ke basis data berhasil
db.once("open", () => {
  // Menjalankan server Express di port yang ditentukan
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
