import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// Ambil URL koneksi MongoDB dari variabel lingkungan atau gunakan string kosong jika tidak ada
const MONGODB_URI = process.env.MONGODB_URI || "";

// Melakukan koneksi ke basis data MongoDB menggunakan URL yang diberikan
mongoose.connect(MONGODB_URI);

// Dapatkan koneksi basis data MongoDB
const db = mongoose.connection;

// Menampilkan pesan error jika terjadi kesalahan koneksi
db.on("error", console.error.bind(console, "Connection error:"));

// Menampilkan pesan jika berhasil terhubung ke MongoDB
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Ekspor koneksi basis data untuk digunakan di bagian lain kode
export default db;
