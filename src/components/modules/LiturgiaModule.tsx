import { useState } from 'react'
import { Header } from '@components/common/Header'
import { Card } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { liturgiaMockData } from '@data/liturgia-mock'
import { BookMarked } from 'lucide-react'

export function LiturgiaModule() {
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>('laudes')

  const horasDisponibles = [
    { id: 'laudes', nombre: 'Laudes' },
    { id: 'tercia', nombre: 'Tercia' },
    { id: 'sexta', nombre: 'Sexta' },
    { id: 'nona', nombre: 'Nona' },
    { id: 'visperas', nombre: 'Vísperas' },
    { id: 'completas', nombre: 'Completas' }
  ]

  const horaActual = horaSeleccionada && 
    liturgiaMockData[horaSeleccionada as keyof typeof liturgiaMockData]

  return (
    <div>
      <Header
        titulo="Liturgia de las Horas"
        subtitulo="Oración oficial de la Iglesia"
        icono={<BookMarked />}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {horasDisponibles.map(({ id, nombre }) => (
          <Button
            key={id}
            variant={horaSeleccionada === id ? 'primary' : 'secondary'}
            onClick={() => setHoraSeleccionada(id)}
            className="w-full justify-center"
          >
            {nombre}
          </Button>
        ))}
      </div>

      {horaActual && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-catholic-900 mb-6">
            {horaActual.nombre}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gold-600 mb-2">Inicio</h3>
              <p className="text-catholic-700 italic">{horaActual.inicio}</p>
            </div>

            <div>
              <h3 className="font-bold text-gold-600 mb-2">Antífona</h3>
              <p className="text-catholic-700">{horaActual.antifona}</p>
            </div>

            <div>
              <h3 className="font-bold text-gold-600 mb-3">Salmos</h3>
              <ul className="space-y-2">
                {horaActual.salmos.map((salmo, idx) => (
                  <li key={idx} className="text-catholic-700 bg-catholic-50 p-3 rounded">
                    {salmo}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gold-600 mb-2">Lectura</h3>
              <p className="text-sm text-gold-600 font-semibold mb-2">
                {horaActual.lectura.titulo}
              </p>
              <p className="text-catholic-700 leading-relaxed">
                {horaActual.lectura.texto}
              </p>
            </div>

            {horaActual.magnificat && (
              <div>
                <h3 className="font-bold text-gold-600 mb-2">Magnificat</h3>
                <p className="text-catholic-700 italic">{horaActual.magnificat}</p>
              </div>
            )}

            <div className="bg-gold-50 p-4 rounded">
              <h3 className="font-bold text-gold-600 mb-2">Responsorio</h3>
              <p className="text-catholic-700">{horaActual.responsorio}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
