// lib/mongoose.ts

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Falta la URI de conexión a MongoDB");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ Conectado a MongoDB");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
