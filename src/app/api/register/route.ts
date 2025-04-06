import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // Asegúrate de que la ruta sea correcta
import User from "@/app/models/user";
import bcrypt from "bcryptjs"; // Asegúrate de instalar esta librería: npm install bcrypt

// pages/api/users.ts


export async function GET() {
  try {
    await connectDB(); // Conectar a la base de datos
    const users = await User.find(); // Obtiene todos los usuarios
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({ error: "Error al obtener los usuarios", details: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      cursos: 0,
      certificado: 0,
      curso1: 0,
      curso2: 0,
      curso3: 0,
      curso4: 0,
      curso5: 0,
      curso6: 0,
      curso7: 0,
    })

    await newUser.save()

    return NextResponse.json({ message: "Usuario creado correctamente", user: newUser }, { status: 201 })
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return NextResponse.json({ error: "Error al crear usuario", details: error }, { status: 500 })
  }
}
