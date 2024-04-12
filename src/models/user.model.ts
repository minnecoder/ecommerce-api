import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwod: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
});

export const User = mongoose.model("User", userSchema);
