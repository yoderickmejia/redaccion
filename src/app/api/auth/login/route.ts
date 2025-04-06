import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas no  more" },
        { status: 401 }
      );
    }

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      cursos: user.cursos,
      tiempo: user.tiempo,
      certificado: user.certificado,
      Curso1: user.Curso1,
      Curso2: user.Curso2,
      Curso3: user.Curso3
    };

    return NextResponse.json(
      {
        message: "Inicio de sesión exitoso",
        user: userResponse
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    return NextResponse.json(
      {
        error: "Error al procesar la solicitud de inicio de sesión"
      },
      { status: 500 }
    );
  }
}
