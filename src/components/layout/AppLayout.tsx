import { Link, NavLink, Outlet } from 'react-router-dom'
import { SearchForm } from './SearchForm'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-gray-950 text-gray-200">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-white">
            <span className="text-purple-400">Cine</span>App
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive ? 'bg-purple-600/20 text-purple-300' : 'hover:bg-gray-900'
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive ? 'bg-purple-600/20 text-purple-300' : 'hover:bg-gray-900'
                }`
              }
            >
              Buscar
            </NavLink>
          </nav>
          <div className="ml-auto w-full sm:w-72">
            <SearchForm />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        Datos de{' '}
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
          className="text-purple-400 hover:underline"
        >
          TMDB
        </a>{' '}
        | Hecho con React Query + Tailwind
      </footer>
    </div>
  )
}
