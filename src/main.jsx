// Proyecto Final - Entrega estudiantil
// Autor: Martin Castro
// Fecha: 17/10/2025
// Archivo de entrada principal
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'
import './styles.scss'
import ErrorBoundary from './components/ErrorBoundary'

const root = createRoot(document.getElementById('root'))

const appTree = (
  <CartProvider>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </CartProvider>
)

// En desarrollo React.StrictMode provoca doble invocación de efectos (intencional).
// Para evitar flicker durante la depuración temporalmente no envolvemos en StrictMode.
// Mantener StrictMode en producción es buena práctica.
if(import.meta.env.DEV){
  root.render(appTree)
} else {
  root.render(
    <React.StrictMode>
      {appTree}
    </React.StrictMode>
  )
}
