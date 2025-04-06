// pages/api/users.ts

import { NextResponse } from 'next/server'; 
import { connectDB } from '@/lib/db'; // Asegúrate de que la ruta sea correcta
import User from '@/app/models/user';  // Importa el modelo User

export async function GET() {
  try {
    await connectDB(); // Conectar a la base de datos
    const users = await User.find(); // Obtiene todos los usuarios
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({ error: "Error al obtener los usuarios", details: error }, { status: 500 });
  }
}
