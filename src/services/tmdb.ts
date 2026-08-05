import { apiFetch } from './api'
import type { Movie, MovieDetail, TMDBApiResponse } from '../types/movie'

export function getPopularMovies(page = 1): Promise<TMDBApiResponse<Movie>> {
  return apiFetch<TMDBApiResponse<Movie>>('/movie/popular', { page })
}

export function searchMovies(query: string, page = 1): Promise<TMDBApiResponse<Movie>> {
  return apiFetch<TMDBApiResponse<Movie>>('/search/movie', { query, page })
}

export function getMovieById(id: number): Promise<MovieDetail> {
  return apiFetch<MovieDetail>(`/movie/${id}`)
}

export function getPosterUrl(path: string | null, size = 'w500'): string | null {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null
}

export function getBackdropUrl(path: string | null): string | null {
  return path ? `https://image.tmdb.org/t/p/w1280${path}` : null
}
