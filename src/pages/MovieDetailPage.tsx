import { useParams, Link } from 'react-router-dom'
import { useMovie } from '../hooks/useMovie'
import { getBackdropUrl, getPosterUrl } from '../services/tmdb'
import { GenreBadge } from '../components/movies/GenreBadge'
import { RatingBadge } from '../components/movies/RatingBadge'
import { Skeleton } from '../ui/Skeleton'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '../ui/Button'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)
  const { data: movie, isLoading, isError, error } = useMovie(movieId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isError) {
    return <EmptyState title="No se pudo cargar la película" description={error.message} />
  }

  if (!movie) {
    return <EmptyState title="Película no encontrada" />
  }

  const posterUrl = getPosterUrl(movie.poster_path, 'w342')
  const backdropUrl = getBackdropUrl(movie.backdrop_path)
  const homepage = movie.homepage

  return (
    <article>
      <Link to="/" className="mb-4 inline-block text-sm text-purple-400 hover:underline">
        ← Volver al inicio
      </Link>

      {backdropUrl ? (
        <div className="relative mb-8 overflow-hidden rounded-xl">
          <img src={backdropUrl} alt="" className="h-64 w-full object-cover opacity-40" />
        </div>
      ) : null}

      <div className="flex flex-col gap-6 sm:flex-row">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="h-auto w-full max-w-56 shrink-0 self-start rounded-xl border border-gray-800"
          />
        ) : null}

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            {movie.tagline ? <p className="mt-1 text-sm italic text-gray-400">{movie.tagline}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <RatingBadge rating={movie.vote_average} />
            {movie.release_date ? (
              <span className="text-sm text-gray-400">Estreno: {movie.release_date}</span>
            ) : null}
            {movie.runtime ? <span className="text-sm text-gray-400">{movie.runtime} min</span> : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <GenreBadge key={genre.id} name={genre.name} />
            ))}
          </div>

          <p className="max-w-2xl leading-relaxed text-gray-300">{movie.overview}</p>

          {homepage ? (
            <div>
              <Button
                onClick={() => {
                  window.open(homepage, '_blank', 'noopener,noreferrer')
                }}
              >
                Página oficial
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
