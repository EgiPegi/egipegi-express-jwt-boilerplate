import mongoose from "mongoose";

// Definisikan struktur data untuk setiap dokumen Pengguna
interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  role: string;
}

// Skema Mongoose yang mendefinisikan struktur dan validasi data Pengguna
const userSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true, unique: true }, // Nama pengguna harus unik dan wajib diisi
  password: { type: String, required: true }, // Kata sandi wajib diisi
  role: { type: String, required: true }, // Peran pengguna wajib diisi
});

// Model Mongoose berdasarkan skema di atas
const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
