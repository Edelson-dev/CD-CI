import { useState } from 'react'
import { useMovies } from '../hooks/useMovies'
import { MovieGrid, MovieGridSkeleton } from '../components/movies/MovieGrid'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '../ui/Button'

export function HomePage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, isFetching, error } = useMovies(page)

  if (isLoading) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-white">Películas populares</h1>
        <MovieGridSkeleton />
      </div>
    )
  }

  if (isError) {
    return <EmptyState title="No se pudieron cargar las películas" description={error.message} />
  }

  if (!data || data.results.length === 0) {
    return <EmptyState title="Sin resultados" description="No hay películas populares disponibles." />
  }

  const totalPages = data.total_pages

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-white">Películas populares</h1>
        {isFetching ? <span className="text-xs text-gray-500">Actualizando…</span> : null}
      </div>

      <MovieGrid movies={data.results} />

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button variant="ghost" disabled={page <= 1 || isFetching} onClick={() => setPage((p) => p - 1)}>
          Anterior
        </Button>
        <span className="text-sm text-gray-400">
          Página {data.page} de {totalPages}
        </span>
        <Button variant="ghost" disabled={page >= totalPages || isFetching} onClick={() => setPage((p) => p + 1)}>
          Siguiente
        </Button>
      </div>
    </div>
  )
}
