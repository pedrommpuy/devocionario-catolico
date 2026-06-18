import { BookOpen, Beaker, BookMarked, Heart, FileText, Lightbulb, Home } from 'lucide-react'
import useAppStore from '@stores/index'
import clsx from 'clsx'

export function Navigation() {
  const { modActual, setModActual } = useAppStore()

  const modulos = [
    { id: 'inicio', nombre: 'Inicio', icono: Home },
    { id: 'evangelio', nombre: 'Evangelio', icono: BookOpen },
    { id: 'rosario', nombre: 'Rosario', icono: Beaker },
    { id: 'liturgia', nombre: 'Liturgia', icono: BookMarked },
    { id: 'catecismo', nombre: 'Catecismo', icono: Heart },
    { id: 'examen', nombre: 'Examen', icono: Lightbulb },
    { id: 'notas', nombre: 'Notas', icono: FileText }
  ]

  return (
    <nav className="bg-white border-b border-catholic-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 py-4 min-w-max">
            {modulos.map(({ id, nombre, icono: Icon }) => (
              <button
                key={id}
                onClick={() => setModActual(id)}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors',
                  modActual === id
                    ? 'bg-gold-600 text-white'
                    : 'bg-catholic-50 text-catholic-700 hover:bg-catholic-100'
                )}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{nombre}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
