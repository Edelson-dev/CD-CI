const API_BASE_URL = 'https://api.themoviedb.org/3'

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN as string | undefined
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
): Promise<T> {
  if (!READ_ACCESS_TOKEN && !API_KEY) {
    throw new ApiError(
      'Falta VITE_TMDB_API_READ_ACCESS_TOKEN en el archivo .env. Obtenlo en https://www.themoviedb.org/settings/api',
      0,
    )
  }

  const url = new URL(`${API_BASE_URL}${path}`)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  }

  const headers: HeadersInit = { Accept: 'application/json' }
  if (READ_ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${READ_ACCESS_TOKEN}`
  } else {
    url.searchParams.set('api_key', API_KEY!)
  }

  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new ApiError(`Error TMDB (${response.status}): ${response.statusText}`, response.status)
  }

  return response.json() as Promise<T>
}
