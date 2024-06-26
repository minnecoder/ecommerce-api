import mongoose, { Schema } from "mongoose";

const sessionSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  sessionToken: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  valid: Boolean,
  userAgent: String,
  ip: String,
});

export const Session = mongoose.model("Session", sessionSchema);
