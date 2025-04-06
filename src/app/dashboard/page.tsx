"use client"

import { useEffect } from "react" 
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {

  BookOpen,

  Download,
  GraduationCap,

  Languages,
  LogOut,
  Menu,
  Moon,

  Sun,

} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"


export default function DashboardPage( ) {
  
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string, cursos : number , tiempo: number, certificado: number  } | null>(null)
  const [userData, setUserData] = useState<any>(null)
  useEffect(() => {
  console.log("user", localStorage.getItem("user")) 
    // Verifica si hay un usuario almacenado en localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // no necesitas adaptar si los nombres están correctos
    }


  

    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId') // O desde un context
      
      if (!userId) return

      const res = await fetch(`/api/data?userId=${userId}`)
      const data = await res.json()

      if (res.ok) {
        setUserData(data.user)
      } else {
        console.error('Error:', data.error)
      }
    }
    fetchUserData()
    
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }


  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Actualizar los datos de ejemplo para el curso unificado
  // Reemplazar la constante availableCourses con esta versión actualizada:

  // Datos de ejemplo para cursos disponibles
  const availableCourses = [
    {
      id: 1,
      title: " Los marcadores textuales",
      progress: Math.min(userData?.curso1 * 25 || 0, 100),
      nextLesson: "Elementos de cohesión textual",
      totalLessons: 4,
      completedLessons: Math.min(userData?.curso1 || 0, 4),
    },
    {
      id: 2,
      title: "Los deícticos",
      progress: Math.min(userData?.curso2 * 25 || 0, 100),
      nextLesson: "Elementos de cohesión textual",
      totalLessons: 4,
      completedLessons: Math.min(userData?.curso2 || 0, 4),
    },
    {
      id: 3,
      title: "Las relaciones fóricas",
      progress: Math.min(userData?.curso3 * 25 || 0, 100),
      nextLesson: "Elementos de cohesión textual",
      totalLessons: 4,
      completedLessons: Math.min(userData?.curso3 || 0, 4),
    },
    {
      id: 4,
      title: "Las citas bibliográficas",
      progress: Math.min(userData?.curso4 * 25 || 0, 100),
      nextLesson: "Elementos de cohesión textual",
      totalLessons: 4,
      completedLessons: Math.min(userData?.curso4 || 0, 4),
    },
    {
      id: 5,
      title: "El estilo",
      progress: Math.min(userData?.curso5 * 25 || 0, 100),
      nextLesson: "Elementos de cohesión textual",
      totalLessons: 4,
      completedLessons: Math.min(userData?.curso5 || 0, 4),
    },
    {
      id: 6,
      title: "Las figuras literarias",
      progress: Math.min(userData?.curso6 * 25 || 0, 100),
      nextLesson: "Elementos de cohesión textual",
      totalLessons: 4,
      completedLessons: Math.min(userData?.curso6 || 0, 4),
    },
  ]
  

  // Datos de ejemplo para estudiantes destacados
  

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
       
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="flex items-center gap-2">
            <div className="size-8 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Languages className="size-4 text-white" />
            </div>
            <h1 className="text-xl font-bold">EspañolPro</h1>
          </div>
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center ml-auto gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Cambiar tema</span>
            </Button>

        

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative ml-2 flex items-center gap-2 rounded-full">
                  <Avatar className="size-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
                    <AvatarFallback className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                    {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "US"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name || "Usuario"}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email || "correo@ejemplo.com"}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
               
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2" onClick={handleLogout}>
                  <LogOut className="size-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 md:p-6">
          <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
              ¡Bienvenido de nuevo, {user?.name?.split(" ")[0] || "usuario"}!
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Continúa aprendiendo donde lo dejaste.</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6 md:mb-8">
            <Card className="border-none shadow-md bg-white dark:bg-slate-950">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Cursos Disponibles</p>
                    <h3 className="text-2xl font-bold mt-1">6</h3>
                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trending-up"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                      Nuevos cursos disponibles
                    </p>
                  </div>
                  <div className="size-12 rounded-full bg-violet-100 flex items-center justify-center dark:bg-violet-900/30">
                    <BookOpen className="size-6 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white dark:bg-slate-950">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Cursos Completados</p>
                    <h3 className="text-2xl font-bold mt-1">{userData?.cursos ?? 0}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">Comienza tu primer curso</p>
                  </div>
                  <div className="size-12 rounded-full bg-violet-100 flex items-center justify-center dark:bg-violet-900/30">
                    <GraduationCap className="size-6 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white dark:bg-slate-950">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Certificados</p>
                    <h3 className="text-2xl font-bold mt-1">{userData?.certificado ?? 0}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      Completa cursos para obtener certificados
                    </p>
                  </div>
                  <div className="size-12 rounded-full bg-violet-100 flex items-center justify-center dark:bg-violet-900/30">
                    <Download className="size-6 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <hr className="my-6 border-t border-slate-200 dark:border-slate-800" />
          {/* Cursos disponibles */}
          <div className="mb-8">
           

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableCourses.map((course) => (
                <Card key={course.id} className="border-none shadow-md bg-white dark:bg-slate-950 flex flex-col">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="flex items-center p-4 gap-3">
                     
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base truncate">{course.title}</h3>

                      </div>
                    </div>

                    <div className="px-4 pb-2 flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>
                          {course.completedLessons} de {course.totalLessons} lecciones
                        </span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="p-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                      <div className="flex justify-between items-center">
                        <div className="max-w-[60%]">
                          
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => router.push(`/dashboard/cursos/${course.id}`)}
                          disabled={course.progress >= 100}
                        >
                          {course.progress >= 100 ? 'Completado' : course.progress >= 25 ? 'Continuar' : 'Comenzar'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Estudiantes destacados */}
          {/* <div>
            <h2 className="text-xl font-bold mb-4">Estudiantes Destacados</h2>
            <Card className="border-none shadow-md bg-white dark:bg-slate-950">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {topStudents.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {student.courses} cursos completados
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <span className="text-sm font-medium">{student.completionRate}%</span>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Tasa de finalización</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/30">
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div> */}
        </main>
      </div>
    </div>
  )
}

