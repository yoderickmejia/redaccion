"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span className="text-xl font-bold">EspañolPro</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="#cursos"
            className="text-base font-medium px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            onClick={() => setOpen(false)}
          >
            Cursos
          </Link>
          <Link
            href="#profesores"
            className="text-base font-medium px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            onClick={() => setOpen(false)}
          >
            Profesores
          </Link>
          <Link
            href="#testimonios"
            className="text-base font-medium px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            onClick={() => setOpen(false)}
          >
            Testimonios
          </Link>
          <Link
            href="#precios"
            className="text-base font-medium px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            onClick={() => setOpen(false)}
          >
            Precios
          </Link>

          <div className="border-t border-slate-200 dark:border-slate-800 my-4 pt-4">
            <div className="flex flex-col gap-4">
              {/* Botón de tema simplificado */}
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium">Cambiar tema</span>
                <ThemeToggle />
              </div>
              <Button asChild variant="outline" className="w-full justify-center">
                <Link href="/login" onClick={() => setOpen(false)}>
                  Iniciar Sesión
                </Link>
              </Button>
              <Button asChild className="w-full justify-center bg-violet-600 hover:bg-violet-700">
                <Link href="/register" onClick={() => setOpen(false)}>
                  Registrarse
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

