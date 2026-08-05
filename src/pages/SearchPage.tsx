import { useSearchParams } from 'react-router-dom'
import { useSearchMovies } from '../hooks/useSearchMovies'
import { MovieGrid, MovieGridSkeleton } from '../components/movies/MovieGrid'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '../ui/Button'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page') ?? '1')
  const { data, isLoading, isError, isFetching, error } = useSearchMovies(query, page)

  function setPage(next: number) {
    setSearchParams({ q: query, page: String(next) })
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">
        {query ? `Resultados para “${query}”` : 'Buscar películas'}
      </h1>

      <form
        className="mb-6 flex max-w-xl gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          const input = new FormData(event.currentTarget).get('q')
          const next = typeof input === 'string' ? input.trim() : ''
          if (next) {
            setSearchParams({ q: next })
          }
        }}
      >
        <input
          name="q"
          defaultValue={query}
          placeholder="Escribe un título…"
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-100 outline-none transition-colors placeholder:text-gray-500 focus:border-purple-500"
        />
        <Button type="submit">Buscar</Button>
      </form>

      {!query ? (
        <EmptyState title="Escribe un título para buscar" description="Por ejemplo: Inception, The Matrix…" />
      ) : isLoading ? (
        <MovieGridSkeleton />
      ) : isError ? (
        <EmptyState title="Error en la búsqueda" description={error.message} />
      ) : data?.results.length === 0 ? (
        <EmptyState title="Sin resultados" description={`No se encontraron películas para “${query}”.`} />
      ) : data ? (
        <>
          <MovieGrid movies={data.results} />
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="ghost" disabled={page <= 1 || isFetching} onClick={() => setPage(page - 1)}>
              Anterior
            </Button>
            <span className="text-sm text-gray-400">
              Página {data.page} de {data.total_pages}
            </span>
            <Button variant="ghost" disabled={page >= data.total_pages || isFetching} onClick={() => setPage(page + 1)}>
              Siguiente
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}
