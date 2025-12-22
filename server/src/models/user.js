import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },

  password: String,
  passwordSet: { type: Boolean, default: false },

  emailVerified: { type: Boolean, default: false },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  resetToken: String,
  resetTokenExpiry: Date,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
