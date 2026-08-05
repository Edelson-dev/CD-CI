import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { searchMovies } from '../services/tmdb'

export function useSearchMovies(query: string, page = 1) {
  const trimmed = query.trim()

  return useQuery({
    queryKey: ['movies', 'search', trimmed, page],
    queryFn: () => searchMovies(trimmed, page),
    enabled: trimmed.length > 0,
    placeholderData: keepPreviousData,
  })
}
