"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  ArrowLeft,
  Check,
  ChevronLeftIcon,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Pause,
  Play,
  Share2,
  Settings,
  Sun,
  ThumbsUp,
  User,
  Volume2,
  VolumeX,
  X as XIcon,
} from "lucide-react"
import Image from "next/image"
import {
  Button
} from "@/components/ui/button"

// Define the type for the course data
type CourseData = {
  [key: string]: {
    id: number;
    title: string;
    lessons: Array<{
      id: number;
      title: string;
      duration: string;
      isCompleted: boolean;
      type: string;
      content?: string;
      questions?: Array<{
        id: number;
        question: string;
        options: string[];
        correctAnswer: number;
      }>;
    }>;
  };
};

// Datos de ejemplo
const coursesData: CourseData = {
  "101": {
    id: 101,
    title: "Curso de Introducción a la Programación",
    lessons: [
      {
        id: 1,
        title: "Variables y Tipos de Datos",
        duration: "15:00",
        isCompleted: true,
        type: "video",
        content: "<p>En esta lección, aprenderemos sobre las variables y los diferentes tipos de datos en programación.</p>",
      },
      {
        id: 2,
        title: "Estructuras de Control",
        duration: "20:00",
        isCompleted: false,
        type: "video",
        content: "<p>En esta lección, exploraremos las estructuras de control como condicionales y bucles.</p>",
      },
      {
        id: 3,
        title: "Evaluación: Variables y Tipos de Datos",
        duration: "10:00",
        isCompleted: false,
        type: "quiz",
        questions: [
          {
            id: 1,
            question: "¿Qué es una variable en programación?",
            options: ["Un tipo de dato", "Un espacio en memoria para almacenar datos", "Una función", "Un operador"],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "¿Cuál de los siguientes no es un tipo de dato primitivo?",
            options: ["Entero", "Booleano", "Cadena", "Array"],
            correctAnswer: 3,
          },
        ],
      },
    ],
  },
}

export default function CourseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentNote, setCurrentNote] = useState("")
  const [videoProgress, setVideoProgress] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  // Obtener datos del curso basado en el ID de la URL
  const courseId = params?.id as string;

  const courseData = coursesData[courseId] ;

  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Curso no encontrado</h1>
          <p className="mb-6">El curso que estás buscando no existe o no está disponible.</p>
          <Button onClick={() => router.push("/dashboard/cursos")}>Volver a cursos</Button>
        </div>
      </div>
    )
  }

  const currentLesson = courseData.lessons[currentLessonIndex]

  // Cargar lecciones completadas desde localStorage al montar el componente
  useEffect(() => {
    if (courseId) {
      const savedCompletedLessons = localStorage.getItem(`completedLessons_${courseId}`)
      if (savedCompletedLessons) {
        setCompletedLessons(JSON.parse(savedCompletedLessons))
      }
    }
  }, [courseId])

  // Guardar lecciones completadas en localStorage cada vez que cambien
  useEffect(() => {
    if (courseId && completedLessons.length > 0) {
      localStorage.setItem(`completedLessons_${courseId}`, JSON.stringify(completedLessons))
    }
  }, [courseId, completedLessons])

  // Calcular el progreso del curso
  const calculateProgress = () => {
    if (!courseData || courseData.lessons.length === 0) return 0
    return Math.round((completedLessons.length / courseData.lessons.length) * 100)
  }

  const courseProgress = calculateProgress()

  // Manejar cambio de lección
  const handleLessonChange = (index: number) => {
    setCurrentLessonIndex(index)
    setVideoProgress(0)
    setIsPlaying(false)
    setQuizAnswers({})
    setQuizSubmitted(false)
  }

  // Manejar respuestas del cuestionario
  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex,
    })
  }

  // Enviar cuestionario
  const handleSubmitQuiz = () => {
    const questions = currentLesson.questions || []
    let correctAnswers = 0

    questions.forEach((question: { id: number; correctAnswer: number }) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)

    if (score >= 60 && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id])
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Aquí continúa el resto del código */}
    </div>
  )
}