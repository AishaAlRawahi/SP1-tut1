// src/db.js
import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri); // modern Mongoose doesn't need old options
  console.log(" MongoDB connected");
}
