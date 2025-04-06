import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from "@/app/models/user"



// Nueva función para actualizar cursos
export async function PUT(req: Request) {
  try {
    await connectDB()
    
    const { userId, courseNumber, courseData } = await req.json()
    
    // Validar que se hayan recibido los campos necesarios y que courseData sea un array
    if (!userId || !courseNumber || !courseData ) {
      return NextResponse.json(
        { error: "Faltan campos requeridos o el formato de datos es incorrecto" },
        { status: 400 }
      )
    }
    
    // Validar que courseNumber esté entre 1 y 7
    if (courseNumber < 1 || courseNumber > 7) {
      return NextResponse.json(
        { error: "Número de curso inválido (debe ser entre 1 y 7)" },
        { status: 400 }
      )
    }
    
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }
    
    // Construir el nombre del campo dinámicamente, por ejemplo "curso1", "curso2", etc.
    const courseField = `curso${courseNumber}`
    
    // Actualizar el array del curso con los nuevos datos (por ejemplo, IDs de lecciones)
    user[courseField] = courseData
    
    await user.save()
    
    return NextResponse.json(
      { 
        message: `Curso ${courseNumber} actualizado correctamente`, 
        updatedCourse: user[courseField]
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error("Error al actualizar curso:", error)
    return NextResponse.json(
      { error: "Error al actualizar curso", details: error },
      { status: 500 }
    )
  }
}




export async function POST(req: Request) {
  try {
    await connectDB()

    const { userId, courseNumber } = await req.json()

    if (!userId || !courseNumber) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos (userId y courseNumber)" },
        { status: 400 }
      )
    }

    if (courseNumber < 1 || courseNumber > 7) {
      return NextResponse.json(
        { error: "Número de curso inválido (debe ser entre 1 y 7)" },
        { status: 400 }
      )
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const courseField = `curso${courseNumber}`
    const courseData = user[courseField]

    return NextResponse.json({ 
      courseData 
    }, { status: 200 })

  } catch (error) {
    console.error("Error al obtener curso:", error)
    return NextResponse.json(
      { error: "Error interno al obtener curso", details: error },
      { status: 500 }
    )
  }
}
