import mongoose, { Schema, Document } from "mongoose";

export interface RefreshTokenDocument extends Document {
  userId: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const RefreshTokenSchema: Schema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 }, // 7 days
  updatedAt: { type: Date, default: Date.now },
});

const RefreshToken = mongoose.model<RefreshTokenDocument>(
  "RefreshToken",
  RefreshTokenSchema
);

export default RefreshToken;
