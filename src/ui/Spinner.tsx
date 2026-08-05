export function Spinner({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-600 border-t-purple-500 ${className}`}
      role="status"
      aria-label="Cargando"
    />
  )
}
