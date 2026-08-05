export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  original_language: string
  adult: boolean
}

export interface MovieDetail extends Movie {
  genres: Genre[]
  runtime: number | null
  tagline: string | null
  status: string
  budget: number
  revenue: number
  homepage: string | null
}

export interface TMDBApiResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface MovieQueryParams {
  page?: number
  query?: string
}
