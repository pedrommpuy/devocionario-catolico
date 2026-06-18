import { ReactNode } from 'react'

interface HeaderProps {
  titulo: string
  subtitulo?: string
  icono?: ReactNode
}

export function Header({ titulo, subtitulo, icono }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-gold-600 to-gold-700 text-white p-6 rounded-lg mb-6">
      <div className="flex items-center gap-3">
        {icono && <span className="text-3xl">{icono}</span>}
        <div>
          <h1 className="text-3xl font-bold">{titulo}</h1>
          {subtitulo && <p className="text-gold-100 mt-1">{subtitulo}</p>}
        </div>
      </div>
    </div>
  )
}
