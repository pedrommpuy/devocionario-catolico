import { Header } from '@components/common/Header'
import { Card } from '@components/common/Card'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { useEvangelizo } from '@hooks/useEvangelizo'
import { BookOpen } from 'lucide-react'
import { formatDate } from '@utils/date'

export function EvangelioModule() {
  const { data: evangelio, isLoading } = useEvangelizo(1)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!evangelio) {
    return <div>Error cargando evangelio</div>
  }

  return (
    <div>
      <Header
        titulo="Evangelio del Día"
        subtitulo={formatDate(evangelio.date)}
        icono={<BookOpen />}
      />

      <Card className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-catholic-900 mb-2">
            {evangelio.title}
          </h2>
          <p className="text-gold-600 font-semibold">
            {evangelio.book} {evangelio.chapter}:{evangelio.verses}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap leading-relaxed text-catholic-700 text-lg">
            {evangelio.text}
          </p>
        </div>

        {evangelio.commentary && (
          <div className="mt-8 bg-gold-50 p-6 rounded-lg border-l-4 border-gold-600">
            <h3 className="font-bold text-gold-900 mb-3">Reflexión</h3>
            <p className="text-catholic-700">{evangelio.commentary}</p>
          </div>
        )}
      </Card>
    </div>
  )
}
