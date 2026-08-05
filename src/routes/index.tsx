import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { HomePage } from '../pages/HomePage'
import { MovieDetailPage } from '../pages/MovieDetailPage'
import { SearchPage } from '../pages/SearchPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'movie/:id', element: <MovieDetailPage /> },
    ],
  },
])
