import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
// RouterProvider ele vai renderizar as rotas
import { router } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />

    {/* <RouterProvider router={router} /> SIGNIFICA QUE O ROUTER VAI RENDERIZAR AS ROTAS */ }
  </StrictMode>,
)
