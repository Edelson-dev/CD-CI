import { Link } from 'react-router-dom'
import { getPosterUrl } from '../../services/tmdb'
import type { Movie } from '../../types/movie'

export function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = getPosterUrl(movie.poster_path)

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-colors hover:border-purple-600"
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center bg-gray-800 text-sm text-gray-500">
          Sin imagen
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 font-semibold text-gray-100" title={movie.title}>
          {movie.title}
        </h3>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
          <span>{movie.release_date ? movie.release_date.slice(0, 4) : '—'}</span>
          <span className="inline-flex items-center gap-1 text-amber-400">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  )
}
