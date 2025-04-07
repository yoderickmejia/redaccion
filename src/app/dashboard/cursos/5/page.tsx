"use client"
import React, { useState }  from "react"
import dynamic from "next/dynamic";
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ChevronLeft,
  Clock,
  FileText,
  LogOut,
  Menu,
  Moon,
  Play,
  Sun,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import VideoPlayer from "../video"

import jsPDF from "jspdf"

// Constante que mapea el id de la lección a su URL de video
const Videos: { [key: number]: { videoURL: string } } = {
  101: { videoURL: "/videos/video1.mp4" },
  102: { videoURL: "/videos/video2.mp4" },
  103: { videoURL: "/videos/video3.mp4" },
  // Para la lección 104 (quiz) no se necesita URL de video
}

// Datos del curso 1
const courseData = {
  id: 1,
  title: "Estilo Directo e Indirecto",
  description: "Aprende sobre el uso del estilo directo e indirecto en los textos, especialmente en libros de español.",
  level: "Intermedio",
  totalLessons: 4,
  completedLessons: 0,
  progress: 0,
  duration: "30 minutos",
  lastAccessed: "",
  rating: 4.9,
  reviews: 840,

  lessons: [
    {
      id: 101,
      title: "El Estilo Directo",
      isCompleted: false,
      type: "video",
      VideoURL: "/videos/video1.mp4",
      content: "<p>Contenido de la lección sobre el estilo directo, cómo se utiliza y su importancia en los textos literarios.</p>"
    },
    {
      id: 102,
      title: "El Estilo Indirecto",
      isCompleted: false,
      type: "video",
      VideoURL: "/videos/video2.mp4",
      content: "<p>Contenido sobre el estilo indirecto, sus características y diferencias con el estilo directo.</p>"
    },
    {
      id: 103,
      title: "Estilo Directo vs. Estilo Indirecto",
      isCompleted: false,
      type: "video",
      VideoURL: "/videos/video.mp4",
      content: "<p>Contenido comparativo entre el estilo directo e indirecto, sus usos y cuándo emplearlos correctamente.</p>"
    },

    {
      id: 104,
      title: "Evaluación: Directo vs Indirecto",
      isCompleted: false,
      type: "quiz",
      questions: [
        {
          id: 1,
          question: "¿Qué caracteriza al estilo directo?",
          options: [
            "Se refiere a lo que una persona dice exactamente, sin alteraciones.",
            "Se utiliza para parafrasear lo dicho por otra persona.",
            "Requiere la modificación del discurso original.",
            "Es exclusivo del lenguaje formal."
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "¿Qué diferencia al estilo indirecto del directo?",
          options: [
            "El estilo indirecto cita palabras exactas del hablante.",
            "El estilo indirecto parafrasea lo dicho por una persona.",
            "El estilo indirecto utiliza comillas.",
            "El estilo indirecto es más corto y conciso."
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "¿Cuál de los siguientes ejemplos corresponde al estilo directo?",
          options: [
            "\"Voy a la tienda\", dijo Juan.",
            "Juan mencionó que iba a la tienda.",
            "Según Juan, él va a la tienda.",
            "Juan dijo que va a la tienda."
          ],
          correctAnswer: 0
        },
        {
          id: 4,
          question: "¿Cuál de estos es un ejemplo de estilo indirecto?",
          options: [
            "\"No quiero ir al cine\", expresó Marta.",
            "Marta mencionó que no quería ir al cine.",
            "Marta dijo que no quería ir al cine.",
            "Marta exclamó: 'No quiero ir al cine'."
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "¿Qué sucede en la transformación del estilo directo al indirecto?",
          options: [
            "Las palabras exactas se mantienen igual.",
            "Se eliminan los verbos de decir y se usan otros.",
            "El orden de las palabras se mantiene igual.",
            "El discurso no cambia de forma."
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          question: "¿Qué tipo de verbo es común en el estilo indirecto?",
          options: [
            "Verbo en presente de indicativo.",
            "Verbo en futuro de indicativo.",
            "Verbo en modo subjuntivo.",
            "Verbo en forma de 'decir' o 'comentar'."
          ],
          correctAnswer: 3
        },
        {
          id: 7,
          question: "¿Cómo cambia la puntuación en el estilo indirecto?",
          options: [
            "Se usan comillas.",
            "No se usa comillas, solo se cambia el orden del discurso.",
            "Se colocan dos puntos.",
            "La puntuación no cambia."
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          question: "¿Cuál de los siguientes ejemplos usa correctamente el estilo indirecto?",
          options: [
            "Carlos preguntó, \"¿Vendrás mañana?\"",
            "Carlos preguntó si vendrías mañana.",
            "Carlos dijo: '¿Vendrás mañana?'",
            "Carlos preguntó, '¿Vendrás mañana?'"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          question: "¿En qué tipo de textos es más común el uso del estilo indirecto?",
          options: [
            "En textos narrativos y literarios.",
            "En las noticias y artículos de opinión.",
            "En textos científicos y académicos.",
            "En textos informales como mensajes de texto."
          ],
          correctAnswer: 2
        },
        {
          id: 10,
          question: "¿Qué tipo de cambio de tiempo verbal es necesario en el estilo indirecto?",
          options: [
            "De presente a pasado.",
            "De futuro a presente.",
            "De futuro a pasado.",
            "No es necesario cambiar el tiempo verbal."
          ],
          correctAnswer: 0
        },
        {
          id: 11,
          question: "¿Qué marcador se usa comúnmente para introducir una cita en estilo indirecto?",
          options: [
            "Comillas.",
            "Dos puntos.",
            "Coma.",
            "Paréntesis."
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          question: "¿Cuál es la principal diferencia en el uso de comillas entre el estilo directo e indirecto?",
          options: [
            "Las comillas se usan solo en el estilo directo.",
            "Las comillas se usan solo en el estilo indirecto.",
            "Las comillas se usan en ambos estilos, pero en el indirecto siempre se usan al principio.",
            "Las comillas son opcionales en ambos estilos."
          ],
          correctAnswer: 0
        },
        {
          id: 13,
          question: "¿Qué ocurre con los pronombres al cambiar del estilo directo al indirecto?",
          options: [
            "No cambian.",
            "Se cambian según la perspectiva del narrador.",
            "Se añaden los pronombres en el indirecto.",
            "Se eliminan los pronombres."
          ],
          correctAnswer: 1
        },
        {
          id: 14,
          question: "¿Cuál de las siguientes es una característica del estilo indirecto?",
          options: [
            "El narrador dice lo que otra persona ha dicho exactamente.",
            "Se presentan los pensamientos o palabras de otra persona de forma resumida o modificada.",
            "Utiliza signos de exclamación y comillas.",
            "Se mantiene el tono emocional y directo de las palabras originales."
          ],
          correctAnswer: 1
        },
        {
          id: 15,
          question: "¿Qué palabra se utiliza comúnmente para introducir una cita indirecta?",
          options: [
            "Dijo",
            "Comentó",
            "Mencionó",
            "Exclamó"
          ],
          correctAnswer: 2
        }
      ],
    },
  ],
}

function CourseDetailPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [counter, setCounterOriginal] = useState(0)
  
  const currentLesson = courseData.lessons[currentLessonIndex]

  // Calcula el progreso del curso
  const calculateProgress = () => {
    if (courseData.lessons.length === 0) return 0
    return Math.round(counter*25)
  }

  

  const courseProgress = calculateProgress()

  const handleLessonChange = (index: number) => {
    setCurrentLessonIndex(index)
    setVideoProgress(0)
    setIsPlaying(false)
    setQuizAnswers({})
    setQuizSubmitted(false)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
  }

  const name = localStorage.getItem("username") || "Usuario"

  // In the handleCompleteLesson function, update the PUT request:
  const handleCompleteLesson = async () => {
    // Create a separate variable for the PUT request
    const updatedProgress = counter + 1;

    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
      const userid = localStorage.getItem("userId");
    
      try {
        const response = await fetch("/api/completeLesson", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userid,
            courseNumber: 1,
            courseData: updatedProgress, // Use the updated progress variable
          }),
        });

        if (!response.ok) {
          console.error("Error al enviar datos de la lección completada", response.statusText);
        } else {
          console.log("Lección completada enviada correctamente");
          // Only update the counter after successful API call
          setCounterOriginal(updatedProgress);
        }
      } catch (error) {
        console.error("Error en el PUT de la lección completada", error);
      }
    }
    
    // If exists a next lesson, change to it
    if (currentLessonIndex < courseData.lessons.length - 1) {
      handleLessonChange(currentLessonIndex + 1);
    }
  }

  // In useEffect, use a separate variable for the POST request response:
  useEffect(() => {
    const fetchCourseData = async () => {
      const userId = localStorage.getItem("userId");
      const courseNumber = 1;
      
      if (!userId) {
        console.error("No se encontró userId en localStorage");
        return;
      }

      try {
        const response = await fetch("/api/completeLesson", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            courseNumber
          })
        });

        if (!response.ok) {
          console.error("Error al obtener curso:", await response.text());
          return;
        }

        const data = await response.json();
        // Use a clear variable name for the received data
        const currentProgress = data.courseData || 0;
        
        // Set the counter with the fetched progress
        setCounterOriginal(currentProgress);
        console.log("Progreso actual recibido:", currentProgress);
        
      } catch (error) {
        console.error("Error al hacer fetch del curso:", error);
      }
    }
    
    fetchCourseData();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Maneja las respuestas del quiz
  const handleQuizAnswer = (questionId: number, optionIndex: number) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: optionIndex
    });
  }
  
  // Maneja el envío del quiz
  const handleSubmitQuiz = () => {
    const questions = courseData.lessons[currentLessonIndex]?.questions || [];
    let correctAnswers = 0;
  
    // Contar respuestas correctas
    questions.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
  
    // Calcular puntuación
    const score = Math.round((correctAnswers / questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
  
    const passed = score >= 60;
  
    // Marcar lección completada si aprueba
    if (passed && !completedLessons.includes(currentLesson.id)) {
      handleCompleteLesson();
      incrementarEstadisticas();
    }
  };

  // Función para generar el certificado PDF3
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    
    // Definir colores
    // const primaryColor = [76, 29, 149]; // Violeta oscuro
    // const secondaryColor = [124, 58, 237]; // Violeta medio
    // const accentColor = [221, 214, 254]; // Violeta claro

    // Fondo
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, "F");

    // Borde decorativo exterior
    doc.setDrawColor(76, 29, 149);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Borde decorativo interior
    doc.setDrawColor(124, 58, 237);
    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);

    // Encabezado
    doc.setFillColor(221, 214, 254);
    doc.rect(15, 15, 267, 40, "F");

    // Logo y nombre de la institución
    doc.setFontSize(32);
    doc.setTextColor(76, 29, 149);
    doc.setFont("helvetica", "bold");
    doc.text("EspañolPro", 148.5, 35, { align: "center" });

    // Subtítulo de la institución
    doc.setFontSize(14);
    doc.setTextColor(124, 58, 237);
    doc.setFont("helvetica", "italic");
    doc.text("Centro de Excelencia en Enseñanza del Español", 148.5, 45, { align: "center" });

    // Título del certificado
    doc.setFontSize(26);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICADO DE FINALIZACIÓN", 148.5, 70, { align: "center" });

    // Línea decorativa
    doc.setDrawColor(124, 58, 237);
    doc.setLineWidth(0.5);
    doc.line(74, 75, 223, 75);

    // Texto de reconocimiento
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Este certificado acredita que:", 148.5, 85, { align: "center" });

    // Nombre del estudiante
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(76, 29, 149);
    doc.text(name, 148.5, 100, { align: "center" });

    // Descripción del logro
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("ha completado satisfactoriamente el curso:", 148.5, 110, { align: "center" });

    // Nombre del curso
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(courseData.title, 148.5, 120, { align: "center" });

    // Detalles adicionales
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`con una calificación de ${quizScore}%`, 148.5, 130, { align: "center" });

    // Fecha
    const fechaActual = new Date().toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    doc.text(`Expedido el ${fechaActual}`, 148.5, 140, { align: "center" });

    // Firmas
    doc.setDrawColor(0, 0, 0);
    doc.line(80, 165, 130, 165); // Línea para firma 1
    doc.line(170, 165, 220, 165); // Línea para firma 2

    doc.setFontSize(10);
    doc.text("Director Académico", 105, 170, { align: "center" });
    doc.text("Coordinador de Cursos", 195, 170, { align: "center" });

    // Sello (círculo)
    doc.setDrawColor(76, 29, 149);
    doc.setLineWidth(0.5);
    doc.circle(148.5, 155, 15);

    // Texto dentro del sello
    doc.setFontSize(8);
    doc.setTextColor(76, 29, 149);
    doc.text("CERTIFICADO", 148.5, 153, { align: "center" });
    doc.text("OFICIAL", 148.5, 158, { align: "center" });

    // Número de certificado
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Certificado No: ESP-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}-${new Date().getFullYear()}`,
      148.5,
      185,
      { align: "center" }
    );

    // Código QR (simulado con un cuadrado)
    doc.setFillColor(240, 240, 240);
    doc.rect(250, 160, 20, 20, "F");
    doc.setDrawColor(0, 0, 0);
    doc.rect(250, 160, 20, 20);

    // Save the PDF
    doc.save(`Certificado_EspañolPro_${courseData.title.replace(/\s+/g, "_")}.pdf`);
  };

  // Encuentra la siguiente lección disponible
  const findNextLesson = () => {
    if (currentLessonIndex < courseData.lessons.length - 1) {
      return {
        lessonIndex: currentLessonIndex + 1
      };
    }
    return null;
  }

  const incrementarEstadisticas = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch("/api/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log("Actualizado correctamente:", data.user);
      } else {
        console.error("Error al actualizar:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
 


  // Obtiene la URL del video desde la constante Videos usando el id de la lección
  const videoURL =
    currentLesson.type === "video" && Videos[currentLesson.id]
      ? Videos[currentLesson.id].videoURL
      : "";

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold truncate max-w-[300px] lg:max-w-[500px]">{courseData.title}</h1>
          </div>
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Cambiar tema</span>
          </Button>
         
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
                  <AvatarFallback className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">{name}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
         
              <DropdownMenuSeparator />
          
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2" onClick={() => router.push("/")}>
                <LogOut className="size-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-80" : "w-0"
          } border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all duration-300 overflow-hidden flex-shrink-0 hidden md:block`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            
            
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {completedLessons.length} de {courseData.lessons.length} lecciones completadas
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {courseData.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  className={`flex items-center w-full p-4 text-left border-b border-slate-100 dark:border-slate-800 ${
                    currentLessonIndex === index
                      ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                      : "hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                  
                >
                  <div className="flex-1 flex items-center gap-2">
                    {lesson.type === "video" && <Play className="h-4 w-4" />}
                    {lesson.type === "quiz" && <FileText className="h-4 w-4" />}
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                  {(completedLessons.includes(lesson.id) || index < counter) && 
  <Check className="h-4 w-4 text-green-500" />}

    
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-80 z-40 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all duration-300 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">Contenido del curso</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
         
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {completedLessons.length} de {courseData.lessons.length} lecciones completadas
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {courseData.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  className={`flex items-center w-full p-4 text-left border-b border-slate-100 dark:border-slate-800 ${
                    currentLessonIndex === index
                      ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                      : "hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                  onClick={() => {
                    handleLessonChange(index)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <div className="flex-1 flex items-center gap-2">
                    {lesson.type === "video" && <Play className="h-4 w-4" />}
                    {lesson.type === "quiz" && <FileText className="h-4 w-4" />}
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {completedLessons.includes(lesson.id) && <Check className="h-4 w-4 text-green-500" />}
                  
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content - Video and lesson details */}
        <div className="flex-1 overflow-y-auto">
          {/* Toggle sidebar button (visible on larger screens) */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-r-full rounded-l-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>

          <div className="p-4 md:p-6">
            {currentLesson.type === "video" && (
              <>
                {/* Video player */}
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
                  {/* Integrando el VideoPlayer con la URL obtenida de la constante Videos */}
                  <VideoPlayer key={videoURL} videoURL={videoURL} />
                </div>

                {/* Lesson info */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                 
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                     
                    </div>
                    {currentLessonIndex < courseData.lessons.length - 1 && (
                      <Button className="gap-2 bg-violet-600 hover:bg-violet-700" onClick={handleCompleteLesson}>
                        Siguiente lección
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {/* Contenido de la lección */}
                  <div
                    className="prose prose-slate dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html : currentLesson.content || "" }}
                  />
                </div>
              </>
            )}
            
            {currentLesson.type === "quiz" && (
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    Completa esta evaluación para poner a prueba tus conocimientos sobre marcadores textuales.
                  </p>
                </div>

                {!quizSubmitted ? (
                  <>
                    <div className="space-y-6 mb-6">
                      {(currentLesson.questions || []).map((question, qIndex) => (
                        <Card key={question.id} className="border-slate-200 dark:border-slate-800">
                          <CardHeader>
                            <CardTitle className="text-lg font-medium">
                              {qIndex + 1}. {question.question}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              value={quizAnswers[question.id]?.toString()}
                              onValueChange={(value: string) => handleQuizAnswer(question.id, Number.parseInt(value))}
                            >
                              {question.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center space-x-2 mb-2">
                                  <RadioGroupItem value={oIndex.toString()} id={`q${question.id}-o${oIndex}`} />
                                  <Label htmlFor={`q${question.id}-o${oIndex}`}>{option}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-violet-600 hover:bg-violet-700"
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(quizAnswers).length !== (currentLesson.questions?.length || 0)}
                    >
                      Enviar respuestas
                    </Button>
                  </>
                ) : (
                  <div className="space-y-6">
                    <Alert
                      className={
                        quizScore >= 60
                          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                      }
                    >
                      <AlertTitle
                        className={
                          quizScore >= 60 ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"
                        }
                      >
                        {quizScore >= 60 ? "¡Felicidades!" : "Necesitas repasar"}
                      </AlertTitle>
                      <AlertDescription
                        className={
                          quizScore >= 60 ? "text-green-700 dark:text-green-200" : "text-red-700 dark:text-red-200"
                        }
                      >
                        {quizScore >= 60
                          ? `Has obtenido ${quizScore}% de respuestas correctas. ¡Has completado esta lección!`
                          : `Has obtenido ${quizScore}% de respuestas correctas. Necesitas al menos 60% para completar la lección.`}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                      {(currentLesson.questions || []).map((question, qIndex) => {
                        const isCorrect = quizAnswers[question.id] === question.correctAnswer
                        return (
                          <Card
                            key={question.id}
                            className={`border-2 ${isCorrect ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"}`}
                          >
                            <CardHeader>
                              <CardTitle className="text-lg font-medium flex items-center gap-2">
                                {qIndex + 1}. {question.question}
                                {isCorrect ? (
                                  <Check className="h-5 w-5 text-green-500" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {question.options.map((option, oIndex) => (
                                  <div
                                    key={oIndex}
                                    className={`p-2 rounded-md ${
                                      oIndex === question.correctAnswer
                                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                        : quizAnswers[question.id] === oIndex
                                          ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                          : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                                    }`}
                                  >
                                    {option}
                                    {oIndex === question.correctAnswer && (
                                      <span className="ml-2 text-green-600 dark:text-green-400 text-sm">
                                        (Respuesta correcta)
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setQuizAnswers({})
                          setQuizSubmitted(false)
                        }}
                      >
                        Intentar de nuevo
                      </Button>

                      {quizScore >= 60 && (
                                             <Button
                                               className="gap-2 bg-green-600 hover:bg-green-700"
                                               onClick={() => {
                                                 // Generate PDF certificate
                                                 const generatePDF = () => {
                                                   const doc = new jsPDF({
                                                     orientation: "landscape",
                                                     unit: "mm",
                                                     format: "a4",
                                                   })
                                                   
                                                   // Definir colores
                                                   const primaryColor = [76, 29, 149] // Violeta oscuro
                                                   const secondaryColor = [124, 58, 237] // Violeta medio
                                                   const accentColor = [221, 214, 254] // Violeta claro
                     
                                                   // Fondo
                                                   doc.setFillColor(255, 255, 255)
                                                   doc.rect(0, 0, 297, 210, "F")
                     
                                                   // Borde decorativo exterior
                                                   doc.setDrawColor( 76, 29, 149)
                                                   doc.setLineWidth(2)
                                                   doc.rect(10, 10, 277, 190)
                     
                                                   // Borde decorativo interior
                                                   doc.setDrawColor(124, 58, 237)
                                                   doc.setLineWidth(1)
                                                   doc.rect(15, 15, 267, 180)
                     
                                                   // Encabezado
                                                   doc.setFillColor(221, 214, 254)
                                                   doc.rect(15, 15, 267, 40, "F")
                     
                                                   // Logo y nombre de la institución
                                                   doc.setFontSize(32)
                                                   doc.setTextColor(76, 29, 149)
                                                   doc.setFont("helvetica", "bold")
                                                   doc.text("EspañolPro", 148.5, 35, { align: "center" })
                     
                                                   // Subtítulo de la institución
                                                   doc.setFontSize(14)
                                                   doc.setTextColor(124, 58, 237)
                                                   doc.setFont("helvetica", "italic")
                                                   doc.text("Centro de Excelencia en Enseñanza del Español", 148.5, 45, { align: "center" })
                     
                                                   // Título del certificado
                                                   doc.setFontSize(26)
                                                   doc.setTextColor(0, 0, 0)
                                                   doc.setFont("helvetica", "bold")
                                                   doc.text("CERTIFICADO DE FINALIZACIÓN", 148.5, 70, { align: "center" })
                     
                                                   // Línea decorativa
                                                   doc.setDrawColor(124, 58, 237)
                                                   doc.setLineWidth(0.5)
                                                   doc.line(74, 75, 223, 75)
                     
                                                   // Texto de reconocimiento
                                                   doc.setFontSize(12)
                                                   doc.setFont("helvetica", "normal")
                                                   doc.text("Este certificado acredita que:", 148.5, 85, { align: "center" })
                     
                                                   // Nombre del estudiante
                                                   doc.setFontSize(24)
                                                   doc.setFont("helvetica", "bold")
                                                   doc.setTextColor(76, 29, 149)
                                                   doc.text(name, 148.5, 100, { align: "center" })
                     
                                                   // Descripción del logro
                                                   doc.setFontSize(12)
                                                   doc.setFont("helvetica", "normal")
                                                   doc.setTextColor(0, 0, 0)
                                                   doc.text("ha completado satisfactoriamente el curso:", 148.5, 110, { align: "center" })
                     
                                                   // Nombre del curso
                                                   doc.setFontSize(18)
                                                   doc.setFont("helvetica", "bold")
                                                   doc.text(courseData.title, 148.5, 120, { align: "center" })
                     
                                                   // Detalles adicionales
                                                   doc.setFontSize(12)
                                                   doc.setFont("helvetica", "normal")
                                                   doc.text(`con una calificación de ${quizScore}%`, 148.5, 130, { align: "center" })
                     
                                                   // Fecha
                                                   const fechaActual = new Date().toLocaleDateString("es-ES", {
                                                     day: "numeric",
                                                     month: "long",
                                                     year: "numeric",
                                                   })
                                                   doc.text(`Expedido el ${fechaActual}`, 148.5, 140, { align: "center" })
                     
                                                   // Firmas
                                                   doc.setDrawColor(0, 0, 0)
                                                   doc.line(80, 165, 130, 165) // Línea para firma 1
                                                   doc.line(170, 165, 220, 165) // Línea para firma 2
                     
                                                   doc.setFontSize(10)
                                                   doc.text("Director Académico", 105, 170, { align: "center" })
                                                   doc.text("Coordinador de Cursos", 195, 170, { align: "center" })
                     
                                                   // Sello (círculo)
                                                   doc.setDrawColor(76, 29, 149)
                                                   doc.setLineWidth(0.5)
                                                   doc.circle(148.5, 155, 15)
                     
                                                   // Texto dentro del sello
                                                   doc.setFontSize(8)
                                                   doc.setTextColor(76, 29, 149)
                                                   doc.text("CERTIFICADO", 148.5, 153, { align: "center" })
                                                   doc.text("OFICIAL", 148.5, 158, { align: "center" })
                     
                                                   // Número de certificado
                                                   doc.setFontSize(8)
                                                   doc.setTextColor(100, 100, 100)
                                                   doc.text(
                                                     `Certificado No: ESP-${Math.floor(Math.random() * 10000)
                                                       .toString()
                                                       .padStart(4, "0")}-${new Date().getFullYear()}`,
                                                     148.5,
                                                     185,
                                                     { align: "center" },
                                                   )
                     
                                                   // Código QR (simulado con un cuadrado)
                                                   doc.setFillColor(240, 240, 240)
                                                   doc.rect(250, 160, 20, 20, "F")
                                                   doc.setDrawColor(0, 0, 0)
                                                   doc.rect(250, 160, 20, 20)
                     
                                                   // Save the PDF
                                                   doc.save(`Certificado_EspañolPro_${courseData.title.replace(/\s+/g, "_")}.pdf`)
                     
                                                   // Redirect to dashboard after download
                                                   setTimeout(() => {
                                                     router.push("/dashboard")
                                                   }, 1000)
                                                 }
                     
                                                 generatePDF()
                                               }}
                                             >
                                               Descargar Certificado y Continuar
                                               <FileText className="h-4 w-4" />
                                             </Button>
                                           )}
                     
                                           {findNextLesson() && quizScore >= 60 && (
                        <Button
                          className="gap-2 bg-violet-600 hover:bg-violet-700"
                          onClick={() => {
                            const nextLesson = findNextLesson()
                            if (nextLesson) {
                              handleLessonChange(nextLesson.lessonIndex)
                            }
                          }}
                          >
                          Siguiente lección
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}

                      {findNextLesson() && quizScore < 60 && (
                        <Button className="gap-2 bg-violet-600 hover:bg-violet-700" disabled>
                          Completa el quiz primero
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) 
}

// Componente X (para mobile sidebar)
function X(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function generatePDF() {
  throw new Error("Function not implemented.")
}


export default dynamic(() => Promise.resolve(CourseDetailPage), { ssr: false });