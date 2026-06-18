import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@components/Layout'
import { RosarioModule } from '@components/modules/RosarioModule'
import { EvangelioModule } from '@components/modules/EvangelioModule'
import { LiturgiaModule } from '@components/modules/LiturgiaModule'
import { CatecismoModule } from '@components/modules/CatecismoModule'
import { ExamenModule } from '@components/modules/ExamenModule'
import { AnotadorModule } from '@components/modules/AnotadorModule'
import useAppStore from '@stores/index'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24 * 7
    }
  }
})

function InicioModule() {
  const { setModActual } = useAppStore()

  const modulos = [
    {
      id: 'evangelio',
      titulo: 'Evangelio Diario',
      descripcion: 'Lee el evangelio del día con reflexiones',
      icono: '📖'
    },
    {
      id: 'rosario',
      titulo: 'Rosario Interactivo',
      descripcion: 'Reza el rosario con guía paso a paso',
      icono: '✝️'
    },
    {
      id: 'liturgia',
      titulo: 'Liturgia de las Horas',
      descripcion: 'Participa en la oración oficial de la Iglesia',
      icono: '📿'
    },
    {
      id: 'catecismo',
      titulo: 'Catecismo',
      descripcion: 'Aprende los fundamentos de la fe',
      icono: '📚'
    },
    {
      id: 'examen',
      titulo: 'Examen de Conciencia',
      descripcion: 'Prepárate para la confesión',
      icono: '💭'
    },
    {
      id: 'notas',
      titulo: 'Anotador Espiritual',
      descripcion: 'Guarda tus reflexiones personales',
      icono: '✍️'
    }
  ]

  return (
    <div>
      <div className="bg-gradient-to-r from-gold-600 to-gold-700 text-white p-8 rounded-lg mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">✝️ Devocionario Católico Digital</h1>
        <p className="text-gold-100 text-lg">Tu compañero espiritual - Funciona completamente sin conexión</p>
      </div>

      <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-8">
        <p className="text-green-800 font-medium">
          ✓ <span className="font-bold">Modo offline:</span> Todas tus oraciones, notas y datos se guardan localmente.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {modulos.map((modulo) => (
          <div
            key={modulo.id}
            onClick={() => setModActual(modulo.id)}
            className="bg-white border border-catholic-200 rounded-lg p-6 card-shadow cursor-pointer hover:border-gold-300 transition-colors"
          >
            <div className="text-5xl mb-3">{modulo.icono}</div>
            <h2 className="text-xl font-bold text-catholic-900 mb-2">
              {modulo.titulo}
            </h2>
            <p className="text-catholic-600">{modulo.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const { modActual } = useAppStore()

  const renderModulo = () => {
    switch (modActual) {
      case 'evangelio':
        return <EvangelioModule />
      case 'rosario':
        return <RosarioModule />
      case 'liturgia':
        return <LiturgiaModule />
      case 'catecismo':
        return <CatecismoModule />
      case 'examen':
        return <ExamenModule />
      case 'notas':
        return <AnotadorModule />
      default:
        return <InicioModule />
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>{renderModulo()}</Layout>
    </QueryClientProvider>
  )
}
