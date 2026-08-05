import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5">
      {label ? <span className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</span> : null}
      <input
        className={`rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-100 outline-none transition-colors placeholder:text-gray-500 focus:border-purple-500 ${className}`}
        {...props}
      />
    </label>
  )
}
