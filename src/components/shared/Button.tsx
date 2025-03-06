import React, { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  disabled = false,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1'

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline:
      'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  }

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'
  const widthClass = fullWidth ? 'w-full' : ''

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${widthClass}
    ${className}
  `.trim()

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
