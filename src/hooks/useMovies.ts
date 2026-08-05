import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getPopularMovies } from '../services/tmdb'

export function useMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
  })
}
