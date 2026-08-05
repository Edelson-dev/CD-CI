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

type QueryParams = Record<string, string | number | boolean | undefined>

interface RequestOptions {
  params?: QueryParams, 
  body?: unknown,
  headers?: HeadersInit
}

class Apiclient {
  private baseUrl: string

  constructor(url: string){
    this.baseUrl = url
  }

  private async request<T>(
    endpoint: string,
    method: string, 
    options: RequestOptions = {}
  ) : Promise<T>
  {
    if(!READ_ACCESS_TOKEN && !API_KEY)
        throw new ApiError("falta de credencialed o claves", 0)

    const url = new URL(`${this.baseUrl}${endpoint}`);

    if(options.params)
    {
      for(const [key, value] of Object.entries(options.params)){
          if(value != undefined)
              url.searchParams.set(key, String(value))
      }
    }

    const headers = new Headers(options.headers);

    headers.set("Accept", 'application/json')
    headers.set('Authorization',`Bearer ${READ_ACCESS_TOKEN}`);
    url.searchParams.set('api_key', API_KEY!);
    
    let body: string | undefined = undefined;

    if(options.body) {
      headers.set('Content-Type', 'application/json')
      body = JSON.stringify(options.body);
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body
    })

    if (!response.ok){
        throw new ApiError(`ERROR ${response.status} - ${response.statusText}`, response.status)
    }

    return response.json() as Promise<T>
  }

  get<T>(endpoint: string, params?: QueryParams, headers?: HeadersInit): Promise<T> {
    return this.request<T>(endpoint, 'GET', { params, headers })
  }

  post<T>(endpoint: string, body?: unknown, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, 'POST', { body, params })
  }

  put<T>(endpoint: string, body?: unknown, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, 'PUT', { body, params })
  }

  delete<T>(endpoint: string, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', { params })
  }
}

export const api = new Apiclient(API_BASE_URL);