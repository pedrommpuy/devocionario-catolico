import { useState } from 'react'
import { Header } from '@components/common/Header'
import { Card } from '@components/common/Card'
import { Button } from '@components/common/Button'
import useAppStore from '@stores/index'
import { padrenuestro, avemaria, gloriaPatri, creedoApostolico } from '@data/rosario'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface RosarioPlayerProps {
  onVolver: () => void
}

type OrationType = 'credo' | 'padrenuestro' | 'avemaria' | 'gloria' | null

export function RosarioPlayer({ onVolver }: RosarioPlayerProps) {
  const { rosarioActual, decenaActual, avanzarDecena, resetearRosario } = useAppStore()
  const [oracionActual, setOracionActual] = useState<OrationType>(null)
  const [cuentasResadas, setCuentasResadas] = useState(0)

  if (!rosarioActual) {
    return (
      <div>
        <p>Error: No hay rosario seleccionado</p>
        <Button onClick={onVolver}>Volver</Button>
      </div>
    )
  }

  const decena = rosarioActual.decenas[decenaActual - 1]
  const totalDecenas = rosarioActual.decenas.length

  const siguientePaso = () => {
    if (oracionActual === 'credo') {
      setOracionActual('padrenuestro')
    } else if (oracionActual === 'padrenuestro') {
      if (cuentasResadas < 10) {
        setOracionActual('avemaria')
      } else {
        setOracionActual('gloria')
      }
    } else if (oracionActual === 'avemaria') {
      setCuentasResadas(cuentasResadas + 1)
      if (cuentasResadas + 1 < 10) {
        setOracionActual('avemaria')
      } else {
        setOracionActual('gloria')
      }
    } else if (oracionActual === 'gloria') {
      if (decenaActual < totalDecenas) {
        avanzarDecena()
        setCuentasResadas(0)
        setOracionActual('padrenuestro')
      } else {
        alert('¡Rosario completado! Que Dios te bendiga.')
        resetearRosario()
        onVolver()
      }
    } else {
      setOracionActual('credo')
    }
  }

  const mostrarOracion = (tipo: OrationType) => {
    const oraciones: Record<string, string> = {
      credo: creedoApostolico,
      padrenuestro,
      avemaria,
      gloria: gloriaPatri
    }
    return oraciones[tipo || ''] || ''
  }

  return (
    <div>
      <Header
        titulo={`${rosarioActual.nombre} - Decena ${decenaActual}/${totalDecenas}`}
        subtitulo={decena?.misterio}
      />

      <Card className="bg-gradient-to-r from-gold-50 to-gold-100 mb-8">
        <div className="text-center mb-4">
          <p className="text-sm text-gold-700 uppercase tracking-wider font-semibold">Progreso</p>
          <div className="w-full bg-gold-200 rounded-full h-3 mt-4">
            <div
              className="bg-gold-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(decenaActual / totalDecenas) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gold-800 mt-4">
            Decena {decenaActual} de {totalDecenas}
            {oracionActual === 'avemaria' && ` - Ave María ${cuentasResadas + 1}/10`}
          </p>
        </div>
      </Card>

      {decena && !oracionActual && (
        <Card className="mb-8 bg-catholic-50 border-l-4 border-gold-600">
          <h3 className="text-xl font-bold text-catholic-900 mb-2">Decena {decenaActual}</h3>
          <p className="text-lg text-gold-700 font-semibold mb-3">{decena.misterio}</p>
          <p className="text-catholic-700 mb-4">
            <span className="font-medium">Virtud a meditar:</span> {decena.virtud}
          </p>
          {decena.versiculo && (
            <p className="italic text-catholic-600 mb-4">"{decena.versiculo}"</p>
          )}
        </Card>
      )}

      {oracionActual && (
        <Card className="mb-8">
          <p className="text-sm text-gold-600 font-semibold uppercase mb-4">
            {oracionActual === 'credo' && 'Credo de los Apóstoles'}
            {oracionActual === 'padrenuestro' && 'Padre Nuestro'}
            {oracionActual === 'avemaria' && `Ave María (${cuentasResadas + 1}/10)`}
            {oracionActual === 'gloria' && 'Gloria al Padre'}
          </p>
          <p className="whitespace-pre-line leading-relaxed text-catholic-700 text-center">
            {mostrarOracion(oracionActual)}
          </p>
        </Card>
      )}

      <div className="flex gap-4 justify-between items-center">
        <Button variant="secondary" onClick={onVolver}>
          <ChevronLeft size={18} />
          Volver
        </Button>
        <Button variant="primary" onClick={siguientePaso}>
          Siguiente
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}
