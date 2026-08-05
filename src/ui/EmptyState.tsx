type EmptyStateProps = {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-20 text-center">
      <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
      {description ? <p className="text-sm text-gray-400">{description}</p> : null}
    </div>
  )
}
