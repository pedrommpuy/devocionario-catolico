import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white border border-catholic-200 rounded-lg p-6 card-shadow',
        onClick && 'cursor-pointer hover:border-gold-300',
        className
      )}
    >
      {children}
    </div>
  )
}
