import { ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  onClick,
  className,
  variant = 'primary',
  disabled = false,
  type = 'button'
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2',
        variant === 'primary' && 'bg-gold-600 text-white hover:bg-gold-700 disabled:bg-gold-300',
        variant === 'secondary' && 'bg-catholic-100 text-catholic-900 hover:bg-catholic-200 disabled:bg-catholic-100',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {children}
    </button>
  )
}
