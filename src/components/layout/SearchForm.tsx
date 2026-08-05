import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function SearchForm() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const query = value.trim()
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar películas…"
        aria-label="Buscar películas"
        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-100 outline-none transition-colors placeholder:text-gray-500 focus:border-purple-500"
      />
    </form>
  )
}
