import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/app/models/user'

export async function GET(req: Request) {
  try {
    await connectDB()

    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: "Falta el parámetro 'userId'" },
        { status: 400 }
      )
    }

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { user },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error al obtener usuario:", error)
    return NextResponse.json(
      { error: "Error interno al obtener usuario", details: error },
      { status: 500 }
    )
  }
}



export async function PUT(req: Request) {
  try {
    await connectDB()

    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { error: "Falta el campo requerido 'userId'" },
        { status: 400 }
      )
    }

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
      )
    }

    // Incrementa los valores de certificados y cursosRealizados en el usuario
    user.certificado += 1
    user.cursos += 1

    // Guarda los cambios en la base de datos
    await user.save()

    return NextResponse.json(
      {
        message: "Usuario actualizado correctamente (incrementado)",
        user: {
          certificados: user.certificado,
          cursos: user.cursos,
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    return NextResponse.json(
      { error: "Error interno al actualizar usuario", details: error },
      { status: 500 }
    )
  }
}
