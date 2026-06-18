import { useState } from 'react'
import { Header } from '@components/common/Header'
import { Card } from '@components/common/Card'
import { catecismoBasico } from '@data/catecismo'
import { Heart, ChevronDown, ChevronUp } from 'lucide-react'

export function CatecismoModule() {
  const [expandido, setExpandido] = useState<string | null>('credo')

  return (
    <div>
      <Header
        titulo="Catecismo"
        subtitulo="Fundamentos de la fe católica"
        icono={<Heart />}
      />

      <div className="space-y-4">
        {catecismoBasico.map((seccion) => (
          <Card
            key={seccion.id}
            onClick={() =>
              setExpandido(expandido === seccion.id ? null : seccion.id)
            }
            className="cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-catholic-900">
                  {seccion.numero}. {seccion.titulo}
                </h3>
                <p className="text-sm text-catholic-600 mt-1">
                  {seccion.contenido}
                </p>
              </div>
              {expandido === seccion.id ? (
                <ChevronUp className="text-gold-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="text-gold-600 flex-shrink-0" />
              )}
            </div>

            {expandido === seccion.id && (
              <div className="mt-6 pt-6 border-t border-catholic-200 space-y-4">
                {seccion.pararafos.map((parrafo, idx) => (
                  <p key={idx} className="text-catholic-700 leading-relaxed">
                    {parrafo}
                  </p>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
