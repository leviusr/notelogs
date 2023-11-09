import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { NotesProvider } from '@/context/NoteContext'
import HeaderPage from '@/components/headerpage'
import Buscar from '@/components/find'
import FormCreate from '@/components/form-create'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prisma | typescript ',
  description: 'una practica mas de prisma',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotesProvider>
    <main>
      <div className="antialiased fixed top-0 bg-slate-700 w-full max-h-20  h-20 z-50">
        <div className="hidden lg:flex text-white px-10 w-full h-full flex-row justify-between items-center ">
          <h1 className="text-5xl font-bold">
            Note<span className="text-4xl">Log</span>
          </h1>
          <div>
            <Buscar />
          </div>
        </div>
        <div className="lg:hidden relative">
          <h1 className="absolute top-5 right-7">Menu</h1>
        </div>
      </div>
      <div className="h-20 w-full"></div>

      <section className="w-full h-screen grid grid-cols-1 lg:grid-cols-3">
        <div className="relative bg-lime-500 mx-5 lg:mx-0 rounded-xl lg:rounded-0 lg:px-0 px-5 lg:h-full flex justify-center mb-3">
          <FormCreate />
        </div>

        {children}
      </section>
    </main>
        </NotesProvider>
      </body>
    </html>
  )
}
