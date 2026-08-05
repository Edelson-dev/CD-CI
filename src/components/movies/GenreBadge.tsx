export function GenreBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex rounded-full border border-gray-700 px-2.5 py-0.5 text-xs text-gray-300">
      {name}
    </span>
  )
}
