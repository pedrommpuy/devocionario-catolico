import { ReactNode, useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { Wifi, WifiOff } from 'lucide-react'
import { pwaService } from '@services/pwa'

interface LayoutProps {
  children: ReactNode
}

function clsx(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function Layout({ children }: LayoutProps) {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)
    
    const unsubscribe = pwaService.registrarListenersConexion({
      online: () => setOnline(true),
      offline: () => setOnline(false)
    })

    return unsubscribe
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className={clsx(
        'flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors',
        online
          ? 'bg-green-50 text-green-700'
          : 'bg-amber-50 text-amber-700'
      )}>
        {online ? (
          <>
            <Wifi size={16} />
            <span>Conexión en línea</span>
          </>
        ) : (
          <>
            <WifiOff size={16} />
            <span>Modo sin conexión - Funciona correctamente</span>
          </>
        )}
      </div>

      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-catholic-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>Devocionario Católico Digital © 2024</p>
          <p className="mt-2 text-catholic-300">
            Diseñado para fortalecer tu vida espiritual
          </p>
        </div>
      </footer>
    </div>
  )
}
