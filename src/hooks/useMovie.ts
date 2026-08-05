import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '../services/tmdb'

export function useMovie(id: number) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id),
    enabled: Number.isFinite(id),
  })
}
