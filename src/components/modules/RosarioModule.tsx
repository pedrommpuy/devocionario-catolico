import { useState } from 'react'
import { Header } from '@components/common/Header'
import { Card } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { RosarioPlayer } from './RosarioPlayer'
import { getMisteriosPorDia } from '@data/rosario'
import useAppStore from '@stores/index'
import { Beaker } from 'lucide-react'

export function RosarioModule() {
  const { setRosarioActual, rosarioActual } = useAppStore()
  const [showPlayer, setShowPlayer] = useState(false)
  
  const hoy = new Date()
  const dia = hoy.getDay()
  const misterioDelDia = getMisteriosPorDia(dia)

  const empezarRosario = (decenaInicial = 1) => {
    setRosarioActual(misterioDelDia, decenaInicial)
    setShowPlayer(true)
  }

  if (showPlayer && rosarioActual) {
    return <RosarioPlayer onVolver={() => setShowPlayer(false)} />
  }

  return (
    <div>
      <Header
        titulo="Rosario Interactivo"
        subtitulo={`Misterios del ${misterioDelDia.nombre}`}
        icono={<Beaker />}
      />

      <div className="bg-gold-50 border-l-4 border-gold-600 p-4 rounded mb-8">
        <h3 className="font-bold text-gold-900 mb-2">Misterio de hoy</h3>
        <p className="text-gold-800">{misterioDelDia.descripcion}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {misterioDelDia.decenas.map((decena) => (
          <Card key={decena.numero}>
            <h3 className="font-bold text-lg mb-2 text-catholic-900">
              Decena {decena.numero}
            </h3>
            <p className="text-gold-600 font-semibold mb-2">{decena.misterio}</p>
            <p className="text-sm text-catholic-700 mb-3">
              <span className="font-medium">Virtud:</span> {decena.virtud}
            </p>
            {decena.versiculo && (
              <p className="text-sm italic text-catholic-600 mb-4">
                "{decena.versiculo}"
              </p>
            )}
            <Button
              variant="primary"
              onClick={() => empezarRosario(decena.numero)}
              className="w-full justify-center"
            >
              Rezar esta decena
            </Button>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-catholic-50 to-gold-50">
        <h3 className="text-lg font-bold text-catholic-900 mb-4">Rezar el Rosario Completo</h3>
        <Button
          variant="primary"
          onClick={() => empezarRosario(1)}
          className="w-full justify-center"
        >
          Comenzar desde la primera decena
        </Button>
      </Card>
    </div>
  )
}
